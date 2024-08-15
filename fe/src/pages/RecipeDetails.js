import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Container,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styled from '@emotion/styled';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

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
`;

const RecipeImage = styled('img')`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const Content = styled(Box)`
  padding: 20px;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1;
  padding: 10px 0;
`;

const ScrollableCard = styled(Paper)`
  height: 300px;
  overflow-y: auto;
  padding: 0 20px 20px 20px; /* Adjusted padding to account for sticky header */
  margin: 10px;
  background: rgba(255, 255, 255, 0.9);
`;

const IngredientText = styled('span')`
  font-weight: bold;
`;

const StepNumber = styled('span')`
  font-weight: bold;
  margin-right: 8px;
`;

const SaveDialog = styled(DialogContent)`
  text-align: center;
  border-radius: 20px;
`;

const CenteredTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
`;

const CustomButton = styled(Button)`
  background-color: #FF9800;
  &:hover {
    background-color: #388E3C;
  }
`;

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/${id}`, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');  
        }
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id, auth, navigate]);

  const handleSaveClick = async () => {
    const userId = localStorage.getItem('email');

    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/save`, {
        userId: userId,
        recipeId: id,
      }, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });

      setSaveMessage('Recipe saved successfully');
      setOpenSaveDialog(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setSaveMessage('Recipe is already saved');
        setOpenSaveDialog(true);
      } else {
        console.error('Error saving recipe:', error);
      }
    }
  };

  const handleSaveDialogClose = () => {
    setOpenSaveDialog(false);
  };

  const handleShareClick = () => {
    setOpenShareDialog(true);
  };

  const handleShareDialogClose = () => {
    setOpenShareDialog(false);
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Recipe not found.
        </Typography>
      </Container>
    );
  }

  return (
    <div>
      <BackgroundContainer aria-hidden="true" />
      <ForegroundContainer component="main">
        <Paper sx={{ margin: '20px 0', padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
          <RecipeImage src="/easy.jpg" alt={recipe.name} />
          <Content>
            <CenteredTitle variant="h4" component="h2">
              {recipe.name}
            </CenteredTitle>
            <Typography variant="subtitle1" color="textSecondary" sx={{ textAlign: 'center' }}>
              {recipe.description}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ScrollableCard role="region" aria-labelledby="ingredients-heading">
                  <SectionTitle id="ingredients-heading" variant="h5">Ingredients</SectionTitle>
                  <List>
                    {recipe.ingredients.map((ingredient, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={<><IngredientText>{ingredient.name}:</IngredientText> {ingredient.quantity}</>} />
                      </ListItem>
                    ))}
                  </List>
                </ScrollableCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <ScrollableCard role="region" aria-labelledby="steps-heading">
                  <SectionTitle id="steps-heading" variant="h5">Steps</SectionTitle>
                  <List>
                    {recipe.steps.map((step, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={<><StepNumber>Step {index + 1}:</StepNumber> {step}</>} />
                      </ListItem>
                    ))}
                  </List>
                </ScrollableCard>
              </Grid>
            </Grid>
          </Content>
          <Divider />
          <Box textAlign="center" my={2}>
            <CustomButton variant="contained" onClick={handleSaveClick}>
              Save
            </CustomButton>
          </Box>
        </Paper>
      </ForegroundContainer>

      <Dialog open={openSaveDialog} onClose={handleSaveDialogClose} aria-labelledby="save-dialog-title">
        <SaveDialog>
          <CheckCircleOutlineIcon style={{ fontSize: 80, color: 'green' }} />
          <DialogTitle id="save-dialog-title">{saveMessage}</DialogTitle>
          <DialogActions>
            <CustomButton onClick={handleSaveDialogClose} variant="contained">
              OK
            </CustomButton>
          </DialogActions>
        </SaveDialog>
      </Dialog>

      <Dialog open={openShareDialog} onClose={handleShareDialogClose} aria-labelledby="share-dialog-title">
        <DialogTitle id="share-dialog-title">Share Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Share this recipe with your friends by copying the link below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="shareLink"
            type="text"
            fullWidth
            variant="outlined"
            value={window.location.href}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleShareDialogClose} variant="contained">
            Close
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecipeDetails;
