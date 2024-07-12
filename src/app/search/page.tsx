'use client'
import React, { useEffect, useState } from "react";
import HotelCard from "../../components/card/HotelCard";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string>("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    // Simulated hotel data
    setHotelData(hotel);
  };

  const handleLocationFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationFilter(event.target.value);
  };

  const handleTagFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagFilter(event.target.value);
  };

  const handleFilterClick = () => {
    const filteredData = hotel.filter((hotel) => {
      const locationMatch = hotel.location.toLowerCase().includes(locationFilter.toLowerCase());
      const tagMatch = hotel.tags?.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase())) ?? false;
      return locationMatch && tagMatch;
    });
    setHotelData(filteredData);
  };

  return (
    <Box mx="auto" pt={10} alignItems="center">
      <Box display="flex" justifyContent="between">
        <TextField
          type="text"
          placeholder="Search"
          variant="outlined"
          size="small"
          value={locationFilter}
          onChange={handleLocationFilterChange}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
        <TextField
          type="text"
          placeholder="Filter by tag"
          variant="outlined"
          size="small"
          value={tagFilter}
          onChange={handleTagFilterChange}
          className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterClick}
          className="px-4 py-2 bg-primary-500 text-white rounded-md shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          Filter
        </Button>
      </Box>
      {hotelData.map((hotel, index) => (
        <Box key={index}>
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
