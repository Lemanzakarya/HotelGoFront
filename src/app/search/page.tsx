'use client'
import React, { useEffect, useState } from "react";
import HotelCard from "../../components/card/HotelCard";
import Button from '@mui/material/Button';
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/app/filtering/FilterSideBar";
import {Box} from "@mui/material";

interface Hotel {
  [x: string]: any;
  title: string;
  location: string;
  price: string;
  tags?: string[];
}

const hotel: Hotel[]=[
  {
    title: "Hotel 1",
    location: "Alanya, Antalya",
    price: "259,99",
    tags: ["Wifi", "Star", "2.4 km"],
  },
  {
    title: "Hotel 1",
    location: "Manavgat, Antalya",
    price: "259,99",
    tags: ["Wifi", "Star", "2.4 km"],
  },
  {
    title: "Hotel 1",
    location: "Cankaya, Ankara",
    price: "259,99",
    tags: ["Wifi", "Star", "2.4 km"],
  },
  {
    title: "Hotel 1",
    location: "Merkez, Adana",
    price: "259,99",
    tags: ["Wifi", "Star", "2.4 km"],
  }
]

const HotelDetail: React.FC = () => {
  const [hotelData, setHotelData] = useState<Hotel[]>([]);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string>("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
  //   try {
  //     // Örnek API otel almak için endpoint
  //     const response = await axios.get("/api/hotels");
  //     setHotelData(response.data); // response.data otel dizisi olduğunu varsayalım
  //   } catch (error) {
  //     console.error("Otel alınırken hata oluştu:", error);
  //   }
       setHotelData(hotel);
  };

  const handleLocationFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationFilter(event.target.value);
  };

  const handleTagFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagFilter(event.target.value);
  };

  const handleFilterClick = () => {
    const filteredData = hotelData.filter((hotel) => {
      const locationMatch = hotel.location.toLowerCase().includes(locationFilter.toLowerCase());
      // Otellerin veri yapısına göre ayarlayın
      // Etiketlerin bir dizi dizin olduğunu varsayalım
      const tagMatch = hotel.tags?.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase())) ?? false;
      return locationMatch && tagMatch;
    });
    setHotelData(filteredData);
  };

  return (
      <div className="m-auto pt-4 items-center w-full max-w-3xl" style={{marginTop: '80px'}}>
        <SearchBar
            sx={{marginTop: '40px', marginLeft: '10%', marginRight: '10%'}}
            backgroundColor={'#F5F5F5'}
            height={'90px'}
        />
        <Box display="flex" marginTop="65px" marginLeft="10%">
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


