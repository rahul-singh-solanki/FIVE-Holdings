import { createAxiosInstance } from 'api/utils/config'

const api = createAxiosInstance()

function fetchProducts(limit: number, offset: number) {
  return api.get<ProductResponse>(`/products`, {
    params: {
      limit,
      skip: offset,
    },
  })
}

function fetchCategoryProduct(category: string, limit: number, offset: number) {
  return api.get<ProductResponse>(`/products/category/${category}`, {
    params: {
      limit,
      skip: offset,
    },
  })
}

const ProductsAPI = {
  fetchProducts,
  fetchCategoryProduct
}

export default ProductsAPI