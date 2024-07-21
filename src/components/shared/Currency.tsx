import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useCurrencyStore from '../../stores/useCurrencyStore';

interface Currency {
  code: string;
  label: string;
}

export default function SelectVariants() {
  const { currencies, selectedCurrency, setSelectedCurrency } = useCurrencyStore();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label" sx={{ color: "#004AAD" }}>Currency</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedCurrency}
          onChange={handleChange}
          label="Currency"
          sx={{ color: "#004AAD" }}
        >
          {currencies.map((currency: Currency) => (
            <MenuItem key={currency.code} value={currency.code}>
              {currency.code} - {currency.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
