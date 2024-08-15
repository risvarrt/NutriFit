import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Stepper, Step, StepLabel, Box } from '@mui/material';
import * as workoutProgramsAPI from "../api/WorkoutPrograms";
import Step1 from '../components/ProgramForm/Step1';
import Step2 from '../components/ProgramForm/Step2';
import Step3 from '../components/ProgramForm/Step3';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Check from '@mui/icons-material/Check';
import { imgurls } from '../utils/imageUrlConstants'; // Ensure this module exports an array of URLs

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const steps = ['Basic Information', 'Details & Plan', 'Review & Publish'];

const ProgramBuilder = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const existingProgram = location.state?.program || null;

  const imglink = imgurls.length > 0 ? imgurls[Math.floor(Math.random() * imgurls.length)] : '';

  const [formData, setFormData] = useState({
    createdBy: 2,
    name: '',
    description: '',
    duration: '',
    trainer: '',
    level: '',
    targetAudience: '',
    type: '',
    goal: [],
    imagelink: imglink, 
    equipment: '',
    location: '',
    caloriesBurned: '',
    weeklyPlan: {}
  });

  useEffect(() => {
    if (existingProgram) {
      setFormData(existingProgram);
    }
  }, [existingProgram]);

  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    const value = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      [input]: value
    }));
  };

  const handleGoalChange = (option) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      goal: prevFormData.goal.includes(option)
        ? prevFormData.goal.filter(g => g !== option)
        : [...prevFormData.goal, option]
    }));
  };

  const handleWeeklyPlanChange = (weeklyPlan) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      weeklyPlan
    }));
  };

  const publishProgram = async () => {
    try {
      const newImglink = imgurls[Math.floor(Math.random() * imgurls.length)];
      setFormData(prevFormData => ({
        ...prevFormData,
        imagelink: newImglink
      }));
      
      if (existingProgram) {
        await workoutProgramsAPI.updateProgram(formData, existingProgram._id);
      } else {
        await workoutProgramsAPI.addProgram(formData);
      }
      navigate('/my-programs');
    } catch (error) {
      console.error('Error publishing program:', error);
    }
  };

  return (
    <Container>
      <Box sx={{ width: '100%', marginBottom: 3, marginTop: '20px', backgroundColor: '#d9d9d9', borderRadius: '10px', padding: '20px' }}>
        <Stepper alternativeLabel activeStep={step - 1} connector={<QontoConnector />} sx={{ paddingBottom: '20px' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon} sx={{ 
                '& .MuiStepLabel-label': {
                  color: 'primary.main', // Change the color of the label text
                  fontWeight: 'bold'
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: 'secondary.main' // Change the color of the active label text
                },
                '& .MuiStepLabel-label.Mui-completed': {
                  color: 'green' // Change the color of the completed label text
                },
                '& .MuiStepLabel-iconContainer .MuiStepIcon-root.Mui-active': {
                  color: 'secondary.main' // Change the color of the active step icon
                },
                '& .MuiStepLabel-iconContainer .MuiStepIcon-root.Mui-completed': {
                  color: 'green' // Change the color of the completed step icon
                },
                '& .MuiStepLabel-iconContainer .MuiStepIcon-root': {
                  color: 'primary.main' // Change the color of the default step icon
                }
              }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {step === 1 && (
          <Step1
            nextStep={nextStep}
            handleChange={handleChange}
            handleGoalChange={handleGoalChange}
            values={formData}
          />
        )}
        {step === 2 && (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
            onWeeklyPlanChange={handleWeeklyPlanChange}
          />
        )}
        {step === 3 && (
          <Step3
            prevStep={prevStep}
            values={formData}
            publishProgram={publishProgram}
          />
        )}
      </Box>
    </Container>
  );
};

export default ProgramBuilder;
