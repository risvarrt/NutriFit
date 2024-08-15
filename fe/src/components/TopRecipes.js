import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Container,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import styled from '@emotion/styled';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RecipeImage = styled(CardMedia)`
  height: 140px;
`;

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 2;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const TopRecipes = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth && auth.token) {
      fetchTopRecipes();
    }
  }, [auth]);

  const fetchTopRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/top`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      setTopRecipes(response.data);
    } catch (error) {
      console.error('Error fetching top recipes:', error);
    }
    setLoading(false);
  };

  if (!auth) {
    return (
      <Typography variant="h6" gutterBottom>
        Please log in to see the top recipes.
      </Typography>
    );
  }

  return (
    <Container sx={{ width: '100%', marginTop: '20px' }}>
      <Paper sx={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography variant="h6" gutterBottom>
          No Such recipe found! Please checkout our other recipes.
        </Typography>
        {loading ? (
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ padding: 2, background: 'rgba(255, 255, 255, 0.8)', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CircularProgress />
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {topRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none' }}>
                  <StyledCard>
                    <RecipeImage image="/easy.jpg" title={recipe.name} />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">{recipe.name}</Typography>
                      <Typography variant="body2" color="text.secondary">Ingredients: {recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</Typography>
                    </CardContent>
                  </StyledCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default TopRecipes;
