"use client";
import React, { useEffect, useState , Suspense } from "react";
import HotelCard from "../../components/card/HotelCard";
import Box from "@mui/material/Box";
import SearchBar from "@/components/SearchBar";
import { useMediaQuery } from "@mui/material";
import FilterSidebar from "../../components/filtering/FilterSideBar";
import {useSearchParams} from "next/navigation";
import dayjs, {Dayjs} from "dayjs";

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

const SearchPageServer: React.FC = () => {
  const [hotelData, setHotelData] = useState<Hotel[]>([]);
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const childrenAges = searchParams.get('childrenAges');
  const selectedNationality = searchParams.get('selectedNationality');

  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [numAdults, setNumAdults] = useState<number>(0);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [agesOfChildren, setAgesOfChildren] = useState<number[]>([]);
  const [nationality, setNationality] = useState<string>('');

  useEffect(() => {
    if (checkInDate) setCheckIn(dayjs(checkInDate));
    if (checkOutDate) setCheckOut(dayjs(checkOutDate));
    if (adults) setNumAdults(parseInt(adults, 10));
    if (children) setNumChildren(parseInt(children, 10));
    if (childrenAges) setAgesOfChildren(childrenAges.split(',').map(age => parseInt(age, 10)));
    if (selectedNationality) setNationality(selectedNationality);
  }, [checkInDate, checkOutDate, adults, children,childrenAges, selectedNationality]);



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
          isLoading={false}
          setIsLoading={setIsLoading}
          checkInDateParam={checkIn}
          checkOutDateParam={checkOut}
          adultsParam={numAdults}
          childrenParam={numChildren}
          childrenAgesParam={agesOfChildren}
          nationalityParam={nationality}
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
                isLoading={false}
                setIsLoading={setIsLoading}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};
const SearchPage = () => {
  return (
      <Suspense>
        <SearchPageServer />
      </Suspense>
  );
}

export default SearchPage;
