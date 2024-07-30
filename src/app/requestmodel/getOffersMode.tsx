export const getOffersRequestModelDefault = {
  searchId: "525fcb7b-5b44-4425-8c58-53b5ca179f43",
  offerId: "2$2$TR~^005^~23472~^005^~304.3000~^005^~1473~^005^~334.73~^005^~0c1adb39-b3b1-46bf-be59-56753088d9c0",
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