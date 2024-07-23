'use client'
import React from 'react';
import { Box, Typography, Grid, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Select, MenuItem, TextField, Checkbox, FormControlLabel as MuiFormControlLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

interface GuestInformationProps {
  formValues: any;
  formErrors: any;
  countryCodes: string[];
  countryCode: string;
  isCitizen: boolean;
  handleChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCitizenChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCountryCodeChange: (event: SelectChangeEvent<string>) => void;
  validateField: (field: string) => void;
  handleNext: () => void;
}

const GuestInformation: React.FC<GuestInformationProps> = ({
  formValues,
  formErrors,
  countryCodes,
  countryCode,
  isCitizen,
  handleChange,
  handleGenderChange,
  handleCitizenChange,
  handleCountryCodeChange,
  validateField,
  handleNext
}) => (
  <Box>
    <Typography variant="h6">Guest Information</Typography>

    {/* Gender Selector */}
    <FormControl component="fieldset" sx={{ mb: 2 }}>
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup row value={formValues.gender} onChange={handleGenderChange}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
      {formErrors.gender && <FormHelperText error>Gender is required</FormHelperText>}
    </FormControl>

    {/* Name and Surname */}
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formValues.name}
          onChange={handleChange('name')}
          onBlur={() => validateField('name')}
          error={formErrors.name}
          helperText={formErrors.name ? 'Name is required' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Surname"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formValues.surname}
          onChange={handleChange('surname')}
          onBlur={() => validateField('surname')}
          error={formErrors.surname}
          helperText={formErrors.surname ? 'Surname is required' : ''}
        />
      </Grid>
    </Grid>

    {/* Email and Phone Number */}
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formValues.email}
          onChange={handleChange('email')}
          onBlur={() => validateField('email')}
          error={formErrors.email}
          helperText={formErrors.email ? 'Email is required' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
              <Select
                value={countryCode}
                onChange={handleCountryCodeChange}
                displayEmpty
              >
                {countryCodes.map((code) => (
                  <MenuItem key={code} value={code}>{code}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues.phone}
              onChange={handleChange('phone')}
              onBlur={() => validateField('phone')}
              error={formErrors.phone}
              helperText={formErrors.phone ? 'Phone number is required and must be valid' : ''}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    {/* ID Number */}
    <TextField
      label={isCitizen ? "ID Number" : "Passport Number"}
      variant="outlined"
      fullWidth
      margin="normal"
      value={formValues.idNumber}
      onChange={handleChange('idNumber')}
      onBlur={() => validateField('idNumber')}
      error={formErrors.idNumber}
      helperText={formErrors.idNumber ? (isCitizen ? 'ID number must be 11 digits' : 'Passport number must be 6-9 alphanumeric characters') : ''}
    />

    {/* Citizen Checkbox */}
    <MuiFormControlLabel
      control={
        <Checkbox
          checked={!isCitizen}
          onChange={handleCitizenChange}
        />
      }
      label="Not a Citizen"
    />

    {/* Next Button */}
    <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
      Next
    </Button>
  </Box>
);

export default GuestInformation;
