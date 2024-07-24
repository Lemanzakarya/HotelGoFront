type Hotel ={
  hotel:{
    homePage:string;
    hotelCategory:string;
    name:string;
  };
};

type Facilities = {
  name:string;
  isPRiced:boolean;
}[];

type TextCategory = {
  name:string;
  presentations:{
    text:string;
  }[];
}

const sendPostRequest = async(postData:any) => {
  const response = await fetch('http://localhost:5083/Tourvisio/ProductInfo', {
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