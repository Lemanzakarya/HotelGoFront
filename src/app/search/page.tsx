'use client'

import React, { useEffect, useState, Suspense } from "react";
import HotelCard from "../../components/card/HotelCard";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import FilterSidebar from "../../components/filtering/FilterSideBar";
import LoadingCircle from "@/components/shared/LoadingCircle";
import useCurrencyStore from "@/stores/useCurrencyStore";
import useSearchStore from "@/stores/useSearchStore";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

interface Hotel {
  name?: string;
  stars?: string;
  rating?: string;
  location?: HotelProductSimpleCity;
  country?: PriceSearchCountry;
  city?: HotelProductSimpleCity;
  offers?: HotelOffer[];
  provider?: number;
  thumbnailFull?: string;
  id?: string;
}

interface HotelProductSimpleCity {
  id?: string;
  name?: string;
}

interface PriceSearchCountry {
  internationalCode?: string;
  name?: string;
}

interface HotelOffer {
  night?: number;
  offerId?: string;
  price?: Price;
}

interface Price {
  currency?: string;
  amount?: string;
}

const formatPrice = (price: string | undefined) => {
  if (!price) return price;
  const numericPrice = parseFloat(price);
  return numericPrice.toFixed(2);
};

const SearchPageServer = () => {
  const { selectedCurrency } = useCurrencyStore();
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [isLoading, setIsLoading] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [searchId, setData] = useState<string | null>(null);
  const [filteredResults, setFilteredResults] = useState<Hotel[] | undefined>(undefined);

  const handleFilteredResults = (results: Hotel[] | undefined) => {
    setFilteredResults(results);
  };

  const handleClearFilter = () => {
    setIsCleared(true);
  }

  useEffect(() => {
    fetchResults();
  }, [selectedCurrency]);

  const location = useSearchStore((state) => state.location);
  const adults = useSearchStore((state) => state.adults);
  const children = useSearchStore((state) => state.children);
  const childrenAges = useSearchStore((state) => state.childrenAges);
  const checkInDate = useSearchStore((state) => state.checkInDate);
  const checkOutDate = useSearchStore((state) => state.checkOutDate);
  const night = dayjs(checkOutDate)?.diff(checkInDate, 'days') || 0;

  const fetchResults = async () => {
    var arrival = location.type === 1 ? [{ id: location.id, type: 2 }] : null;
    var product = location.type === 2 ? [location.id.toString()] : null;
    const params = {
      currency: selectedCurrency,
      getOnlyBestOffers: true,
      productType: 2,
      arrivalLocations: arrival,
      products: product,
      roomCriteria: [
        {
          adult: adults,
          childAges: childrenAges,
        }, 
      ],
      pagingOption: {
        currentPage: 1,
        pageRowCount: 0,
      },
      checkIn: dayjs(checkInDate).format('YYYY-MM-DD'),
      night: night
    };
    try {
      const response = await fetch('http://localhost:5083/Tourvisio/PriceSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (response.ok) {
        const data = await response.json();
        setIsCleared(false);
        setData(data.body.searchId);
        setFilteredResults(data.body.hotels);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const SearchBar = dynamic(() => import('@/components/SearchBar'), {
    ssr: false,
  });

  return (
    <div style={{ marginTop: "20px" }}>
      <Box
        sx={{
          position: "sticky",
          top: 4,
          zIndex: 10,
        }}
      >
        <div>
        <SearchBar
          sx={{ marginTop: "20px", marginLeft: "5%", marginRight: "5%" }}
          backgroundColor={"#F5F5F5"}
          height={isSmallScreen ? "100%" : 80}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          fetchFunct={fetchResults}
        />
        </div>
      </Box>
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        marginTop="4%"
      >
        <Box flex="1" marginLeft="5%">
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                position: 'fixed',
                top: '50%',
                right: 10,
                left: 10,
                zIndex: 10
              }}
            >
              <LoadingCircle />
            </Box>
          )}
          <div className="filter">
            <FilterSidebar 
              id={searchId} 
              onFilteredResults={handleFilteredResults}
              currency={selectedCurrency} 
              isCleared={isCleared} 
              handleFilter={handleClearFilter}
            />
          </div>
        </Box>
        <Box
          flex="3"
          display="flex"
          flexDirection="column"
          marginRight="5%"
          marginLeft={isSmallScreen ? "5%" : "0%"}
        >
          {filteredResults?.map((hotel, index) => (
            <Box key={index}>
              <HotelCard
                title={hotel.name}
                location={`${hotel.city?.name ? hotel.city.name : ''}${hotel.country?.name ? ', ' + hotel.country.name : ''}`}
                price={formatPrice(hotel.offers?.[0].price?.amount)}
                stars={hotel.stars}
                isLoading={isLoading}
                thumbnail={hotel.thumbnailFull}
                nights={hotel.offers?.[0].night}
                currency={hotel.offers?.[0].price?.currency}
                adults={adults}
                checkInDate={checkInDate}
                setIsLoading={setIsLoading}
              >
                {children}
              </HotelCard>
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
};

export default SearchPage;
