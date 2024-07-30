export const getOffersRequestModelDefault = {
  searchId: "dbf9d31f-b84d-412e-8e53-b2c2f050193d",
  offerId: "2$2$TR~^005^~23472~^005^~304.3000~^005^~1473~^005^~334.73~^005^~cfa377f0-d371-40f2-b167-609805699b3e",
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