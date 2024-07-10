import * as React from 'react';
import { Box, TextField, Button, Divider, ClickAwayListener } from '@mui/material';
import { Popper } from "@mui/base/Popper";
import AutoCompleteInputBox from "@/app/components/shared/AutoCompleteInputBox";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const SearchBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'guests-popper' : undefined;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 0,
                backgroundColor: 'transparent',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 4 },
                    background: '#fffefe',
                    p: { xs: 2, sm: 4 },
                    borderRadius: 6,
                    height: { xs: 'auto', sm: 140 },
                    width: '100%',

                }}
            >
                <AutoCompleteInputBox />
                <Divider orientation="vertical" flexItem sx={{ height: { xs: 'auto', sm: '100%' }, mx: { xs: 0, sm: -2 }, backgroundColor: 'grey' }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="check-in" sx={{
                            width:`200px`,
                            fontSize :`10px`,
                            padding :0
                        }}/>
                </LocalizationProvider>
                <Divider orientation="vertical" flexItem sx={{ height: { xs: 'auto', sm: '100%' }, mx: { xs: 0, sm: -2 }, backgroundColor: 'grey' }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="check-out" sx={{
                            width:`200px`,
                            fontSize :`10px`,
                            padding :0
                        }}/>
                </LocalizationProvider>
                <Divider orientation="vertical" flexItem sx={{ height: { xs: 'auto', sm: '100%' }, mx: { xs: 0, sm: -2 }, backgroundColor: 'grey' }} />
                <Button
                    aria-describedby={id}
                    variant="outlined"
                    onClick={handleClick}
                    sx={{
                        '&:hover': { backgroundColor: 'white', borderColor: '#1f1f1f' },
                        borderRadius: 1.5,
                        p: 1,
                        textTransform: 'none',
                        fontSize: 20,
                        borderColor: '#a2a2a2',
                        color: '#363131',
                        backgroundColor: 'white',
                        width: 140,
                        cursor: 'pointer',
                        height: '73%',
                    }}
                >
                </Button>
                <Popper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    modifiers={[{
                        name: 'offset',
                        options: {
                            offset: [0, 10]
                        },
                    }]}
                >
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box
                            sx={{
                                backgroundColor: 'rgb(245,254,255)',
                                borderRadius: 3,
                                border: '1px solid #ccc',
                                boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                                p: 3,
                                minWidth: 300,
                                minHeight: 200,
                            }}
                        >
                        </Box>
                    </ClickAwayListener>
                </Popper>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'orange',
                        '&:hover': { backgroundColor: 'darkorange' },
                        borderRadius: 3,
                        p: 1,
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        textTransform: 'none',
                        fontSize: 26,
                        marginLeft: { xs: 0, sm: 'auto' },
                        width: { xs: '100%', sm: 120 }
                    }}
                >
                    Search
                </Button>
            </Box>
        </Box >
    );
};

export default SearchBar;
