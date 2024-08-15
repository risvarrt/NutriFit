import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const ProgramCard = ({ title, trainer, duration, imagelink, onEdit }) => {
  return (
    <Card sx={{ width: 345, height: 345, margin: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={imagelink}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <strong>Trainer:  </strong>{trainer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <strong>Duration: </strong>{duration} weeks
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button
            size="large"
            sx={{
              mx: 1,
              color: 'black',
              '&:hover': {
                color: 'white',
                backgroundColor: 'red',
              },
            }}
          >
            View
          </Button>
          <Button onClick={onEdit}
            size="large"
            sx={{
              mx: 1,
              color: 'black',
              '&:hover': {
                color: 'white',
                backgroundColor: 'red',
              },
            }}
          >
            Edit
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProgramCard;
