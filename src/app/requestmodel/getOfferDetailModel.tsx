export const getOfferDetailRequestDefault = {
  offerIds: ["1$2$202407241505$TR$1|8534760$1377$$2"],
  currency: "EUR",
  getProductInfo: true,
};

export type getOfferDetailRequest = {
    offerIds:string[];
    currency:string;
    getProductInfo:boolean;
}