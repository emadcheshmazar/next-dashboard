import { useEffect, useRef } from "react"

export default function useUpdateEffect(
  fn: React.EffectCallback,
  inputs?: React.DependencyList,
) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) {
      return fn()
    }
    didMountRef.current = true
  }, inputs)
}
