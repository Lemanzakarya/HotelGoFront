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
import { getOffersRequestModelDefault } from "../requestmodel/getOffersMode";
import { getOffersBody } from "../responsemodel/getOffersModel";
import useProductInfoStore from "@/stores/useProductInfoStore";
import usePriceSearchStore from "@/stores/usePriceSearch";
import useOfferStore from "@/stores/useOfferStore";






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

  const { productType, ownerProvider, product, culture } = useProductInfoStore();
  const { searchId,offerId,productId,currency,getRoomInfo} = usePriceSearchStore();
  const { hotelName, setHotelName, hotelLocation, setHotelLocation } = useOfferStore();

  const productInfoReq = {
    productType:productType,
    ownerProvider:ownerProvider,
    product:product,
    culture:culture
  };
  useEffect(() => {
    console.log(productType)
    console.log(ownerProvider)
    console.log(product)
    console.log(culture)
    const fetchHotelData = async () => { 
      const productInfo = await sendPostRequest( productInfoReq ,'https://localhost:7220/Tourvisio/ProductInfo');

      console.log(productInfo)
      setHotelData(productInfo.body);
      setHotelName(productInfo.body.hotel.name);
      setHotelLocation(productInfo.body.hotel.address.addressLines.join(','));
      console.log("hotel name : ",productInfo.body.hotel.name);
      console.log("hotel location : ",productInfo.body.hotel.address.addressLines.join(','));
      try{
        const urls = productInfo.body.hotel.seasons[0]?.mediaFiles.map((file: {urlFull: any;}) => file.urlFull);
        setHotelRoomPhotos(urls);
      }catch (error) {
        console.log(error);
      }try{
        const facilities = productInfo.body.hotel.seasons[0]?.facilityCategories[0].facilities;
        setFacilities(facilities);
      }catch (error) {
        console.log(error);
      }try{
        const textCategory = productInfo.body.hotel.seasons[0]?.textCategories;
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

  const getOfferReq ={
    searchId:searchId,
    offerId:offerId,
    productId:productId,
    productType:productType,
    currency:currency,
    culture:culture,
    getRoomInfo:getRoomInfo
  }

  useEffect(() => {
    const fetchOffersData = async () => {

        const fetchOffers = await sendPostRequest(getOfferReq, 'https://localhost:7220/Tourvisio/GetOffers');
        setOffers(fetchOffers.body);

    };
  
    fetchOffersData();
  }, [getOffersRequestModelDefault]);


  // useEffect(() => {
  //   const fetchOfferDetailsData = async () => {
       
  //     const fetchOfferDetails = await sendPostRequest(getOfferReq, 'http://localhost:5083/Tourvisio/GetOfferDetails');
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
            { hotelData?.hotel?.address?.addressLines.join(',') }
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
