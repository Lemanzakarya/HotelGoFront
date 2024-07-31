import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiPhoneNumber from 'mui-phone-number';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import useSearchStore from '../../stores/useSearchStore';
import CountrySelect from '@/components/shared/CountrySelector';
import useFormStore from '@/stores/useFormStore';

const defaultTheme = createTheme();


function handleOnChange(value: any) {
  console.log(value);
}


export default function Reservation() {
  const setFormSubmitted = useFormStore(state => state.setFormSubmitted);
  const [title, setTitle] = React.useState<string>('');
  const [gender, setGender] = React.useState<string>('');
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const { selectedNationality, adults, children, childrenAges,  selectedIssueCountry, setSelectedIssueCountry } = useSearchStore();

  // Ensure at least one adult is present
  const adultCount = Math.max(adults, 1);

  const handleTitleChange = (event: SelectChangeEvent<string>) => {
    setTitle(event.target.value);
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value);
  };

  const handleIssueCountryChange = (e: any, newValue: string | null) => {
    setSelectedIssueCountry(newValue || '');
  };

  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^\+?\d{7,15}$/;
    return phoneRegex.test(value);
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate adults
    Array.from({ length: adultCount }).forEach((_, index) => {
      const firstName = (document.getElementById(`firstName-adult-${index}`) as HTMLInputElement)?.value;
      const lastName = (document.getElementById(`lastName-adult-${index}`) as HTMLInputElement)?.value;
      const email = (document.getElementById(`email-adult-${index}`) as HTMLInputElement)?.value;
      const phone = (document.querySelector(`#phone-adult-${index}`) as HTMLInputElement)?.value;
      const passportNumber = (document.getElementById(`passportNumber-adult-${index}`) as HTMLInputElement)?.value;
      const serialNumber = (document.getElementById(`serialNumber-adult-${index}`) as HTMLInputElement)?.value;
      const expiryDate = (document.getElementById(`expiryDate-adult-${index}`) as HTMLInputElement)?.value;
      const selectedTitle = title;
      const selectedGender = gender;
      const issueCountry = selectedIssueCountry;

      if (!phone) {
        newErrors[`adult-${index}-phone`] = 'Phone number is required and must be valid';
      } 

      if (!firstName || !lastName) {
        newErrors[`adult-${index}-name`] = 'Name and Surname are required';
      }
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        newErrors[`adult-${index}-email`] = 'Valid email is required';
      }
      if (!passportNumber) {
        newErrors[`adult-${index}-passport`] = 'Passport number is required';
      }
      if (!serialNumber) {
        newErrors[`adult-${index}-serial`] = 'Serial number is required';
      }
      if (!expiryDate) {
        newErrors[`adult-${index}-expiry`] = 'Expiry date is required';
      }
      if (!selectedTitle) {
        newErrors[`adult-${index}-title`] = 'Title is required';
      }
      if (!selectedGender) {
        newErrors[`adult-${index}-gender`] = 'Gender is required';
      }
      if (!issueCountry) {
        newErrors[`adult-${index}-issueCountry`] = 'Issue country is required';
      }
    });

    // Validate children
    Array.from({ length: children }).forEach((_, index) => {
      const firstName = (document.getElementById(`firstName-child-${index}`) as HTMLInputElement)?.value;
      const lastName = (document.getElementById(`lastName-child-${index}`) as HTMLInputElement)?.value;
      const age = (document.getElementById(`age-child-${index}`) as HTMLInputElement)?.value;
      const passportNumber = (document.getElementById(`passportNumber-child-${index}`) as HTMLInputElement)?.value;
      const serialNumber = (document.getElementById(`serialNumber-child-${index}`) as HTMLInputElement)?.value;
      const expiryDate = (document.getElementById(`expiryDate-child-${index}`) as HTMLInputElement)?.value;
      const issueCountry = selectedIssueCountry;

      if (!firstName || !lastName) {
        newErrors[`child-${index}-name`] = 'Name and Surname are required';
      }
      if (!age || isNaN(Number(age)) || Number(age) <= 0) {
        newErrors[`child-${index}-age`] = 'Valid age is required';
      }
      if (!passportNumber) {
        newErrors[`child-${index}-passport`] = 'Passport number is required';
      }
      if (!serialNumber) {
        newErrors[`child-${index}-serial`] = 'Serial number is required';
      }
      if (!expiryDate) {
        newErrors[`child-${index}-expiry`] = 'Expiry date is required';
      }
      if (!issueCountry) {
        newErrors[`child-${index}-issueCountry`] = 'Issue country is required';
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      console.log('Form submitted');
    } else {
      console.log('Form validation failed');
    }
  };

  const handleReset = () => {
    // Clear form fields
    setTitle('');
    setGender('');
    setErrors({});
    setSelectedIssueCountry(''); // Reset issue country

    const childCount = children;

    Array.from({ length: adultCount }).forEach((_, index) => {
      (document.getElementById(`firstName-adult-${index}`) as HTMLInputElement).value = '';
      (document.getElementById(`lastName-adult-${index}`) as HTMLInputElement).value = '';
      (document.getElementById(`email-adult-${index}`) as HTMLInputElement).value = '';
      (document.querySelector(`#phone-adult-${index}`) as HTMLInputElement).value = '';
      (document.getElementById(`passportNumber-adult-${index}`) as HTMLInputElement).value = '';
      (document.getElementById(`serialNumber-adult-${index}`) as HTMLInputElement).value = '';
      (document.getElementById(`expiryDate-adult-${index}`) as HTMLInputElement).value = '';
    });
  
    // Reset child fields
    Array.from({ length: childCount }).forEach((_, index) => {
      (document.getElementById(`firstName-child-${index}`) as HTMLInputElement).value = '';
      (document.getElementById(`lastName-child-${index}`) as HTMLInputElement).value = '';
      (document.getElementById(`passportNumber-child-${index}`) as HTMLInputElement).value = '';
      (document.getElementById(`serialNumber-child-${index}`) as HTMLInputElement).value = '';
      (document.getElementById(`expiryDate-child-${index}`) as HTMLInputElement).value = '';
    });
  
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'white',
        }}
      >
        <form onSubmit={handleSubmit}>
          {Array.from({ length: adultCount }).map((_, index) => (
            <Box key={`adult-${index}`} sx={{ mb: 4, width: '100%' }}>
              <Typography component="h1" variant="h5" sx={{ color: '#516D87', mb: 2 }}>
                Adult {index + 1}
              </Typography>

              {/* Guest Information */}
              <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mb: 1 }}>
                Guest Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel id={`title-select-label-${index}`}>Title</InputLabel>
                    <Select
                      labelId={`title-select-label-${index}`}
                      id={`title-select-${index}`}
                      label="Title"
                      value={title}
                      onChange={handleTitleChange}
                      error={Boolean(errors[`adult-${index}-title`])}
                    >
                      <MenuItem value="Mr">Mr</MenuItem>
                      <MenuItem value="Ms">Ms</MenuItem>
                      <MenuItem value="Mrs">Mrs</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    size="small"
                    autoComplete="given-name"
                    name={`firstName-adult-${index}`}
                    fullWidth
                    id={`firstName-adult-${index}`}
                    label="Name"
                    autoFocus
                    error={Boolean(errors[`adult-${index}-name`])}
                    helperText={errors[`adult-${index}-name`]}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    size="small"
                    fullWidth
                    id={`lastName-adult-${index}`}
                    label="Surname"
                    name={`lastName-adult-${index}`}
                    autoComplete="family-name"
                    error={Boolean(errors[`adult-${index}-name`])}
                    helperText={errors[`adult-${index}-name`]}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel id={`gender-select-label-${index}`}>Gender</InputLabel>
                    <Select
                      labelId={`gender-select-label-${index}`}
                      id={`gender-select-${index}`}
                      label="Gender"
                      value={gender}
                      onChange={handleGenderChange}
                      error={Boolean(errors[`adult-${index}-gender`])}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label={`Nationality`}
                    value={selectedNationality || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              {/* Contact Information */}
              <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mt: 3, mb: 1 }}>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    fullWidth
                    id={`email-adult-${index}`}
                    label="Email Address"
                    name={`email-adult-${index}`}
                    autoComplete="email"
                    error={!!errors[`adult-${index}-email`]}
                    helperText={errors[`adult-${index}-email`]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MuiPhoneNumber
                    fullWidth
                    size="small"
                    id={`phone-adult-${index}`}
                    label="Phone Number"
                    defaultCountry={'tr'}
                    onChange={handleOnChange}
                    variant="outlined"
                    error={Boolean(errors[`adult-${index}-phone`])}
                    helperText={errors[`adult-${index}-phone`]}
                  />
                </Grid>
              </Grid>

              {/* Passport/ID Information */}
              <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mt: 3, mb: 1 }}>
                Passport Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Serial Number"
                    id={`serialNumber-adult-${index}`}
                    name={`serialNumber-adult-${index}`}
                    error={Boolean(errors[`adult-${index}-serial`])}
                    helperText={errors[`adult-${index}-serial`]}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Passport Number"
                    id={`passportNumber-adult-${index}`}
                    name={`passportNumber-adult-${index}`}
                    error={Boolean(errors[`adult-${index}-passport`])}
                    helperText={errors[`adult-${index}-passport`]}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Expiry Date"
                    id={`expiryDate-adult-${index}`}
                    name={`expiryDate-adult-${index}`}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors[`adult-${index}-expiry`])}
                    helperText={errors[`adult-${index}-expiry`]}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <CountrySelect
                    value={selectedIssueCountry}
                    onChange={(e, newValue) => setSelectedIssueCountry(newValue)}
                    label={"Issue Country"}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}

          {Array.from({ length: children }).map((_, index) => (
            <Box key={`child-${index}`} sx={{ mb: 4, width: '100%' }}>
              <Typography component="h1" variant="h5" sx={{ color: '#516D87', mb: 2 }}>
                Child {index + 1}
              </Typography>

              {/* Guest Information */}
              <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mb: 1 }}>
                Guest Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    size="small"
                    autoComplete="given-name"
                    name={`firstName-child-${index}`}
                    fullWidth
                    id={`firstName-child-${index}`}
                    label="Name"
                    autoFocus
                    error={Boolean(errors[`child-${index}-name`])}
                    helperText={errors[`child-${index}-name`]}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    size="small"
                    fullWidth
                    id={`lastName-child-${index}`}
                    label="Surname"
                    name={`lastName-child-${index}`}
                    autoComplete="family-name"
                    error={Boolean(errors[`child-${index}-name`])}
                    helperText={errors[`child-${index}-name`]}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Age"
                    type="number"
                    defaultValue={childrenAges}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label={`Nationality`}
                    value={selectedNationality || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              {/* Passport/ID Information */}
              <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mt: 3, mb: 1 }}>
                Passport Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Serial Number"
                    id={`serialNumber-child-${index}`}
                    name={`serialNumber-child-${index}`}
                    error={Boolean(errors[`child-${index}-serial`])}
                    helperText={errors[`child-${index}-serial`]}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Passport Number"
                    id={`passportNumber-child-${index}`}
                    name={`passportNumber-child-${index}`}
                    error={Boolean(errors[`child-${index}-passport`])}
                    helperText={errors[`child-${index}-passport`]}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Expiry Date"
                    id={`expiryDate-child-${index}`}
                    name={`expiryDate-child-${index}`}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors[`child-${index}-expiry`])}
                    helperText={errors[`child-${index}-expiry`]}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <CountrySelect
                    value={selectedIssueCountry}
                    onChange={(e, newValue) => setSelectedIssueCountry(newValue)}
                    label={"Issue Country"}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}

          {/* Action Buttons */}
          <Box sx={{ mt: 4 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button type="button" variant="outlined" color="secondary" onClick={handleReset} sx={{ ml: 2 }}>
              Reset
            </Button>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
}
