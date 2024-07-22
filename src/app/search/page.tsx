"use client";
import React, { useEffect, useState } from "react";
import HotelCard from "../../components/card/HotelCard";
import Box from "@mui/material/Box";
import SearchBar from "@/components/SearchBar";
import { useMediaQuery } from "@mui/material";
import FilterSidebar from "../../components/filtering/FilterSideBar";

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
  },
];

const SearchPage: React.FC = () => {
  const [hotelData, setHotelData] = useState<Hotel[]>([]);
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    // Simulated hotel data
    setHotelData(hotel);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Box
        sx={{
          position: "sticky",
          top: 4,
          zIndex: 10,
        }}
      >
        <SearchBar
          sx={{ marginTop: "20px", marginLeft: "5%", marginRight: "5%" }}
          backgroundColor={"#F5F5F5"}
          height={isSmallScreen ? "100%" : 80}
        />
      </Box>
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        marginTop="4%"
      >
        <Box flex="1" marginLeft="5%">
          <FilterSidebar />
        </Box>
        <Box
          flex="3"
          display="flex"
          flexDirection="column"
          marginRight="5%"
          marginLeft={isSmallScreen ? "5%" : "0%"}
        >
          {hotelData.map((hotel, index) => (
            <Box key={index}>
              <HotelCard
                title={hotel.title}
                location={hotel.location}
                price={hotel.price}
                tags={hotel.tags}
                apiEndpoint={`/api/hotel/${hotel.id}`}
                stars={3.5}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default SearchPage;
