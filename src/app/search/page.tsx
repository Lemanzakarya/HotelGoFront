'use client'
import React, { useEffect, useState } from "react";
import HotelCard from "../../components/card/HotelCard";
import Box from '@mui/material/Box';
import SearchBar from "@/components/SearchBar";
import { useMediaQuery } from "@mui/material";
import FilterSidebar from "@/app/filtering/FilterSideBar";


interface Hotel {
  id: string;
  title: string;
  location: string;
  price: string;
  tags?: string[];
}

const hotel: Hotel[] = [
  {
    id: "1",
    title: "Hotel 1",
    location: "Alanya, Antalya",
    price: "259,99",
    tags: ["Wifi", "Star", "2.4 km"],
  },
  {
    id: "2",
    title: "Hotel 2",
    location: "Manavgat, Antalya",
    price: "698,99",
    tags: ["Wifi", "Star", "2.4 km"],
  },
  {
    id: "3",
    title: "Hotel 3",
    location: "Cankaya, Ankara",
    price: "354,99",
    tags: ["Wifi", "Star", "2.4 km"],
  },
  {
    id: "4",
    title: "Hotel 4",
    location: "Merkez, Adana",
    price: "499,99",
    tags: ["Wifi", "Star", "2.4 km"],
  }
];

const HotelDetail: React.FC = () => {
  const [hotelData, setHotelData] = useState<Hotel[]>([]);
  const isSmallScreen = useMediaQuery('(max-width:650px)');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    // Simulated hotel data
    setHotelData(hotel);
  };




  return (
      <div className="m-auto pt-4 items-center w-full max-w-3xl" style={{marginTop: '10px'}}>
        <Box
          sx={{
            position:'sticky',
            top:4,
            zIndex: 10,
          }}
        >
          <SearchBar
              sx={{marginTop: '20px', marginLeft: '10%', marginRight: '10%' , position: 'sticky'}}
              backgroundColor={'#F5F5F5'}
              height={'90px'}
          />
        </Box>
        <Box display="flex" marginTop="55px" marginLeft="10%">
          <Box flex="1" marginRight="20px">
            <FilterSidebar/>
          </Box>
          <Box flex="3" display="flex" flexDirection="column" gap="0px" >
            {hotelData.map((hotel, index) => (
                <Box key={index} >
                  <HotelCard
                      title={hotel.title}
                      location={hotel.location}
                      price={hotel.price}
                      apiEndpoint={`/api/hotel/${hotel.id}`} // Örnek API endpoint'i
                  />
                </Box>
            ))}
          </Box>
        </Box>
      </div>
  );
};

export default HotelDetail;


