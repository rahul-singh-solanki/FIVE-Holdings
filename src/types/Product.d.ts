interface Product {
  id:                   number
  title:                string
  description:          string
  category:             string
  price:                number
  discountPercentage:   number
  rating:               number
  stock:                number
  tags:                 string[]
  brand:                string
  sku:                  string
  weight:               number
  warrantyInformation:  string
  shippingInformation:  string
  availabilityStatus:   string
  returnPolicy:         string
  minimumOrderQuantity: number
  images:               string[]
  thumbnail:            string
}

interface ProductResponse {
  products:             Product[]
  total:                number
  skip:                 number
  limit:                number
}