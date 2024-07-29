export const getOffersRequestModelDefault = {
    searchId: "f9b18c54-8cf4-40f2-a856-4e532766254c",
    offerId: "1$2$202407260854$TR$1|8545342$1378$$2",
    productType: 2,
    productId: "8728",
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
    getRoomInfo:boolean;
}