export type Address ={
  addressLines : string[];
}

export type Facility = {
  name:string;
  isPriced:boolean;
};
export type TextCategory = {
  name:string;
  presentations:{
    text:string;
  }[];
}[];

export type mediaFile = {
  urlFull:string;
}[];


export type ProductInfo = {
    hotel:{
      seasons:{
        mediaFiles : mediaFile[];
        textCategories : TextCategory[];
        facilityCategories:{
          facilities: Facility[];
        }[];
      }
      address:Address;
      homePage:string;
      hotelCategory:string;
      name:string;
      stars:number;
    }
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

  if(!response.ok){    
    throw new  Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}

export { sendPostRequest };