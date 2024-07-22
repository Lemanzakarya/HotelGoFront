"use client";

import React, { useEffect, useState } from "react";
import Amenities from "../../components/detail/Amenities";
import Gallery from "../../components/detail/Gallery";
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Rating,
} from "@mui/material";
import Overview from "@/components/detail/Overview";
import Rooms from "@/components/detail/Rooms";


interface ProductInfoResponse {
  body: {
    hotel: {
      seasons: {
        textCategories: {
          name: string;
          // presentations: { text: string }[]; // Add back if you need this later
        }[]; 
        facilityCategories: {
          name: string;
          isPriced: boolean;
        }[]; 
        mediaFiles: {
          urlFull: string;
        }[]; 
      };
      address: {
        addressLines: string[];
      };
      phoneNumber:string;
      homePage:string;
      stars:number;
      description:{
        text:string;
      }
      id:string;
      name:string;
    };
  };
}



// export default function HotelDetail{
//   const apiUrl = "http://localhost:5083/Tourvisio/ProductInfo";

//   useEffect(() => {
//     const fetchData = async () => {
//       try{
//         const response = await fetch(`${apiUrl}`)
//       }
//     }
//   });
// }

const HotelDetail: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [productInfo, setProductInfo] = useState<ProductInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const requestData = {
    productType: 2,
    ownerProvider: 2,
    product: "400088",
    culture: "en-US",
  };
  
  const apiUrl = "http://localhost:5083/Tourvisio/ProductInfo";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5083/Tourvisio/ProductInfo', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data: ProductInfoResponse = await response.json();
        setProductInfo(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Safe to access message
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after mount



  const hotelData = productInfo?.body.hotel.seasons.textCategories.map(category => ({
    title: category.name,
    location: productInfo.body.hotel.address.addressLines[0], // Assuming first line is location
    price: '', // You'll need to get price from somewhere else in the response
    tags: [], // You'll need to determine tags based on your data
    id: category.name, // Using name as a placeholder ID, adjust as needed
  })) || [];


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box mt={4}>
          <Typography variant="h3" component="h1" marginBottom={0} gutterBottom>
            {h}
          </Typography>
          <Rating
            name="card-rating"
            value={5}
            readOnly={true}
            size="medium"
            precision={0.5}
          />
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Belek, Kadriye, Antalya
          </Typography>
        </Box>

        <Gallery images={[]} />

        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="hotel detail tabs"
          >
            <Tab label="Overview" />
            <Tab label="Amenities" />
            <Tab label="Rooms" />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <Box sx={{ mt: 2 }}>
            <Overview />
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ mt: 2 }}>
            <Amenities />
          </Box>
        )}
        {tabValue === 2 && (
          <Box sx={{ mt: 2 }}>
            <Rooms />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HotelDetail;
