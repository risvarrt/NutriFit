import React, { useEffect, useState } from 'react';
import {
  Typography, Button, Card, CardContent, CardMedia, Grid, Container, Box, ThemeProvider, createTheme
} from '@mui/material';
import '../styles/Home.css';
import { Link } from 'react-router-dom';


const theme = createTheme({
  palette: {
    primary: { main: '#4CAF50' },
    secondary: { main: '#FFFFFF' },
  },
});

const WorkoutsSection = ({ workouts }) => {
  if (!workouts || workouts.length === 0) {
    return <Typography variant="h6" sx={{ my: 2 }}>No workouts available.</Typography>;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Recommended Workouts</Typography>
      <Grid container spacing={2}>
        {workouts.map((workout, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="hover-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <CardMedia component="img" height="140" image={workout.imageUrl} alt={workout.name} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">{workout.name}</Typography>
                <Typography variant="body2" color="text.secondary">{workout.duration} - {workout.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const RecipesSection = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <Typography variant="h6" sx={{ my: 2 }}>No recipes available.</Typography>;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Recommended Recipes</Typography>
      <Grid container spacing={2}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="hover-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <CardMedia component="img" height="140" image={recipe.image} alt={recipe.name} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">{recipe.name}</Typography>
                <Typography variant="body2" color="text.secondary">Ingredients: {recipe.ingredients.join(', ')}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const BannerSection = ({ title, subtitle, buttonText, buttonLink, backgroundImage }) => (
  <Box 
    className="hover-banner" 
    sx={{ 
      my: 4, 
      textAlign: 'center', 
      pt: 8, 
      pb: 4, 
      color: 'white', 
      borderRadius: 2, 
      background: `url(${backgroundImage}) no-repeat center center`, 
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', borderRadius: 2 }} />
    <Typography variant="h2" component="h1" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>{title}</Typography>
    <Typography variant="h5" component="h2" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>{subtitle}</Typography>
    <Link to={buttonLink} style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="secondary" size="large" sx={{ position: 'relative', zIndex: 1 }}>
        {buttonText}
      </Button>
    </Link>
  </Box>
);

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/merged_workouts.json')
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching workouts:', error));

    fetch('/recipes.json')
      .then(response => response.json())
      .then(data => setRecipes(data.recipes))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ paddingTop: '80px' }}>
        <BannerSection
          title="EXPLORE"
          subtitle="A NEW FITNESS WORLD"
          buttonText="Explore now"
          buttonLink="/bWorkouts"
          backgroundImage="/nutrifit.jpg"
        />
        <WorkoutsSection workouts={workouts} />
        <BannerSection
          title="DISCOVER NEW RECIPES"
          subtitle="Explore a variety of recipes to complement your fitness journey."
          buttonText="Explore now"
          buttonLink="/recipes"
          backgroundImage="/nutrifit.jpg"
        />
        <BannerSection
          title="BUILD YOUR OWN RECIPE"
          subtitle="Use our AI Recipe Builder to create the perfect recipe!"
          buttonText="Explore now"
          buttonLink="/create-recipe"
          backgroundImage="/nutrifit.jpg"
        />
        <RecipesSection recipes={recipes} />
      </Container>
    </ThemeProvider>
  );
}
