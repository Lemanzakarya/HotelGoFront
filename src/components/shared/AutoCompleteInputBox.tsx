import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Paper from '@mui/material/Paper';

interface Option {
    label: string;
    value: string;
    type: number;
}

interface AutoCompleteResponse {
    body: {
        items: {
            type: number;
            country: {
                id: string;
                name: string;
            };
            state: {
                id: string;
                name: string;
            };
            city: {
                id: string;
                name: string;
            };
            hotel: {
                internationalName: string;
                id: string;
                name: string;
            };
        }[];
    };
}

export default function AutoCompleteInputBox() {
    const [options, setOptions] = useState<Option[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
        City: true,
        Hotel: true
    });

    const apiUrl = "http://localhost:5083/Tourvisio/PostAutoComplete";

    useEffect(() => {
        const fetchData = async () => {
            if (inputValue.length >= 3) {
                try {
                    const response = await fetch(`${apiUrl}?query=${encodeURIComponent(inputValue)}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data: AutoCompleteResponse = await response.json();
                    const newOptions = data.body.items.map((item) => ({
                        label: item.type === 1 ? item.city.name : item.hotel.name + " (" + item.city.name + ")",
                        value: item.type === 1 ? item.city.id : item.hotel.id,
                        type: item.type
                    }));

                    setOptions(newOptions);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                setOptions([]);
            }
        };

        fetchData();
    }, [inputValue]);

    const toggleGroup = (group: string) => {
        setExpandedGroups(prevState => ({
            ...prevState,
            [group]: !prevState[group]
        }));
    };

    return (
        <Autocomplete
            id="location-selection"
            sx={{ width: { xs: '100%', sm: '30%' } }}
            options={options}
            autoHighlight
            noOptionsText={inputValue.length >= 3 ? "No result " : "Type 3 letters at least"}
            getOptionLabel={(option: Option) => option.label}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            groupBy={(option) => option.type === 1 ? 'Location' : 'Hotel'}
            PaperComponent={({ children }) => (
                <Paper style={{ maxHeight: 400, overflow: 'auto', width: '128%' }}>{children}</Paper> 
            )}
            renderGroup={(params) => (
                <div key={params.key}>
                    <Box
                        sx={{
                            backgroundColor: '#E9EAEC',
                            padding: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            height: "20px",
                            width: '100%'
                        }}
                        onClick={() => toggleGroup(params.group)}
                    >
                        <Box sx={{ fontWeight: 'bold'}}>
                            {params.group} ({Array.isArray(params.children) ? params.children.length : 0})
                        </Box>
                        {expandedGroups[params.group] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Box>
                    {expandedGroups[params.group] && params.children}
                </div>
            )}
            renderOption={(props, option) => (
                <Box component="li" {...props} key={option.value}>
                    {option.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Location"
                    sx={{ width: '100%' }}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                    }}
                />
            )}
        />
    );
}
