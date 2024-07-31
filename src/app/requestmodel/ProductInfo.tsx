export const ProductInfoRequestDefault = {
    productType: 2,
    ownerProvider: 2,
    product: "400088",
    culture: "en-US"
}

export interface ProductInfoRequest {
    productType: number;
    ownerProvider: number;
    product: string;
    culture: string;
  }