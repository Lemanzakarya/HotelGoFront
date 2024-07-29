export const getOffersRequestModelDefault = {
    searchId: "9b82a876-1665-4065-89b5-2ddfb9d79582",
    offerId: "2$2$TR~^005^~23472~^005^~383.2000~^005^~1504~^005^~421.52~^005^~70c5a461-3c99-4718-9cfb-e05dd0f29690",
    productType: 2,
    productId: "104872",
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