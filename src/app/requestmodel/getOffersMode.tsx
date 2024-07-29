export const getOffersRequestModelDefault = {
    searchId: "6a70ac65-2aab-4d76-a528-240689ad478b",
    offerId: "2$2$TR~^005^~23472~^005^~267.8000~^005^~1504~^005^~294.58~^005^~629f9976-35ec-4dd0-a031-965829bf3418",
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