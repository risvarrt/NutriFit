import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box, Button, CardContent, Card, CardMedia, Grid, CardActionArea, TextField, Typography, Container, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from '../context/AuthContext';

function BWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [filters, setFilters] = useState({
    level: '',
    duration: '',
    type: '',
    equipment: '',
    location: ''
  });
  const [search, setSearch] = useState('');
  const { auth } = useContext(AuthContext);
  
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL+'/api/workouts', {
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setWorkouts(data);
        setFilteredWorkouts(data);
      })
      .catch(error => console.error('Error fetching workouts:', error));
  }, [auth.token]);

  const applyFilters = useCallback(() => {
    let filtered = workouts;

    if (filters.level) {
      filtered = filtered.filter(workout => workout.level === filters.level);
    }
    if (filters.duration) {
      filtered = filtered.filter(workout => workout.duration === filters.duration);
    }
    if (filters.type) {
      filtered = filtered.filter(workout => workout.type === filters.type);
    }
    if (filters.equipment) {
      filtered = filtered.filter(workout => workout.equipment === filters.equipment);
    }
    if (filters.location) {
      filtered = filtered.filter(workout => workout.location === filters.location);
    }
    if (search) {
      filtered = filtered.filter(workout =>
        workout.name.toLowerCase().includes(search.toLowerCase()) ||
        workout.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredWorkouts(filtered);
  }, [workouts, filters, search]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (event) => {
    event.preventDefault(); // Prevent default action
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    applyFilters();
  };

  return (
    <div>
      <Navbar />
      <Container sx={{ paddingTop: 12 }}>
        <Container sx={{
          backgroundImage: 'url("/bWorkouts_banner.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          paddingTop: 2,
          paddingBottom: 2,
          animation: 'backgroundMotion 30s infinite alternate'
        }}>
          <Banner />
          <SearchBar search={search} onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit} />
        </Container>
        <Container sx={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          marginTop: '10px',
          marginBottom: '10px',
          padding: 3,
          borderRadius: '8px',
        }}>
          <NavigationBar filters={filters} handleFilterChange={handleFilterChange} setFilters={setFilters} />
          <Container sx={{ height: '700px', overflowY: 'auto', marginTop: '10px', marginBottom: '10px' }}>
            {filteredWorkouts.length > 0 ? (
              <Grid container spacing={3}>
                {filteredWorkouts.map((workout) => (
                  <Grid item xs={12} sm={6} md={4} key={workout._id}>
                    <WorkoutCard workout={workout} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginTop: 4 }}>
                No workouts found for the above combination.
              </Typography>
            )}
          </Container>
        </Container>
      </Container>
    </div>
  );
}

function NavigationBar({ filters, handleFilterChange, setFilters }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, p: 2 }} className="nav-bar">
      <FormControl sx={{ minWidth: 120, mx: 1 }}>
        <InputLabel>Level</InputLabel>
        <Select
          name="level"
          value={filters.level}
          onChange={handleFilterChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120, mx: 1 }}>
        <InputLabel>Duration</InputLabel>
        <Select
          name="duration"
          value={filters.duration}
          onChange={handleFilterChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="4 weeks">4 weeks</MenuItem>
          <MenuItem value="8 weeks">8 weeks</MenuItem>
          <MenuItem value="12 weeks">12 weeks</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120, mx: 1 }}>
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Cardio">Cardio</MenuItem>
          <MenuItem value="Strength">Strength</MenuItem>
          <MenuItem value="Yoga">Yoga</MenuItem>
          <MenuItem value="Pilates">Pilates</MenuItem>
          <MenuItem value="Flexibility">Flexibility</MenuItem>
          <MenuItem value="HIIT">HIIT</MenuItem>
          <MenuItem value="Recovery">Recovery</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120, mx: 1 }}>
        <InputLabel>Equipment</InputLabel>
        <Select
          name="equipment"
          value={filters.equipment}
          onChange={handleFilterChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="No Equipment">No Equipment</MenuItem>
          <MenuItem value="Dumbbells">Dumbbells</MenuItem>
          <MenuItem value="Resistance Bands">Resistance Bands</MenuItem>
          <MenuItem value="Kettlebells">Kettlebells</MenuItem>
          <MenuItem value="Yoga Mat">Yoga Mat</MenuItem>
          <MenuItem value="Machines">Machines</MenuItem>
          <MenuItem value="Foam Roller">Foam Roller</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120, mx: 1 }}>
        <InputLabel>Location</InputLabel>
        <Select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Gym">Gym</MenuItem>
          <MenuItem value="Outdoor">Outdoor</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        sx={{ mx: 1 }}
        onClick={() => setFilters({
          level: '',
          duration: '',
          type: '',
          equipment: '',
          location: ''
        })}
      >
        Reset
      </Button>
    </Box>
  );
}

function Banner() {
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: 'center',
        marginBottom: 4,
        paddingTop: 10,
        backgroundImage: 'url("path/to/your/banner-image.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: 'black', // Ensure text is visible against the background
        padding: '50px 20px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("path/to/your/banner-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
          zIndex: -1,
        },
      }}
      className="banner-container"
    >
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Discover the world's top workouts to achieve your fitness goals!
        </Typography>
        <Typography variant="subtitle1">
          Curated and personalised workout programs for all kinds of body types at your fingertips!
        </Typography>
      </Box>
    </Container>
  );
}

function SearchBar({ search, onSearchChange, onSearchSubmit }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      mb={4}
      sx={{
        backgroundImage: 'url("path/to/your/searchbar-image.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("path/to/your/searchbar-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
          zIndex: -1,
        },
      }}
      className="search-bar"
    >
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          width: '70%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search your workouts!"
          size="large"
          sx={{ width: '100%' }}
          value={search}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={onSearchSubmit} sx={{ marginLeft: '10px' }}>
          Search
        </Button>
      </Box>
    </Box>
  );
}

function WorkoutCard({ workout }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/workout-details?id=${workout._id}`);
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: 350, 
      marginBottom: 2, 
      display: 'flex', 
      flexDirection: 'column',
      background: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(10px)',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    }} onClick={handleCardClick}>
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={workout.imageUrl}  // Now using the image URL from the workout object
          alt={workout.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {workout.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {workout.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {workout.duration}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Level: {workout.level}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Target Audience: {workout.targetAudience}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BWorkouts;
