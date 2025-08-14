import { parse, serialize } from "cookie"

export const storeData = (args: {
  key: string
  data: unknown
  expiresDays?: number
}) => {
  try {
    const cookie = serialize(args.key, JSON.stringify(args.data), {
      path: "/",
      maxAge: args.expiresDays ? args.expiresDays * 24 * 60 * 60 : undefined,
    })
    if (typeof document !== "undefined") {
      document.cookie = cookie
    }
    return cookie
  } catch (err) {
    console.error("Error in storing cookie:", err)
  }
}

export const getData = (arg: {
  key: string
  cookieString?: string
}): unknown => {
  try {
    const cookies: Record<string, string | undefined> = parse(
      arg.cookieString ||
        (typeof document !== "undefined" ? document.cookie : ""),
    )
    const value = cookies[arg.key]
    return value !== undefined ? JSON.parse(value) : null
  } catch (err) {
    console.error("Error in getting cookie:", err)
    return null
  }
}

export const clearData = (arg: { key: string }) => {
  try {
    const cookie = serialize(arg.key, "", {
      path: "/",
      maxAge: -1,
    })
    if (typeof document !== "undefined") {
      document.cookie = cookie
    }
    return cookie
  } catch (err) {
    console.error("Error in clearing cookie:", err)
  }
}

export const clearAllData = (cookieString?: string) => {
  try {
    const cookies = cookieString ? parse(cookieString) : parse(document.cookie)

    return Object.keys(cookies).map((key) => {
      const cookie = serialize(key, "", {
        path: "/",
        maxAge: -1,
      })

      if (typeof document === "undefined") {
        return cookie
      } else {
        document.cookie = cookie
        return null
      }
    })
  } catch (err) {
    console.error("Error in clearing all cookies:", err)
    return []
  }
}
