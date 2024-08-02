export const getOffersRequestModelDefault = {
  searchId: "f311ee9e-7ef0-4a84-bc7b-babb7431899b",
  offerId: "2$2$TR~^005^~23472~^005^~213.0100~^005^~1473~^005^~7391.52~^005^~6ade5b25-6169-42c2-980e-12d3885ac82f",
  productType: 2,
  productId: "104040",
  currency: "EUR",
  culture: "en-US",
  getRoomInfo: true
}

export type getOffersRequestModel = {
    searchId:string;
    offerId:string;
    productType:number;
    productId:string;
    currency:string;
    culture:string;
    getRoomInfo:boolean
}