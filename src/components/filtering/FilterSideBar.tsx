import React, { useState , useEffect} from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary,
  Box, Divider, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemText, Rating, Slider, Typography, Drawer, IconButton, useMediaQuery, useTheme, Popover, Button
} from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { CheckBoxTwoTone, ExpandMoreTwoTone, FilterList } from "@mui/icons-material";
import HotelCard from '../card/HotelCard';
import { json } from 'stream/consumers';
import SearchPage from '@/app/search/page';

const style = {
  width: 'auto',
  backgroundColor: '#ffffff',
};

interface GetPagingDataResponseModel {
  body?: GetPagingDataBody;
}

interface GetPagingDataBody {
  hotels?: PriceSearchHotel[];
  filters?: PagingDataFilters;
}

interface PagingDataFilters {
  hotel?: PagingFilters[];
}

interface PagingFilters {
  type: number;
  options?: PagingDataOptions[];
  from: number;
  to: number;
}

interface PagingDataOptions {
  count: number;
  name?: string;
  id?: string;
}

interface PriceSearchHotel {
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
}


function valuetext(value: number) {
  return `${value} TL`;
}

interface FilterSidebarProps {
  id: string | null;
  onFilteredResults: (results: PriceSearchHotel[] | undefined) => void;
  currency: string | undefined;
}

const FilterSidebar = (props: FilterSidebarProps) => {
  const { id, onFilteredResults , currency } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
 
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [priceState , setPriceState] = useState<number[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [allFacilities, setAllFacilities] = useState<PagingDataOptions[]>([]);
  const [selectedBoardOptions, setSelectedBoardOptions] = useState<string[]>([]);
  const [allBoards, setAllBoards] = useState<PagingDataOptions[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [results, setResults] = useState<PriceSearchHotel[] | undefined>(undefined);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [currencyState, setCurrencyState] = useState<string | undefined>(currency);

  useEffect(() => {
    if (id) {
      fetchResults();
    }
  }, [id, selectedFacilities, selectedBoardOptions, selectedStars, priceState]);

  const handleBoardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const boardOption = event.target.name;
    if (event.target.checked) {
      setSelectedBoardOptions([...selectedBoardOptions, boardOption]);
    } else {
      setSelectedBoardOptions(selectedBoardOptions.filter(option => option !== boardOption));
    }
  }

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.name;
    if (event.target.checked) {
      setSelectedFacilities([...selectedFacilities, facility]);
    } else {
      setSelectedFacilities(selectedFacilities.filter(fac => fac !== facility
      ));
    }
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPriceState(newValue as number[]);
  }

  const handleStarsChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setSelectedStars(newValue);
    fetchResults();
  };

  const fetchResults = async () => {
    const filters = [];

    if (selectedStars) {
      filters.push({
        type: 2,
        values: [selectedStars.toString()],
      });
    }
    if (!(priceState[0] === priceRange[0] && priceState[1] === priceRange[1])) {
      filters.push({
        type: 8,
        from: priceState[0],
        to: priceState[1],
      });
    }

    if (selectedFacilities.length > 0) {
      filters.push({
        type: 7,
        values: selectedFacilities,
      });
    }

    if (selectedBoardOptions.length > 0) {
      filters.push({
        type: 6,
        values: selectedBoardOptions,
      });
    }

    const params = {
      currency: currency,
      pagingOptions: [
        {
          currentPage: 1,
          pageRowCount: 50,
          getFilters: true,
          filters,
          sort: 0,
          isNewPagingRequest: true,
        }
      ],
      searchId: id 
    };
    
    try { 
      const response = await fetch('http://localhost:5083/Tourvisio/GetPagingData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (response.ok) {  
        const data:GetPagingDataResponseModel = await response.json();
        setResults(data?.body?.hotels);
        onFilteredResults(data?.body?.hotels);
        var min = data?.body?.filters?.hotel?.find((filter: PagingFilters) => filter.type === 8)?.from
        var max = data?.body?.filters?.hotel?.find((filter: PagingFilters) => filter.type === 8)?.to
        const facilities: PagingDataOptions[] = data?.body?.filters?.hotel?.find((filter: PagingFilters) => filter.type === 7)?.options || [];
        setAllFacilities(facilities);
        const boards: PagingDataOptions[] = data?.body?.filters?.hotel?.find((filter: PagingFilters) => filter.type === 6)?.options || [];
        setAllBoards(boards);
        if (min !== undefined && max !== undefined) {
          const numberArray = [min, max];
          if(priceState.length ===0 || currency != currencyState){
            setPriceState(numberArray);
          }
          if(priceRange.length===0 || currency != currencyState){
            setPriceRange(numberArray);
          }
          setCurrencyState(currency);

      } else {
        console.error('Error:', response.status);
      }
    }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const drawerContent = (
    <List sx={style}>

      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography>Stars</Typography>
        <Rating
          name="half-rating"
          value={selectedStars}
          onChange={handleStarsChange}
          size="medium"
          precision={0.5}
        />
      </ListItem>

      <Divider component="li" />
      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography>Price Range</Typography>
        <Typography sx={{ mt: 2 }}>{`Selected range: ${priceState[0]} TL - ${priceState[1]} TL`}</Typography>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={priceState}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          getAriaValueText={valuetext}
          disableSwap
          min={priceRange[0]}
          max={priceRange[1]} 
        />
      </ListItem>
      <Divider component='li' />
      <ListItem>
        <Accordion sx={{ width: 360, border: '1px solid #ddd', borderRadius: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreTwoTone />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Boards</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {allBoards.map((board, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ border: '1px solid #ddd', borderRadius: 1, paddingLeft: 1, marginBottom: 1 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <CheckBox
                            name={board.id}
                            checked={selectedBoardOptions.includes(board.id || '')}
                            onChange={handleBoardChange}
                            sx={{
                              color: '#544c4c',
                              '&.Mui-checked': {
                                color: 'rgba(24,85,107,0.94)',
                              },
                            }}
                          />
                        }
                        label={board.name + " (" + board.count + ")"}
                      />
                    </FormGroup>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </ListItem>

      <ListItem>
        <Accordion sx={{ width: 360, border: '1px solid #ddd', borderRadius: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreTwoTone />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Facilities
          </AccordionSummary>
          <AccordionDetails>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {allFacilities.map((facility, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ border: '1px solid #ddd', borderRadius: 1, paddingLeft: 1, marginBottom: 0.4 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <CheckBox
                            checked={selectedFacilities.includes(facility?.id || '')}
                            onChange={handleFacilityChange}
                            name={facility.id}
                            sx={{
                              color: '#544c4c',
                              '&.Mui-checked': {
                                color: 'rgba(24,85,107,0.94)',
                              }
                            }}
                          />}
                        label={facility.name + " (" + facility.count + ")"} />
                    </FormGroup>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </ListItem>
    </List>
  );

  var array = results?.map((result) => {
    return result;
  });
  return (
    <Box>
      {isMobile ? (
        <React.Fragment>
          <Button
            variant="contained"
            onClick={handlePopoverOpen}
            startIcon={<FilterList />}
            sx={{ backgroundColor: 'orange',position: 'relative', left: 50, zIndex: 1300 }}
          >
            Filter
          </Button>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {drawerContent}
          </Popover>
        </React.Fragment>
      ) : (
        <Box
          bgcolor="#f5f5f5"
          borderRadius={2}
          alignItems={"center"}
          sx={{ border: 'none' }}
          maxWidth={360}
        >
          {drawerContent}
        </Box>
      )}
    </Box>
  );
};

export default FilterSidebar;
