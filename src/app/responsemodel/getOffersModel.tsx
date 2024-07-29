// export type getOffersBody = {
//     offers:Offer[];
//     information:{
//         total:number; //gives how many offer we recieved
//     }
//     productId:string; //hotelId
// }

// export type Offer ={
//     night:number;
//     rooms:Room[];
//     cancellationPolicies:CancellationPolicy[];
//     //expiresOn:string; //to check the offer is still valid
//     offerId:string;
//     checkIn:string;
//     price:{
//         oldAmount:number;
//         percent:number;
//         amount:number;
//         currency:string;
//     }
// }
// type Room= {
//     roomName:string; //name of the room
//     accomName:string //type of the room
//     boardName:string //what included
//     spo:{
//         price:{
//             amount:number
//         }
//     }
//     price:{ 
//         oldAmount:number;
//         percent:number;
//         amount:number;
//         currency:string;
//     }
// }

// type CancellationPolicy={
//     dueDate:string;
//     price:{
//         amount:number;
//         currency:string;
//     }
// }
// export type OfferPost = {
//     searchId: string,
//     offerId: string,
//     productType: number,
//     productId: string,
//     currency: string,
//     culture: string,
//     getRoomInfo: boolean    
// };
  
export type getOffersBody ={
    offers:Offer[];
    information:{
        total:number;
    }
    prodcutId:string;
}

type Offer ={
    night:number;
    rooms:Room[];
    cancellationPolicies:CancellationPolicy;
    checkIn:string;
    offerId:string;
    expiresOn:string;
    priceBreakdowns:{
        priceBreakdowns:PriceBreakdown[];
    }[];
}
type Room = {
    roomName:string;
    boardGroups:BoardGroup[];
}

type BoardGroup = {
    name:string;
}

type CancellationPolicy = {
    dueDate:string;
    price:Price;
}

type Price = {
    amount:number;
    currency:string;
}


type PriceBreakdown = {
    date:string;
    price:Price;
}