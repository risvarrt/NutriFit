import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  FormControlLabel, 
  Checkbox, 
  Modal, 
  Card, 
  CardContent, 
  CardActions, 
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  IconButton,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { focusOptions, daysOfWeek } from '../../utils/common';

const Step2 = ({ nextStep, prevStep, values, onWeeklyPlanChange }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedFocus, setSelectedFocus] = useState([]);
  const [isRestDay, setIsRestDay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const initialNewWorkout = {
    name: '',
    sets: '',
    duration: '',
    rest: '',
    reps: '',
    formTip: '',
    focus: ''
  };
  const [newWorkout, setNewWorkout] = useState(initialNewWorkout);
  const [workouts, setWorkouts] = useState(values.weeklyPlan);

  useEffect(() => {
    const dayData = workouts[selectedDay] || { focus: [], exercises: [], restDay: false };
    setSelectedFocus(dayData.focus || []);
    setIsRestDay(dayData.restDay || false);
  }, [selectedDay, workouts]);

  const handleFocusChange = (e) => {
    const value = e.target.value;
    if (selectedFocus.includes(value) && workouts[selectedDay]?.exercises.some(ex => ex.focus === value)) {
      alert('Cannot deselect focus with existing workouts.');
      return;
    }
    setSelectedFocus(prev => {
      if (prev.includes(value)) {
        return prev.filter(focus => focus !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleRestDayChange = (e) => {
    setIsRestDay(e.target.checked);
    if (e.target.checked) {
      setSelectedFocus([]);
    }
  };

  const handleAddWorkoutClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditIndex(null);
    setNewWorkout(initialNewWorkout);
  };

  const handleWorkoutChange = (field) => (e) => {
    setNewWorkout({ ...newWorkout, [field]: e.target.value });
  };

  const handleFocusSelectChange = (e) => {
    setNewWorkout({ ...newWorkout, focus: e.target.value });
    saveFocusAndRestDay();
  };

  const handleSaveWorkout = () => {
    if (!newWorkout.name || !newWorkout.sets || !newWorkout.duration || !newWorkout.rest || !newWorkout.reps || !newWorkout.focus) {
      alert('All fields except FormTip are mandatory');
      return;
    }
    const newWorkouts = { ...workouts };
    if (!newWorkouts[selectedDay]) {
      newWorkouts[selectedDay] = { exercises: [], focus: selectedFocus, restDay: isRestDay };
    }
    if (!newWorkouts[selectedDay].exercises) {
      newWorkouts[selectedDay].exercises = [];
    }
    if (editIndex !== null) {
      newWorkouts[selectedDay].exercises[editIndex] = newWorkout;
    } else {
      newWorkouts[selectedDay].exercises.push(newWorkout);
    }
    setWorkouts(newWorkouts);
    onWeeklyPlanChange(newWorkouts);
    handleModalClose();
  };

  const handleDeleteWorkout = (index) => {
    if (window.confirm("Are you sure to delete?")) {
      const newWorkouts = { ...workouts };
      const deletedWorkoutFocus = newWorkouts[selectedDay].exercises[index].focus;
      newWorkouts[selectedDay].exercises.splice(index, 1);
      if (newWorkouts[selectedDay].exercises.every(ex => ex.focus !== deletedWorkoutFocus)) {
        setSelectedFocus(prev => prev.filter(focus => focus !== deletedWorkoutFocus));
      }
      setWorkouts(newWorkouts);
      onWeeklyPlanChange(newWorkouts);
    }
  };

  const handleEditWorkout = (index) => {
    setEditIndex(index);
    setNewWorkout(workouts[selectedDay].exercises[index]);
    setIsModalOpen(true);
  };

  const saveFocusAndRestDay = () => {
    const newWorkouts = { ...workouts, [selectedDay]: { ...workouts[selectedDay], focus: selectedFocus, restDay: isRestDay } };
    setWorkouts(newWorkouts);
    onWeeklyPlanChange(newWorkouts);
  };

  const handleContinue = () => {
    for (const day of daysOfWeek) {
      const dayData = workouts[day] || { focus: [], exercises: [], restDay: false };
      if (!dayData.restDay && dayData.focus.length === 0) {
        alert(`Please select at least one focus for ${day}.`);
        return;
      }
      if (!dayData.restDay && dayData.focus.length > 0 && dayData.exercises.length === 0) {
        alert(`Please add at least one workout for the selected focus on ${day}.`);
        return;
      }
    }
    saveFocusAndRestDay();
    nextStep();
  };

  return (
    <Box sx={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', maxWidth: '900px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Step 2: Enter Weekly Schedule
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {daysOfWeek.map((day) => (
              <Button 
                key={day} 
                variant={selectedDay === day ? 'contained' : 'outlined'} 
                onClick={() => { saveFocusAndRestDay(); setSelectedDay(day); }}
                sx={{
                  minWidth: '120px', 
                  marginBottom: '8px', 
                  bgcolor: selectedDay === day ? 'grey' : 'transparent',
                  color: selectedDay === day ? 'white' : 'inherit',
                  borderColor: 'red',
                  '&:hover': {
                    bgcolor: 'grey',
                    color: 'white',
                    borderColor: 'red'
                  }
                }}
              >
                {day}
              </Button>
            ))}
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ borderRight: '1px solid #ccc', paddingRight: '16px' }}>
          <Typography variant="h6">Select Focus</Typography>
          <Grid container spacing={1}>
            {focusOptions.map((focus) => (
              <Grid item xs={12} key={focus}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={selectedFocus.includes(focus)} 
                      onChange={handleFocusChange} 
                      value={focus} 
                      disabled={isRestDay}
                    />
                  }
                  label={focus}
                />
              </Grid>
            ))}
          </Grid>
          <FormControlLabel
            control={
              <Checkbox 
                checked={isRestDay} 
                onChange={handleRestDayChange} 
              />
            }
            label="Rest Day"
          />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6">Workouts</Typography>
          <Grid container spacing={2} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            {(workouts[selectedDay]?.exercises || []).map((workout, index) => (
              <Grid item xs={6} key={index}>
                <Card sx={{ minWidth: 275, marginBottom: 2, border: '1px solid #ccc' }}>
                  <CardContent sx={{ paddingBottom: '8px' }}>
                  <Chip label={workout.focus}  />
                    <Typography variant="h5" component="div">
                      {workout.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {workout.sets} Sets x {workout.reps} reps
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', paddingBottom: '8px' }}>
                    <Box>
                      <IconButton size="small" onClick={() => handleEditWorkout(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteWorkout(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {(
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddWorkoutClick} 
              sx={{ marginTop: 2 ,
                bgcolor: 'white',
                color:  'red',
                borderColor: 'red',
                '&:hover': {
                  bgcolor: 'red',
                  color: 'white',
                  borderColor: 'red'
                }
              }}
              disabled={selectedFocus.length === 0 || isRestDay}
            >
              Add Workout
            </Button>
          )}
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <Button variant="contained" sx={{ 
                bgcolor: 'white',
                color:  'red',
                borderColor: 'red',
                '&:hover': {
                  bgcolor: 'grey',
                  color: 'white',
                  borderColor: 'red'
                }
              }} onClick={prevStep}>
          Back
        </Button>
        <Button variant="contained" sx={{ 
                bgcolor: 'white',
                color:  'red',
                borderColor: 'red',
                '&:hover': {
                  bgcolor: 'red',
                  color: 'white',
                  borderColor: 'red'
                }
              }} onClick={handleContinue}>
          Continue
        </Button>
      </Box>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
          <Typography variant="h6" gutterBottom>
            {editIndex !== null ? 'Edit Workout' : 'Add Workout'}
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newWorkout.name}
            onChange={handleWorkoutChange('name')}
            margin="normal"
          />
          <TextField
            label="Sets"
            variant="outlined"
            fullWidth
            value={newWorkout.sets}
            onChange={handleWorkoutChange('sets')}
            margin="normal"
            type="number"
          />
          <TextField
            label="Rest (seconds)"
            variant="outlined"
            fullWidth
            value={newWorkout.rest}
            onChange={handleWorkoutChange('rest')}
            margin="normal"
            type="number"
          />
          <TextField
            label="Reps"
            variant="outlined"
            fullWidth
            value={newWorkout.reps}
            onChange={handleWorkoutChange('reps')}
            margin="normal"
            type="number"
          />
          <TextField
            label="Duration (minutes)"
            variant="outlined"
            fullWidth
            value={newWorkout.duration}
            onChange={handleWorkoutChange('duration')}
            margin="normal"
            type="number"
          />
          <TextField
            label="Form Tip"
            variant="outlined"
            fullWidth
            value={newWorkout.formTip}
            onChange={handleWorkoutChange('formTip')}
            margin="normal"
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Focus</FormLabel>
            <RadioGroup
              aria-label="focus"
              name="focus"
              value={newWorkout.focus}
              onChange={handleFocusSelectChange}
            >
              {selectedFocus.map(option => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSaveWorkout}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Step2;
