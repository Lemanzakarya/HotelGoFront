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
import { Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import { ExpandMoreTwoTone } from "@mui/icons-material";
import {ChangeEvent} from "react";
import useGuestStore from "@/stores/useGuestStore";

const defaultTheme = createTheme();

export default function Reservation() {
  const setFormSubmitted = useFormStore(state => state.setFormSubmitted);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const {
    selectedNationality,
    setSelectedNationality,
    adults,
    children,
    childrenAges,
    setChildrenAges,
  } = useSearchStore();

  const [adultDetails, setAdultDetails] = React.useState(() => Array.from({ length: Math.max(adults, 1) }, () => ({
    title: '',
    gender: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    serialNumber: '',
    expiryDate: '',
    issueCountry: ''
  })));

  const [childDetails, setChildDetails] = React.useState(() => Array.from({ length: children }, () => ({
    firstName: '',
    lastName: '',
    age: '',
    passportNumber: '',
    serialNumber: '',
    expiryDate: '',
    issueCountry: ''
  })));

  const handleInputChange = (index: number, field: string, value: string, isChild: boolean = false) => {
    const updateDetails = (details: any[], setDetails: React.Dispatch<React.SetStateAction<any[]>>) => {
      const updatedDetails = [...details];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [field]: value,
      };
      setDetails(updatedDetails);
    };

    if (isChild) {
      updateDetails(childDetails, setChildDetails);
    } else {
      updateDetails(adultDetails, setAdultDetails);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate adults
    adultDetails.forEach((adult, index) => {
      if (!adult.phone) {
        newErrors[`adult-${index}-phone`] = 'Phone number is required and must be valid';
      }
      if (!adult.firstName || !adult.lastName) {
        newErrors[`adult-${index}-name`] = 'Name and Surname are required';
      }
      if (!adult.email || !/\S+@\S+\.\S+/.test(adult.email)) {
        newErrors[`adult-${index}-email`] = 'Valid email is required';
      }
      if (!adult.passportNumber) {
        newErrors[`adult-${index}-passport`] = 'Passport number is required';
      }
      if (!adult.serialNumber) {
        newErrors[`adult-${index}-serial`] = 'Serial number is required';
      }
      if (!adult.expiryDate) {
        newErrors[`adult-${index}-expiry`] = 'Expiry date is required';
      }
      if (!adult.title) {
        newErrors[`adult-${index}-title`] = 'Title is required';
      }
      if (!adult.gender) {
        newErrors[`adult-${index}-gender`] = 'Gender is required';
      }
      if (!adult.issueCountry) {
        newErrors[`adult-${index}-issueCountry`] = 'Issue country is required';
      }
    });

    // Validate children
    childDetails.forEach((child, index) => {
      if (!child.firstName || !child.lastName) {
        newErrors[`child-${index}-name`] = 'Name and Surname are required';
      }
      if (!child.passportNumber) {
        newErrors[`child-${index}-passport`] = 'Passport number is required';
      }
      if (!child.serialNumber) {
        newErrors[`child-${index}-serial`] = 'Serial number is required';
      }
      if (!child.expiryDate) {
        newErrors[`child-${index}-expiry`] = 'Expiry date is required';
      }
      if (!child.issueCountry) {
        newErrors[`child-${index}-issueCountry`] = 'Issue country is required';
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      console.log('Form submitted');
    } else {
      console.log('Form validation failed');
    }
  };*/
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      const extractedAdults = adultDetails.map(adult => ({
        title: adult.title,
        firstName: adult.firstName,
        lastName: adult.lastName,
        gender: adult.gender,
        email: adult.email,
        phone: adult.phone,
        passportNumber: adult.passportNumber,
        serialNumber: adult.serialNumber,
        expiryDate: adult.expiryDate,
        issueCountry: adult.issueCountry
      }));

      const extractedChildren = childDetails.map(child => ({
        firstName: child.firstName,
        lastName: child.lastName,
        age: child.age,
        passportNumber: child.passportNumber,
        serialNumber: child.serialNumber,
        expiryDate: child.expiryDate,
        issueCountry: child.issueCountry
      }));

      useGuestStore.getState?.().setAdultDetails(extractedAdults);
      useGuestStore.getState?.().setChildDetails(extractedChildren);
      console.log("guest information saved", extractedAdults, extractedChildren);

      setFormSubmitted(true);
      console.log('Form submitted');
    } else {
      console.log('Form validation failed');
    }

  };


  const handleReset = () => {
    setErrors({});
    setChildrenAges([]);

    setAdultDetails(Array.from({ length: Math.max(adults, 1) }, () => ({
      title: '',
      gender: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passportNumber: '',
      serialNumber: '',
      expiryDate: '',
      issueCountry: ''
    })));

    setChildDetails(Array.from({ length: children }, () => ({
      firstName: '',
      lastName: '',
      age: '',
      passportNumber: '',
      serialNumber: '',
      expiryDate: '',
      issueCountry: ''
    })));
  };

  if(adults === 0) {
    return (
        <Typography variant="h3" sx={{ color: '#516D87', mb: 2 }}>
          Bad request.<br/> Please go back to homepage and try again.
        </Typography>
    )
  }
  return (
      <ThemeProvider theme={defaultTheme}>
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}
        >
          <form onSubmit={handleSubmit}>
            {adultDetails.map((adult, index) => (
                index === 0 ? (
                    <Box key={`adult-${index}`} sx={{ mb: 2, width: '100%' }}>
                      <Typography component="h1" variant="h5" sx={{ color: '#516D87', mb: 2 }}>
                        Adult {index + 1}
                      </Typography>

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
                                value={adult.title}
                                onChange={(e : SelectChangeEvent<string>) => handleInputChange(index, 'title', e.target.value, false)}
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
                              fullWidth
                              id={`firstName-adult-${index}`}
                              label="Name"
                              value={adult.firstName}
                              onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
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
                              value={adult.lastName}
                              onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
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
                                value={adult.gender}
                                onChange={(e : SelectChangeEvent<string>) => {handleInputChange(index, "gender", e.target.value, false);}}
                                error={Boolean(errors[`adult-${index}-gender`])}
                            >
                              <MenuItem value="male">Male</MenuItem>
                              <MenuItem value="female">Female</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                              size="small"
                              fullWidth
                              id={`email-adult-${index}`}
                              label="Email Address"
                              value={adult.email}
                              onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                              error={Boolean(errors[`adult-${index}-email`])}
                              helperText={errors[`adult-${index}-email`]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <MuiPhoneNumber
                              size="small"
                              fullWidth
                              variant={'outlined'}
                              defaultCountry={"tr"}
                              label="Phone Number"
                              value={adult.phone}
                              onChange={(value: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                if (typeof value === 'string') {
                                  handleInputChange(index, 'phone', value);
                                } else {
                                  handleInputChange(index, 'phone', value.target.value);
                                }
                              }}
                              error={Boolean(errors[`adult-${index}-phone`])}
                              helperText={errors[`adult-${index}-phone`]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            size="small"
                            value={selectedNationality}
                            inputProps={{ readOnly: true }}
                            label={"Nationality"}
                            InputLabelProps={{shrink : true}}
                          />
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2 }} />

                      <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mb: 1 }}>
                        Passport Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
                          <TextField
                              size="small"
                              fullWidth
                              id={`passport-adult-${index}`}
                              label="Passport Number"
                              value={adult.passportNumber}
                              onChange={(e) => handleInputChange(index, 'passportNumber', e.target.value)}
                              error={Boolean(errors[`adult-${index}-passport`])}
                              helperText={errors[`adult-${index}-passport`]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <TextField
                              size="small"
                              fullWidth
                              id={`serial-adult-${index}`}
                              label="Serial Number"
                              value={adult.serialNumber}
                              onChange={(e) => handleInputChange(index, 'serialNumber', e.target.value)}
                              error={Boolean(errors[`adult-${index}-serial`])}
                              helperText={errors[`adult-${index}-serial`]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                              size="small"
                              fullWidth
                              id={`expiry-adult-${index}`}
                              label="Expiry Date"
                              type="date"
                              value={adult.expiryDate}
                              onChange={(e) => handleInputChange(index, 'expiryDate', e.target.value)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              error={Boolean(errors[`adult-${index}-expiry`])}
                              helperText={errors[`adult-${index}-expiry`]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <CountrySelect
                              value={adult.issueCountry}
                              onChange={(e , newValue) => handleInputChange(index, 'issueCountry', newValue ?? '')}
                              label="Issue Country"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                ) : (
                    <Accordion key={`adult-${index}`} sx={{
                      mb: 2 ,
                      border :'2px solid #999' ,
                      borderRadius:3 ,
                      boxShadow:'none' ,
                      '&:before': {
                        display: 'none',
                      }
                    }}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreTwoTone />}
                          aria-controls={`panel${index}-content`}
                          id={`panel${index}-header`}
                      >
                        <Typography variant="h6" sx={{ color: '#516D87' }}>
                          Adult {index + 1}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box key={`adult-${index}`} sx={{ mb: 2, width: '100%' }}>
                          <Typography component="h2" variant="h6" sx={{ color: '#516D87', mb: 1 }}>
                            Guest Information
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={3}>
                              <FormControl fullWidth size="small">
                                <InputLabel id={`title-select-label-${index}`}>Title</InputLabel>
                                <Select
                                    labelId={`title-select-label-${index}`}
                                    id={`title-select-${index}`}
                                    label="Title"
                                    value={adult.title}
                                    onChange={(e : SelectChangeEvent<string>) => handleInputChange(index, 'title', e.target.value, false)}
                                    error={Boolean(errors[`adult-${index}-title`])}
                                >
                                  <MenuItem value="Mr">Mr</MenuItem>
                                  <MenuItem value="Ms">Ms</MenuItem>
                                  <MenuItem value="Mrs">Mrs</MenuItem>
                                  <MenuItem value="Miss">Miss</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                  size="small"
                                  fullWidth
                                  id={`firstName-adult-${index}`}
                                  label="Name"
                                  value={adult.firstName}
                                  onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                                  error={Boolean(errors[`adult-${index}-name`])}
                                  helperText={errors[`adult-${index}-name`]}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                  size="small"
                                  fullWidth
                                  id={`lastName-adult-${index}`}
                                  label="Surname"
                                  value={adult.lastName}
                                  onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                                  error={Boolean(errors[`adult-${index}-name`])}
                                  helperText={errors[`adult-${index}-name`]}
                              />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <FormControl fullWidth size="small">
                                <InputLabel id={`gender-select-label-${index}`}>Gender</InputLabel>
                                <Select
                                    labelId={`gender-select-label-${index}`}
                                    id={`gender-select-${index}`}
                                    label="Gender"
                                    value={adult.gender}
                                    onChange={(e: SelectChangeEvent<string>) => {handleInputChange(index, "gender", e.target.value, false);}}
                                    error={Boolean(errors[`adult-${index}-gender`])}
                                >
                                  <MenuItem value="male">Male</MenuItem>
                                  <MenuItem value="female">Female</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                  size="small"
                                  fullWidth
                                  id={`email-adult-${index}`}
                                  label="Email Address"
                                  value={adult.email}
                                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                  error={Boolean(errors[`adult-${index}-email`])}
                                  helperText={errors[`adult-${index}-email`]}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <MuiPhoneNumber
                                  size="small"
                                  fullWidth
                                  variant={'outlined'}
                                  defaultCountry={"tr"}
                                  label="Phone Number"
                                  value={adult.phone}
                                  onChange={(value: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                    if (typeof value === 'string') {
                                      handleInputChange(index, 'phone', value);
                                    } else {
                                      handleInputChange(index, 'phone', value.target.value);
                                    }
                                  }}
                                  error={Boolean(errors[`adult-${index}-phone`])}
                                  helperText={errors[`adult-${index}-phone`]}
                              />
                            </Grid>
                          </Grid>

                          <Divider sx={{ my: 2 }} />

                          <Typography component="h2" variant="h6" sx={{ color: '#516D87', mb: 1 }}>
                            Passport Information
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                              <TextField
                                  size="small"
                                  fullWidth
                                  id={`passport-adult-${index}`}
                                  label="Passport Number"
                                  value={adult.passportNumber}
                                  onChange={(e) => handleInputChange(index, 'passportNumber', e.target.value)}
                                  error={Boolean(errors[`adult-${index}-passport`])}
                                  helperText={errors[`adult-${index}-passport`]}
                              />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <TextField
                                  size="small"
                                  fullWidth
                                  id={`serial-adult-${index}`}
                                  label="Serial Number"
                                  value={adult.serialNumber}
                                  onChange={(e) => handleInputChange(index, 'serialNumber', e.target.value)}
                                  error={Boolean(errors[`adult-${index}-serial`])}
                                  helperText={errors[`adult-${index}-serial`]}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                  size="small"
                                  fullWidth
                                  id={`expiry-adult-${index}`}
                                  label="Expiry Date"
                                  type="date"
                                  value={adult.expiryDate}
                                  onChange={(e) => handleInputChange(index, 'expiryDate', e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  error={Boolean(errors[`adult-${index}-expiry`])}
                                  helperText={errors[`adult-${index}-expiry`]}
                              />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                              <CountrySelect
                                  value={adult.issueCountry}
                                  onChange={(e, newValue) => handleInputChange(index, 'issueCountry', newValue ?? '')}
                                  label="Issue Country"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                )
            ))}
            {children > 0 && (
                <Typography component="h1" variant="h5" sx={{ color: '#516D87', mb: 2 , mt:2}}>
                  Children
                </Typography>
                )}
            {childDetails.map((child, index) => (
                <Accordion key={`child-${index}`} sx={{
                  mb: 2 ,
                  border :'2px solid #999' ,
                  borderRadius:3 ,
                  boxShadow:'none' ,
                  '&:before': {
                    display: 'none',
                  }
                }}>
                  <AccordionSummary
                      expandIcon={<ExpandMoreTwoTone />}
                      aria-controls={`child-content-${index}`}
                      id={`child-header-${index}`}
                  >
                    <Typography variant="h6" sx={{ color: '#516D87' }}>
                      Child {index + 1}
                    </Typography>
                  </AccordionSummary>
                <AccordionDetails>
                <Box key={`child-${index}`} sx={{ mb: 2, width: '100%' }}>

                  <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mb: 1 }}>
                    Guest Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                          size="small"
                          fullWidth
                          id={`firstName-child-${index}`}
                          label="Name"
                          value={child.firstName}
                          onChange={(e) => handleInputChange(index, 'firstName', e.target.value, true)}
                          error={Boolean(errors[`child-${index}-name`])}
                          helperText={errors[`child-${index}-name`]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                          size="small"
                          fullWidth
                          id={`lastName-child-${index}`}
                          label="Surname"
                          value={child.lastName}
                          onChange={(e) => handleInputChange(index, 'lastName', e.target.value, true)}
                          error={Boolean(errors[`child-${index}-name`])}
                          helperText={errors[`child-${index}-name`]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                          size="small"
                          value={selectedNationality}
                          inputProps={{ readOnly: true }}
                          label={"Nationality"}
                          InputLabelProps={{shrink : true}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          size="small"
                          fullWidth
                          type={'number'}
                          id={`age-child-${index}`}
                          label="Age"
                          value={childrenAges[index]}
                          onChange={(e) => handleInputChange(index, 'age', e.target.value, true)}
                          error={Boolean(errors[`child-${index}-age`])}
                          helperText={errors[`child-${index}-age`]}
                          InputLabelProps={{
                        shrink: true,
                        style: { width: '100%' }, // Center the label
                      }}
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mb: 1 }}>
                    Passport Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                          size="small"
                          fullWidth
                          id={`passport-child-${index}`}
                          label="Passport Number"
                          value={child.passportNumber}
                          onChange={(e) => handleInputChange(index, 'passportNumber', e.target.value, true)}
                          error={Boolean(errors[`child-${index}-passport`])}
                          helperText={errors[`child-${index}-passport`]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                          size="small"
                          fullWidth
                          id={`serial-child-${index}`}
                          label="Serial Number"
                          value={child.serialNumber}
                          onChange={(e) => handleInputChange(index, 'serialNumber', e.target.value, true)}
                          error={Boolean(errors[`child-${index}-serial`])}
                          helperText={errors[`child-${index}-serial`]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                          size="small"
                          fullWidth
                          id={`expiry-child-${index}`}
                          label="Expiry Date"
                          type="date"
                          value={child.expiryDate}
                          onChange={(e) => handleInputChange(index, 'expiryDate', e.target.value, true)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={Boolean(errors[`child-${index}-expiry`])}
                          helperText={errors[`child-${index}-expiry`]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <CountrySelect
                          value={child.issueCountry}
                          onChange={(e , newValue) => handleInputChange(index, 'issueCountry', newValue ?? '' ,true)}
                          label="Issue Country"
                      />
                    </Grid>
                  </Grid>
                </Box>
                  </AccordionDetails>
                </Accordion>
            ))}
            <Box
                sx={{
                  mt: 2,
                  mb: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
            >
              <Button
                  type="submit"
                  variant="contained"
                  sx={{ mx:1, backgroundColor: '#0347a8', '&:hover': { backgroundColor: '#2b73d0'}, borderRadius:4 , width:'70%' }}
              >
                Save
              </Button>
              <Button
                  onClick={handleReset}
                  variant="contained"
                  sx={{ mx:1, backgroundColor: '#f05523', '&:hover': { backgroundColor: '#ff7b55' }, borderRadius:4 , width:'70%'}}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Box>
      </ThemeProvider>
  );
}
