
export type getOfferDetailsBody = {
  offerDetails:OfferDetail[];
}

type OfferDetail = {
    hotels:Hotel[];
  }


type Hotel={
  rooms:Room[];
}

type Room = {
  facilities:Facility[];
}

type Facility={
  name:string;
}




const sendPostRequest = async(postData:any,url : string) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept' : 'text/plain',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(postData)
    });
  
    // if(!response.ok){
    //   throw new  Error('Network response was not ok');
    // }
  
    const data = await response.json();
    return data;
  }
  
  export { sendPostRequest };
  