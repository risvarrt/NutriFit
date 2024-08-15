import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box, Button, Typography, Container, Tabs, Tab, Tooltip, IconButton, Card, CardContent, Snackbar } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeIcon from '@mui/icons-material/Home';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { AuthContext } from '../context/AuthContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function WDetails() {
  const query = useQuery();
  const id = query.get('id');
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL+`/api/workouts/` + id, {
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setWorkoutDetails(data);
        if (data.weeklyPlan) {
          calculateMaxHeight(data.weeklyPlan);
        }
      })
      .catch(error => console.error('Error fetching the workouts data:', error));
  }, [id, auth.token]);

  const calculateMaxHeight = (plan) => {
    let maxExercises = 0;
    Object.values(plan).forEach(day => {
      if (!day.restDay) {
        maxExercises = Math.max(maxExercises, day.exercises.length);
      }
    });
    setMaxHeight(maxExercises * 100);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubscribe = () => {
    const email = localStorage.getItem('email'); // Get the user email from local storage
  
    if (id && auth && auth.token && email) { // Ensure all necessary properties are defined
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({ userId: email, workoutId: id }) // Use email as userId
      })
        .then(response => response.json())
        .then(data => {
          console.log('Subscription updated:', data);
          setOpenSnackbar(true);
          setTimeout(() => {
            setOpenSnackbar(false);
          }, 3000);
        })
        .catch(error => {
          console.error('Error updating subscription:', error);
        });
    } else {
      console.error('Invalid auth or id or email');
    }
  };
  

  if (!workoutDetails) {
    return <div>Loading...</div>;
  }

  const { weeklyPlan } = workoutDetails;

  return (
    <div>
      <Navbar />
      <Container sx={{ paddingTop: 12 }}>
        <Banner details={workoutDetails} id={id} handleSubscribe={handleSubscribe} />
        <Container>
          <Box sx={{
            bgcolor: 'background.paper',
            margin: '0 auto',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(5px)',
            borderRadius: 2,
            boxShadow: 1
          }}>
            <Tabs value={selectedTab} onChange={handleChange} centered sx={{ backgroundColor: 'white' }}>
              {weeklyPlan && Object.keys(weeklyPlan).map((day, index) => (
                <Tab label={day} key={index} sx={{ backgroundColor: 'white' }} />
              ))}
            </Tabs>
            {weeklyPlan && Object.keys(weeklyPlan).map((day, index) => (
              <TabPanel value={selectedTab} index={index} key={day} minHeight={maxHeight} sx={{ backgroundColor: 'white' }}>
                {weeklyPlan[day].restDay
                  ? <Box sx={{ marginBottom: 2, boxShadow: 2, padding: 2, minHeight: maxHeight, backgroundColor: 'white', borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '2rem' }}>Rest Day</Typography>
                    </Box>
                  : weeklyPlan[day].exercises.map((exercise, i) => (
                      <Card key={i} sx={{ marginBottom: 2, boxShadow: 2, padding: 2, display: 'flex', justifyContent: 'space-between', borderRadius: 4 }}>
                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                            {exercise.name}
                            <Tooltip title={exercise.formTip}>
                              <IconButton>
                                <InfoIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginTop: 1 }}>
                            <FloatingContainer text={`Sets: ${exercise.sets}`} />
                            <FloatingContainer text={`Duration: ${exercise.duration}`} />
                            <FloatingContainer text={`Rest: ${exercise.rest}`} />
                          </Box>
                        </CardContent>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <img src={exercise.exercise_image || 'default_image.jpg'} alt={exercise.name} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain', borderRadius: 8, boxShadow: 3 }} />
                        </Box>
                      </Card>
                    ))}
              </TabPanel>
            ))}
          </Box>
        </Container>
      </Container>
      <Snackbar
        open={openSnackbar}
        message="Success!"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        ContentProps={{
          style: { backgroundColor: 'green' }
        }}
        sx={{ position: 'fixed' }}
      />
    </div>
  );
}

const Banner = ({ details, id, handleSubscribe }) => {
  const {
    name,
    description,
    imageUrl,
    duration = "8 weeks",
    level = "Intermediate",
    type = "Flexibility",
    equipment = "No Equipment",
    location = "Home",
    caloriesBurned = "200-400 calories"
  } = details;

  return (
    <Box
      sx={{
        margin: '0 auto',
        height: 'auto',
        padding: 2,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'left',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ paddingBottom: 2, paddingTop: 6, fontWeight: 'bold', fontSize: '1.5rem' }}>
          {name}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom sx={{ paddingBottom: 2, fontSize: '1rem' }}>
          {description}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSubscribe}
          startIcon={<Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>+</Box>}
          sx={{ marginBottom: 2, borderRadius: 2, textTransform: 'none', padding: '6px 12px', fontSize: '0.875rem' }}
        >
          Subscribe Now
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          marginTop: 2,
          borderRadius: '16px',
          padding: '4px 8px'
        }}
      >
        <FloatingContainer icon={<CalendarTodayIcon />} text={duration} />
        <FloatingContainer icon={<TrendingUpIcon />} text={level} />
        <FloatingContainer icon={<FitnessCenterIcon />} text={type} />
        <FloatingContainer icon={<HomeIcon />} text={equipment} />
        <FloatingContainer icon={<LocationOnIcon />} text={location} />
        <FloatingContainer icon={<LocalFireDepartmentIcon />} text={`${caloriesBurned} calories`} />
      </Box>
    </Box>
  );
};

const FloatingContainer = ({ icon, text }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: '4px 8px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: 1
    }}
  >
    {icon}
    <Typography variant="body2" sx={{ marginLeft: 1 }}>
      {text}
    </Typography>
  </Box>
);

function TabPanel(props) {
  const { children, value, index, minHeight, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, minHeight: minHeight }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default WDetails;
