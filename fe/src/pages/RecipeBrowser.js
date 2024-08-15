import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import {
  IconButton,
  Typography,
  Container,
  Paper,
  Box,
  TextField,
  Grid,
  CircularProgress,
  Button,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';
import { AuthContext } from '../context/AuthContext';
import debounce from 'lodash/debounce';
import TopRecipes from '../components/TopRecipes';
import { Link } from 'react-router-dom';

const BackgroundContainer = styled('div')`
  background-size: cover;
  filter: blur(10px);
  border-radius: 25px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const ForegroundContainer = styled(Container)`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  width: 95%;
  max-width: 1000px; /* Ensures a consistent maximum width */
`;

const CustomButton = styled(IconButton)`
  background-color: #388E3C; /* Green */
  &:hover {
    background-color: #FF9800; /* Orange */
  }
`;

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

const RecipeBrowser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { auth } = useContext(AuthContext);

  const fetchTopRecipes = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/all`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      setRecipes(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Token is invalid. Please login again.');
      } else {
        console.error('Error fetching top recipes:', error);
        setErrorMessage('An error occurred while fetching top recipes.');
      }
    }
    setLoading(false);
  }, [auth]);

  const fetchSavedRecipes = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/saved`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      setSavedRecipes(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Token is invalid. Please login again.');
      } else {
        console.error('Error fetching saved recipes:', error);
        setErrorMessage('An error occurred while fetching saved recipes.');
      }
    }
    setLoading(false);
  }, [auth]);

  useEffect(() => {
    if (!showSaved) {
      fetchTopRecipes();
    } else {
      fetchSavedRecipes();
    }
  }, [fetchTopRecipes, fetchSavedRecipes, showSaved]);

  const handleSearch = useCallback(
    debounce(async (query) => {
      if (!auth) {
        setErrorMessage('Token is invalid. Please login again.');
        return;
      }

      if (query === '') {
        fetchTopRecipes();
        return;
      }

      setLoading(true);
      setErrorMessage('');
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes`, {
          params: { search: query },
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        setRecipes(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage('Token is invalid. Please login again.');
        } else {
          console.error('Error fetching recipes:', error);
          setErrorMessage('An error occurred while fetching recipes.');
        }
      }
      setLoading(false);
    }, 300),
    [auth, fetchTopRecipes]
  );

  useEffect(() => {
    if (searchQuery === '') {
      fetchTopRecipes();
    } else {
      handleSearch(searchQuery);
    }
  }, [searchQuery, handleSearch, fetchTopRecipes]);

  return (
    <div>
      <BackgroundContainer aria-hidden="true" />
      <ForegroundContainer component="main">
        <Paper sx={{ margin: '20px 0', padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Search Recipes"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <CustomButton color="white" aria-label="search" onClick={() => handleSearch(searchQuery)}>
              <SearchIcon />
            </CustomButton>
            <Button
              variant="contained"
              sx={{ marginLeft: 2, backgroundColor: '#388E3C', '&:hover': { backgroundColor: '#FF9800' } }}
              onClick={() => setShowSaved(!showSaved)}
            >
              {showSaved ? 'Show All Recipes' : 'Show Saved Recipes'}
            </Button>
          </Box>
          {errorMessage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography color="error">{errorMessage}</Typography>
            </Box>
          )}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {recipes.length === 0 && !showSaved && (
                <Grid item xs={12}>
                  <TopRecipes />
                </Grid>
              )}
              {(showSaved ? savedRecipes : recipes).map((recipe) => (
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
      </ForegroundContainer>
    </div>
  );
};

export default RecipeBrowser;
