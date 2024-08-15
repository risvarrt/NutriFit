import React, { useState } from 'react';
import { Button, TextField, MenuItem, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox, FormGroup, Grid } from '@mui/material';
import { locationOptions, goalOptions, typeOptions, levelOptions, caloriesOptions } from '../../utils/common';

const Step1 = ({ nextStep, handleChange, handleGoalChange, values }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = values.name.length >= 10 ? "" : "Program Name should be at least 10 characters long.";
    tempErrors.description = values.description.length >= 15 ? "" : "Description should be at least 15 characters long.";
    tempErrors.targetAudience = values.targetAudience.length >= 5 ? "" : "Target Audience should be at least 5 characters long.";
    tempErrors.duration = values.duration > 0 ? "" : "Duration should be at least 1 week.";
    tempErrors.level = values.level ? "" : "Please select a level.";
    tempErrors.type = values.type ? "" : "Please select a type.";
    tempErrors.goal = values.goal.length > 0 ? "" : "Please select at least one goal.";
    tempErrors.location = values.location ? "" : "Please select a location.";
    tempErrors.caloriesBurned = values.caloriesBurned ? "" : "Please select a range for calories burned.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <Box sx={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', position: 'relative' }}>
      <Typography variant="h5" gutterBottom>
        Step 1: Enter Program Details
      </Typography>
      <TextField
        label="Program Name"
        onChange={handleChange('name')}
        value={values.name}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Description"
        onChange={handleChange('description')}
        value={values.description}
        multiline
        rows={4}
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description}
      />
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Trainer Name"
            onChange={handleChange('trainer')}
            value={values.trainer}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Duration (weeks)"
            onChange={handleChange('duration')}
            value={values.duration}
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            fullWidth
            margin="normal"
            error={!!errors.duration}
            helperText={errors.duration}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Target Audience"
            onChange={handleChange('targetAudience')}
            value={values.targetAudience}
            fullWidth
            margin="normal"
            error={!!errors.targetAudience}
            helperText={errors.targetAudience}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Level</FormLabel>
            <RadioGroup
              row
              value={values.level}
              onChange={handleChange('level')}
            >
              {levelOptions.map((option) => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
            {errors.level && <Typography color="error">{errors.level}</Typography>}
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} md={6}>
        <TextField
  select
  label="Type"
  onChange={handleChange('type')}
  value={values.type}
  fullWidth
  margin="normal"
  error={!!errors.type}
  helperText={errors.type}
  SelectProps={{ MenuProps: { disablePortal: true, disableAutoFocusItem: true, disableScrollLock: true } }}
>
  {typeOptions.map((option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ))}
</TextField>
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField
  select
  label="Calories Burned per Session"
  onChange={handleChange('caloriesBurned')}
  value={values.caloriesBurned}
  fullWidth
  margin="normal"
  error={!!errors.caloriesBurned}
  helperText={errors.caloriesBurned}
  SelectProps={{ MenuProps: { disablePortal: true, disableAutoFocusItem: true, disableScrollLock: true } }}
>
  {caloriesOptions.map((option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ))}
</TextField>
        </Grid>
      </Grid>
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Goal</FormLabel>
        <FormGroup row>
          {goalOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={values.goal.includes(option)}
                  onChange={() => handleGoalChange(option)}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
        {errors.goal && <Typography color="error">{errors.goal}</Typography>}
      </FormControl>
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Location</FormLabel>
        <RadioGroup
          row
          value={values.location}
          onChange={handleChange('location')}
        >
          {locationOptions.map((option) => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
        {errors.location && <Typography color="error">{errors.location}</Typography>}
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" sx={{ 
                bgcolor: 'white',
                color:  'red',
                borderColor: 'red',
                '&:hover': {
                  bgcolor: 'red',
                  color: 'white',
                  borderColor: 'red'
                }
              }} onClick={handleNext}>
          NEXT
        </Button>
      </Box>
    </Box>
  );
};

export default Step1;
