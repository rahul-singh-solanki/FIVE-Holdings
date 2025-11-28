import { useInfiniteQuery } from "@tanstack/react-query"
import { ProductsAPI } from "api/index"

function useProductList(category: string, limit: number = 10) {
  return useInfiniteQuery({
    queryKey: ['products', category],
    initialPageParam: 0,
    async queryFn({ pageParam = 0 }) {
      let offset = pageParam * limit || 0
      if (category.length) {
        return ProductsAPI.fetchCategoryProduct(category, limit, offset).then(res => res.data)
      } else {
        return ProductsAPI.fetchProducts(limit, offset).then(res => res.data)
      }
    },
    getNextPageParam(lastPage, allPages, lastPageParam) {
      if (lastPage.products.length < limit) {
        return undefined
      }
      return lastPageParam + 1
    }
  })
}

export default useProductList