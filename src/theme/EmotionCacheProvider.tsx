"use client"
import createCache from "@emotion/cache"
import { ReactNode, useState } from "react"
import { useServerInsertedHTML } from "next/navigation"
import { CacheProvider as DefaultCacheProvider } from "@emotion/react"
import { Options } from "@emotion/cache"

interface Props {
  options: Omit<Options, "insertionPoint">
  children: ReactNode
}


export default function EmotionCacheProvider({ options, children }: Props) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: { name: string; isGlobal: boolean }[] = []

    cache.insert = (...args) => {
      const [selector, serialized] = args

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: !selector,
        })
      }

      return prevInsert(...args)
    }

    const flush = () => {
      const prevInserted = inserted
      inserted = []

      return prevInserted
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const insertedCache = flush()

    if (insertedCache.length === 0) {
      return null
    }
    let styles = ""
    let dataEmotionAttribute = cache.key
    const globals: {
      name: string
      style: string
    }[] = []

    insertedCache.forEach(({ name, isGlobal }) => {
      const style = cache.inserted[name]

      if (typeof style !== "boolean") {
        if (isGlobal) {
          globals.push({ name, style: style as string })
        } else {
          styles += style
          dataEmotionAttribute += ` ${name}`
        }
      }
    })

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style
            data-emotion={dataEmotionAttribute}
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    )
  })

  return <DefaultCacheProvider value={cache}>{children}</DefaultCacheProvider>
}
