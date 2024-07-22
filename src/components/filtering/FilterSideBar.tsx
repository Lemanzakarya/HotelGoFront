import React, { useState , useEffect} from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary,
  Box, Divider, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemText, Rating, Slider, Typography, Drawer, IconButton, useMediaQuery, useTheme, Popover, Button
} from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { CheckBoxTwoTone, ExpandMoreTwoTone, FilterList } from "@mui/icons-material";

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



const facilities = [
  'Free Wi-Fi',
  'Parking',
  'Swimming Pool',
  'Gym',
  'Restaurant',
  'Bar',
  'Spa',
  'Room Service',
  'Pet Friendly',
  'Business Center',
];

const mealOptions = [
  'Breakfast Included',
  'all inclusive',
  'Half Board',
  'Full Board',
];

function valuetext(value: number) {
  return `${value} TL`;
}

const FilterSidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [priceState , setPriceState] = useState<number[]>([]);
  // const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedMealOptions, setSelectedMealOptions] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [results, setResults] = useState<GetPagingDataResponseModel | null>(null);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const handleMealChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mealOption = event.target.name;
    if (event.target.checked) {
      setSelectedMealOptions([...selectedMealOptions, mealOption]);
    } else {
      setSelectedMealOptions(selectedMealOptions.filter(option => option !== mealOption));
    }
  }

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facilityName = event.target.name;
    if (event.target.checked) {
      setSelectedFacilities([...selectedFacilities, facilityName]);
    } else {
      setSelectedFacilities(selectedFacilities.filter(facility => facility !== facilityName));
    }
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPriceState(newValue as number[]);
  }

  const handleStarsChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setSelectedStars(newValue);
  };

  const handleApplyChanges = () => {
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
      console.log("gid")
      filters.push({
        type: 8,
        from: priceState[0],
        to: priceState[1],
      });
    }

    // if (selectedRooms.length > 0) {
    //   filters.push({
    //     type: 6,
    //     values: selectedRooms,
    //   });
    // }

    if (selectedFacilities.length > 0) {
      filters.push({
        type: 51,
        values: selectedFacilities,
      });
    }

    if (selectedMealOptions.length > 0) {
      filters.push({
        type: 6,
        values: selectedMealOptions,
      });
    }

    const params = {
      currency: "EUR",
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
      searchId: "e870b699-c759-4132-9a03-d1a47f402b29" // temporary static searchid
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
        setResults(data);
        var min = data?.body?.filters?.hotel?.find((filter: PagingFilters) => filter.type === 8)?.from
        var max = data?.body?.filters?.hotel?.find((filter: PagingFilters) => filter.type === 8)?.to
        if (min !== undefined && max !== undefined) {
          const numberArray = [min, max];
          if(priceState.length ===0){
            setPriceState(numberArray);
          }
          if(priceRange.length===0){
            setPriceRange(numberArray);
          }
        }
      } else {
        console.error('Error:', response.status);
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
      <Divider component="li" />
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
              {facilities.map((facility, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ border: '1px solid #ddd', borderRadius: 1, paddingLeft: 1, marginBottom: 0.4 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <CheckBox
                            checked={selectedFacilities.includes(facility)}
                            onChange={handleFacilityChange}
                            name={facility}
                            sx={{
                              color: '#544c4c',
                              '&.Mui-checked': {
                                color: 'rgba(24,85,107,0.94)',
                              }
                            }}
                          />}
                        label={facility} />
                    </FormGroup>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
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
              {mealOptions.map((meal, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ border: '1px solid #ddd', borderRadius: 1, paddingLeft: 1, marginBottom: 1 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <CheckBox
                            name={meal}
                            checked={selectedMealOptions.includes(meal)}
                            onChange={handleMealChange}
                            sx={{
                              color: '#544c4c',
                              '&.Mui-checked': {
                                color: 'rgba(24,85,107,0.94)',
                              },
                            }}
                          />
                        }
                        label={meal}
                      />
                    </FormGroup>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <ListItem sx={{ flexDirection: 'column', alignItems: 'center', marginTop: 1, marginBottom: 1.5 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyChanges}
          sx={{ boxShadow: '0 2px 4px 0 rgba(0,0,0,2)', width: '50%', borderRadius: 2 }}
        >
          Apply Changes
        </Button>
      </ListItem>
    </List>
  );

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
