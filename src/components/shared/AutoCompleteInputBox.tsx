import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Paper from '@mui/material/Paper';
import useSearchStore from '@/stores/useSearchStore';

interface Option {
    name: string;
    id: string;
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
interface AutoCompleteInputBoxProps {
    onChange: (location: Option) => void;
}

export default function AutoCompleteInputBox({ onChange }: AutoCompleteInputBoxProps) {
    const [options, setOptions] = useState<Option[]>([]);
    const [inputValue, setInputValue] = useState('');

    const location = useSearchStore(state => state.location);


    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
        Location: true,
        Hotel: true
    });

    const apiUrl = "http://localhost:8080/Tourvisio/PostAutoComplete";



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
                        name: item.type === 1 ? item.city.name : item.hotel.name + " (" + item.city.name + ")",
                        id: item.type === 1 ? item.city.id : item.hotel.id,
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
            getOptionLabel={(option: Option) => option.name}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            onChange={(event, newValue) => {
                if (newValue) {
                    onChange(newValue);
                }
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
                        <Box sx={{ fontWeight: 'bold' }}>
                            {params.group} ({Array.isArray(params.children) ? params.children.length : 0})
                        </Box>
                        {expandedGroups[params.group] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Box>
                    {expandedGroups[params.group] && params.children}
                </div>
            )}
            renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id}>
                    {option.name}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={location.name || 'Location'}
                    sx={{ width: '100%' , backgroundColor:'rgba(255,255,255,0.75)', borderRadius: '5px'}}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'off'
                    }}
                />
            )}
        />
    );
}
