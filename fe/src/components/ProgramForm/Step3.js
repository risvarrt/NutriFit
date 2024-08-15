import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip, 
  LinearProgress, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  List,
  ListItem,
  Button 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { daysOfWeek } from '../../utils/common';


const Step3 = ({ prevStep, values, publishProgram }) => {
  const [expandedDay, setExpandedDay] = useState(false);
  const [expandedFocus, setExpandedFocus] = useState(false);

  const handleDayChange = (panel) => (event, isExpanded) => {
    setExpandedDay(isExpanded ? panel : false);
  };

  const handleFocusChange = (panel) => (event, isExpanded) => {
    setExpandedFocus(isExpanded ? panel : false);
  };

  const calculateProgress = (calories) => {
    const maxCalories = 800;
    const caloriesValue = parseInt(calories.split('-')[1], 10);
    return (caloriesValue / maxCalories) * 100;
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', maxWidth: '900px', margin: '0 auto', }}>
      <Typography variant="h5" gutterBottom>
        Step 3 : Review Your Workout Program
      </Typography>
      
      {/* Display Program Details */}
      <Box sx={{  display: 'flex', marginBottom: '20px' }}>
        <CardMedia
          component="img"
          alt="Program Image"
          image="https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg" 
          sx={{ width: '50%', borderRadius: '8px', marginRight: '20px' }}
        />
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography variant="h6">{values.name}</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {values.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <AccessTimeIcon sx={{ marginRight: '8px' }} />
              <Typography variant="body1">
                <strong>Duration: </strong>
                <span style={{ fontWeight: 'lighter' }}>{values.duration} weeks</span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
            
              <strong>Target Audience: </strong>
              <span style={{ fontWeight: 'lighter', marginLeft: '8px', marginRight: '8px' }}>{values.targetAudience}</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <strong>Level: </strong>
              <Chip label={values.level} color="primary" sx={{ marginLeft: '8px', marginRight: '8px' }} />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
              <strong>Type: </strong>
              <Chip label={values.type} color="secondary" sx={{ marginLeft: '8px', marginRight: '8px' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
  <strong>Goal: </strong>
  {Array.isArray(values.goal) ? (
    values.goal.map((goal, index) => (
      <Chip key={index} label={goal} color="success" sx={{ marginLeft: '8px'}} />
    ))
  ) : (
    <Chip label={values.goal} color="success" sx={{ marginLeft: '8px' }} />
  )}
</Box>

            
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <LocationOnIcon sx={{ marginRight: '8px' }} />
              <Typography variant="body1">
                <strong>Location: </strong>
                <span style={{ fontWeight: 'lighter' }}>{values.location}</span>
              </Typography>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
              <Typography variant="body1"><strong>Calories Burned:</strong></Typography>
              <LinearProgress 
                variant="determinate" 
                value={calculateProgress(values.caloriesBurned)} 
                sx={{ height: '10px', borderRadius: '5px', marginTop: '5px', color:'red' }}
              />
              <Typography variant="body2" color="textSecondary">
                {values.caloriesBurned} / 800
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      {/* Display Weekly Workout Plan */}
      {daysOfWeek.map((day, dayIndex) => (
        <Accordion key={day} expanded={expandedDay === `day${dayIndex}`} onChange={handleDayChange(`day${dayIndex}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`day${dayIndex}bh-content`}
            id={`day${dayIndex}bh-header`}
          >
            <Typography sx={{ flexShrink: 0 }}>{day}</Typography>
            <Typography sx={{ color: 'text.secondary', marginLeft: 'auto' }}>
              {values.weeklyPlan[day]?.restDay ? 'Rest Day' : 'Workout Day'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {values.weeklyPlan[day]?.restDay ? (
              <Typography variant="body1" color="textSecondary">
                Rest Day
              </Typography>
            ) : (
              values.weeklyPlan[day]?.focus.map((focus, focusIndex) => (
                <Accordion key={`${day}-${focus}`} expanded={expandedFocus === `focus${dayIndex}-${focusIndex}`} onChange={handleFocusChange(`focus${dayIndex}-${focusIndex}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`focus${dayIndex}-${focusIndex}-content`}
                    id={`focus${dayIndex}-${focusIndex}-header`}
                  >
                    <Typography sx={{ flexShrink: 0 }}>{focus}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {values.weeklyPlan[day]?.exercises
                        .filter((workout) => workout.focus === focus)
                        .map((workout, workoutIndex) => (
                          <ListItem key={workoutIndex}>
                             <Card sx={{ width: '100%', marginBottom: 2, border: '1px solid #ccc' }}>
                              <CardContent>
                                <Typography variant="h5" component="div">{workout.name}</Typography>
                                <Typography variant="body2"><strong>Sets:</strong> {workout.sets}</Typography>
                                <Typography variant="body2"><strong>Reps:</strong> {workout.reps}</Typography>
                                <Typography variant="body2"><strong>Duration:</strong> {workout.duration} mins</Typography>
                                <Typography variant="body2"><strong>Rest:</strong> {workout.rest} secs</Typography>
                                <Typography variant="body2"><strong>Form Tip:</strong> {workout.formTip}</Typography>
                              </CardContent>
                            </Card>
                          </ListItem>
                        ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      
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
              }} onClick={publishProgram}>
          Publish Program
        </Button>
      </Box>
    </Box>
  );
};

export default Step3;
