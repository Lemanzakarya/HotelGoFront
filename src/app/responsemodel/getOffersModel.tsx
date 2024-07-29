export type getOffersBody = {
    offers:Offer[];
    information:{
        total:number; //gives how many offer we recieved
    }
    productId:string; //hotelId
}

export type Offer ={
    night:number;
    rooms:Room[];
    cancellationPolicies:CancellationPolicy[];
    //expiresOn:string; //to check the offer is still valid
    offerId:string;
    checkIn:string;
    price:{
        oldAmount:number;
        percent:number;
        amount:number;
        currency:string;
    }
}
type Room= {
    roomName:string; //name of the room
    accomName:string //type of the room
    boardName:string //what included
    spo:{
        price:{
            amount:number
        }
    }
    price:{ //not sure I will use it but lets put it for now
        oldAmount:number;
        percent:number;
        amount:number;
        currency:string;
    }
}

type CancellationPolicy={
    beginDate:string;
    dueDate:string;
    price:{
        percent:number;
    }
}
export type OfferPost = {
    searchId: string,
    offerId: string,
    productType: number,
    productId: string,
    currency: string,
    culture: string,
    getRoomInfo: boolean    
};
  
