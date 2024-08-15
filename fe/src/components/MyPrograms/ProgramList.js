import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ProgramCard from './ProgramCard';
import Card from '@mui/material/Card';
import { Link, useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import * as workoutProgramsAPI from "../../api/WorkoutPrograms";

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await workoutProgramsAPI.getPrograms();
        setPrograms(response);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleEditProgram = (program) => {
    navigate('/edit-program', { state: { program } });
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      {programs.map((program, index) => (
        <Grid item key={index}>
          <ProgramCard 
            title={program.name} 
            trainer={program.trainer} 
            duration={program.duration} 
            imagelink={program.imagelink}
            onEdit={() => handleEditProgram(program)}
          />
        </Grid>
      ))}
      <Grid item>
        <Card sx={{ width: 345, height: 345, margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0' }}>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/create-program" style={{ textDecoration: 'none' }}>
              <IconButton color="primary" aria-label="add program" size="large">
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Link>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Create New Program
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProgramList;
