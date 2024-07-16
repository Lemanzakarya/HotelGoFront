'use client'
import React, { useEffect, useState } from "react";
import HotelCard from "../../components/card/HotelCard";
import Box from '@mui/material/Box';
import SearchBar from "@/components/SearchBar";
import { useMediaQuery } from "@mui/material";

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
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    // Simulated hotel data
    setHotelData(hotel);
  };

  return (
    <Box mx="auto" alignItems="center" style={{marginTop:'80px'}}>
      <SearchBar
        sx={{ marginLeft: isSmallScreen ? '8%':'4%', marginRight: isSmallScreen ? '8%':'4%' }}
        backgroundColor={'#F5F5F5'}
        height={isSmallScreen ? '100%' : 80}
      />
      {hotelData.map((hotel, index) => (
        <Box key={index} style={{ marginLeft: isSmallScreen ? "0%" : "28%" }}>
          <HotelCard
            title={hotel.title}
            location={hotel.location}
            price={hotel.price}
            tags={hotel.tags}
            apiEndpoint={`/api/hotel/${hotel.id}`}
          />
        </Box>
      ))}
    </Box>
  );
};

export default HotelDetail;
