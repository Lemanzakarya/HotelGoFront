import React, { useState } from 'react';
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

const rooms = [
  { id: 'room1', name: 'Single Room' },
  { id: 'room2', name: 'Double Room' },
  { id: 'room3', name: 'Suite' },
  { id: 'room4', name: 'Family Room' },
  { id: 'room5', name: 'Apartment' },
];

const mealOptions = [
  'Breakfast Included',
  'All Inclusive',
  'Half Board',
  'Full Board',
];

function valuetext(value: number) {
  return `${value} TL`;
}

const FilterSidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [priceRange, setPriceRange] = useState<number[]>([1000, 20000]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedMealOptions, setSelectedMealOptions] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleRoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roomName = event.target.name;
    if (event.target.checked) {
      setSelectedRooms([...selectedRooms, roomName]);
    } else {
      setSelectedRooms(selectedRooms.filter(room => room !== roomName));
    }
  };

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
    setPriceRange(newValue as number[]);
  }

  const handleApplyChanges = () => {
    console.log('Selected Facilities:', selectedFacilities);
    console.log('Selected Meal Options:', selectedMealOptions);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
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
        <Rating name="half-rating" defaultValue={2.5} size="medium" precision={0.5} />
      </ListItem>
      <Divider component="li" />
      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography>Price Range</Typography>
        <Typography sx={{ mt: 2 }}>{`Selected range: ${priceRange[0]} TL - ${priceRange[1]} TL`}</Typography>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          getAriaValueText={valuetext}
          min={1000}
          max={30000}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography>Boards</Typography>
        <FormGroup>
          {rooms.map(room => (
            <FormControlLabel
              key={room.id}
              control={
                <CheckBox
                  checked={selectedRooms.includes(room.id)}
                  onChange={handleRoomChange}
                  name={room.id}
                  sx={{
                    color: '#544c4c',
                    '&.Mui-checked': {
                      color: 'rgba(24,85,107,0.94)',
                    }
                  }}
                />
              }
              label={room.name}
            />
          ))}
        </FormGroup>
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
            <Typography>Meal Options</Typography>
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
