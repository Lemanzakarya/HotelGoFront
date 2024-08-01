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
import { getOffersRequestModelDefault } from "../requestmodel/getOffersMode";
import { getOfferDetailRequestDefault } from "../requestmodel/getOfferDetailModel";
import { getOffersBody } from "../responsemodel/getOffersModel";
import { getOfferDetailsBody } from "../responsemodel/getOfferDetailModel";
import { fetchExternalImage } from "next/dist/server/image-optimizer";






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



  //for getOffers endpoint
  const [offers, setOffers] = useState<getOffersBody | null>(null); 

  const [offerDetails, setOfferDetails] = useState<getOfferDetailsBody | null>(null);
  
  useEffect(() => {
    const fetchHotelData = async () => { 
      const productInfo = await sendPostRequest(ProductInfoRequestDefault,'http://localhost:5083/Tourvisio/ProductInfo');
      setHotelData(productInfo.body);

      try{
        const urls = productInfo.body.hotel.seasons[0].mediaFiles.map((file: {urlFull: any;}) => file.urlFull);
        setHotelRoomPhotos(urls);
      }catch (error) {
        console.log(error);
      }try{
        const facilities = productInfo.body.hotel.seasons[0].facilityCategories[0].facilities;
        setFacilities(facilities);
      }catch (error) {
        console.log(error);
      }try{
        const textCategory = productInfo.body.hotel.seasons[0].textCategories;
        //console.log(textCategory)
         setTextCategory(textCategory);
      }catch(error) { 
        console.log(error);
      }try{
        const star = productInfo.body?.hotel.stars;
        setHotelStar(star);
      }catch(error){
        console.log(error);
      }

    };

    fetchHotelData();
  }, []);

  useEffect(() => {
    const fetchOffersData = async () => {

        const fetchOffers = await sendPostRequest(getOffersRequestModelDefault, 'http://localhost:5083/Tourvisio/GetOffers');
        setOffers(fetchOffers.body);

    };
  
    fetchOffersData();
  }, [getOffersRequestModelDefault]);

  // useEffect(() => {
  //   const fetchOfferDetailsData = async () => {
       
  //     const fetchOfferDetails = await sendPostRequest(getOfferDetailRequestDefault, 'http://localhost:5083/Tourvisio/GetOfferDetails');
  //     setOfferDetails(fetchOfferDetails.body);
  //   } 
  //   fetchOfferDetailsData();
  // }, [getOfferDetailRequestDefault]);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };



  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Box>
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
              setIsLoading={setIsLoading }
              offers={offers}
              // offerDetails={offerDetails}  
              />
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
