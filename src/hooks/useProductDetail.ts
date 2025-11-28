import { useMemo } from "react"
import { InfiniteData, useQueryClient } from "@tanstack/react-query"

export function useProductDetail(id: number) {
  const clientQuery = useQueryClient()

  return useMemo(() => {
    const products = clientQuery.getQueryData<InfiniteData<ProductResponse>>(['products'])
    if (!products) return {}
    for (let page of products.pages) {
      const product = page.products.find((p) => p.id === id)
      if (product != null) {
        return product
      }
    }
    return {}
  }, [id, clientQuery])
}