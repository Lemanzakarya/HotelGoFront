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
import { Facility, ProductInfo, sendPostRequest, TextCategory } from "../responsemodel/ProductInfoModel";
import LoadingCircle from "@/components/shared/LoadingCircle";
import { ProductInfoRequestDefault } from "../requestmodel/ProductInfo";






const HotelDetail: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [name, setName] = useState<string>("")

  const [hotelData, setHotelData] = useState<ProductInfo | null>(); 
  const [hotelRoomPhotos, setHotelRoomPhotos] = useState<string[] | null>([]); 
  const [textCategory, setTextCategory] = useState<TextCategory | null>([]);
  const [hotelStar, setHotelStar] = useState<number | null>(0);
  const [facilities, setFacilities] = useState<Facility[]>([]); 
  
  useEffect(() => {
    const fetchHotelData = async () => { 
      const data = await sendPostRequest(ProductInfoRequestDefault,"http://localhost:5083/Tourvisio/ProductInfo");
      setHotelData(data.body);

      try{
        const urls = data.body.hotel.seasons[0].mediaFiles.map((file: {urlFull: any;}) => file.urlFull);
        setHotelRoomPhotos(urls);
      }catch (error) {
        console.log(error);
      }try{
        const facilities = data.body.hotel.seasons[0].facilityCategories[0].facilities;
        setFacilities(facilities);
      }catch (error) {
        console.log(error);
      }try{
        const textCategory = data.body.hotel.seasons[0].textCategories;
        //console.log(textCategory)
         setTextCategory(textCategory);
      }catch(error) { 
        console.log(error);
      }try{
        const star = data.body?.hotel.stars;
        setHotelStar(star);
      }catch(error){
        console.log(error);
      }

    };

    fetchHotelData();
  }, []);




  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // const imageUrls = productInfo?.mediaFile?.map(media => media.urlfull) || [];
  // const description = productInfo?.description ?? "Description not available."; 
  //const amenityNames = 
  //productInfo?.facilityCategories?.map((category) => category.name) || ["Amenities not available"];

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box mt={4}>
          <Typography variant="h3" component="h1" marginBottom={0} gutterBottom>
            {hotelData?.hotel.name}
          </Typography>
          <Rating
            name="card-rating"
            value={hotelStar}
            readOnly={true}
            size="medium"
            precision={0.5}
          />
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            { hotelData?.hotel.address.addressLines.join(',') }
          </Typography>
        </Box>
        
        { <Gallery images={hotelRoomPhotos} /> }

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
            {  <Overview textCategories={textCategory} />  }
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ mt: 2 }}>
            { <Amenities facilities={facilities}/> }
          </Box>
        )}
        {tabValue === 2 && (
          <Box sx={{ mt: 2 }}>
            <Rooms 
              isLoading={false} 
              setIsLoading={setIsLoading } />
               {isLoading && (
                      <Box
                          sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              position: 'fixed',
                              top:80 ,
                              right:10,
                              left:10,
                              zIndex: 10
                          }}
                      >
                          <LoadingCircle/>
                      </Box>
                  )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HotelDetail;
