import React, {useState} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Divider,
    FormControlLabel,
    FormGroup, Grid,
    List,
    ListItem,
    ListItemText,
    Rating,
    Slider,
    Typography
} from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import {CheckBoxTwoTone, ExpandMoreTwoTone} from "@mui/icons-material";
import Button from "@mui/material/Button";

const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'rgba(229,229,229,0.57)',
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

        const [priceRange, setPriceRange] = useState<number[]>([1000, 20000]);
        const [selectedRooms , setSelectedRooms] = useState<string[]>([]);
        const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
        const [selectedMealOptions,setSelectedMealOptions] = useState<string[]>([]);


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
        if (event.target.checked){
            setSelectedMealOptions([...selectedMealOptions, mealOption]);
        } else {
            setSelectedRooms(selectedRooms.filter(option => option !== mealOption))
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


    return (
        <Box
            bgcolor="#f5f5f5"
            borderRadius={2}
            alignItems={"center"}
            sx={{border : '2px solid grey'}}
            maxWidth={360}
        >
            <List sx={style}>
                <ListItem sx={{flexDirection:'column', alignItems:'flex-start'}}>
                    <Typography>Stars</Typography>
                    <Rating name="half-rating" defaultValue={2.5} size="medium" precision={0.5}/>
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{flexDirection:'column', alignItems:'flex-start'}}>
                    <Typography>Price Range</Typography>
                    <Typography sx={{mt:2}}>{`Selected range: ${priceRange[0]} TL - ${priceRange[1]} TL`}</Typography>
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
                <ListItem sx={{flexDirection:'column', alignItems:'flex-start'}}>
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
                                            color:'rgba(24,85,107,0.94)',
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
                    <Accordion sx={{width:360 , border:'1px solid #ddd', borderRadius: 2}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreTwoTone />}
                            aria-controls="panel1-content"
                            id={"panel1-header"}
                        >
                            Facilities
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                {facilities.map((facility,index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box sx={{ border: '1px solid #ddd', borderRadius: 1, paddingLeft:1, marginBottom: 0.4}}>
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
                                                            color:'rgba(24,85,107,0.94)',
                                                            }
                                                        }}
                                                />}
                                                    label={facility}/>
                                            </FormGroup>
                                        </Box>
                                    </Grid>
                                    ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </ListItem>
                <Divider component='li'/>
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
                                        <Box sx={{ border: '1px solid #ddd', borderRadius: 1, paddingLeft:1, marginBottom: 1 }}>
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
                <ListItem sx={{ flexDirection: 'column', alignItems: 'center', marginTop: 1 , marginBottom: 1.5 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyChanges}
                        sx={{ boxShadow:'0 2px 4px 0 rgba(0,0,0,2)', width: '50%', borderRadius: 2}}
                    >
                        Apply Changes
                    </Button>
                </ListItem>
            </List>
        </Box>

    );
};

export default FilterSidebar;
