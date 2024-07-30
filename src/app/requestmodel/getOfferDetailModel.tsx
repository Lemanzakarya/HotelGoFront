export const getOfferDetailRequestDefault = {
  offerIds:[
    "2$2$TR~^005^~23472~^005^~267.8000~^005^~1504~^005^~294.58~^005^~c260bfef-b317-4458-a2a4-3250431f631e"
],
currency:"EUR",
getProductInfo:true 
};

export type getOfferDetailRequest = {
    offerIds:string[];
    currency:string;
    getProductInfo:boolean;
}