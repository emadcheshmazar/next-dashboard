import { PageNode } from "./routes"

export const findPageByPath = (
  tree: PageNode[],
  path: string,
): PageNode | undefined => {
  for (const node of tree) {
    if (node.path === path) return node
    if (node.children) {
      const found = findPageByPath(node.children, path)
      if (found) return found
    }
  }
  return undefined
}

export const findParentKey = (
  tree: PageNode[],
  childKey: string,
): string | undefined => {
  for (const node of tree) {
    if (node.children) {
      for (const child of node.children) {
        if (child.key === childKey) {
          return node.key
        }
      }
      const found = findParentKey(node.children, childKey)
      if (found) return found
    }
  }
  return undefined
}

export const flattenPages = (tree: PageNode[]): PageNode[] => {
  const result: PageNode[] = []

  const walk = (nodes: PageNode[]) => {
    for (const node of nodes) {
      result.push(node)
      if (node.children) {
        walk(node.children)
      }
    }
  }

  walk(tree)
  return result
}

export const findParentByPath = (
  tree: PageNode[],
  path: string,
): PageNode | undefined => {
  for (const node of tree) {
    if (node.children) {
      for (const child of node.children) {
        if (child.path === path) {
          return node
        }
      }
      const found = findParentByPath(node.children, path)
      if (found) return found
    }
  }
  return undefined
}
