import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Typography,
  Container,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InfoIcon from "@mui/icons-material/Info";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HomeIcon from "@mui/icons-material/Home";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { AuthContext } from "../context/AuthContext";

function WLogging() {
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [logData, setLogData] = useState({});
  const { auth } = useContext(AuthContext);
  const userId = localStorage.getItem('email');
  const subscribedWorkoutId = useRef("");

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + '/api/workouts/subscribed/' + userId, {
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        subscribedWorkoutId.current = data.workoutId;
        fetch(process.env.REACT_APP_BACKEND_URL + `/api/workouts/${subscribedWorkoutId.current}`, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        })
          .then((response) => response.json())
          .then((data) => {
            setWorkoutDetails(data);
            if (data.weeklyPlan) {
              calculateMaxHeight(data.weeklyPlan);
            }
          })
          .catch((error) =>
            console.error("Error fetching workout details:", error)
          );
      })
      .catch((error) =>
        console.error("Error fetching subscribed workout ID:", error)
      );
  }, [userId, auth.token]);

  const calculateMaxHeight = (plan) => {
    let maxExercises = 0;
    Object.values(plan).forEach((day) => {
      if (!day.restDay) {
        maxExercises = Math.max(maxExercises, day.exercises.length);
      }
    });
    const calculatedHeight = maxExercises * 100;
    setMaxHeight(calculatedHeight);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleLogChange = (day, exerciseIndex, setIndex, field, value) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setLogData((prevData) => {
        const newData = { ...prevData };
        if (!newData[day]) newData[day] = {};
        if (!newData[day][exerciseIndex]) newData[day][exerciseIndex] = {};
        if (!newData[day][exerciseIndex][setIndex])
          newData[day][exerciseIndex][setIndex] = {};
        newData[day][exerciseIndex][setIndex][field] = value;
        return newData;
      });
    }
  };

  const handleLogWorkout = (day, id, userId) => {
    const dayWorkouts = workoutDetails.weeklyPlan[day].exercises;

    const loggedData = {
      userId: userId,
      workoutId: id,
      date: new Date().toISOString(),
      day: day,
      workouts: dayWorkouts.map((workout, index) => {
        if (workout.name === "Cardio Routine") {
          return {
            id: workout._id,
            name: workout.name,
            duration: workout.duration,
            exercises: workout.exercises.map((ex) => ({
              name: ex.name,
              duration: ex.duration,
            })),
          };
        } else {
          return {
            id: workout._id,
            ...workout,
            repsDetails: Array.from({ length: workout.sets }, (_, setIndex) => ({
              reps: logData[day]?.[index]?.[setIndex]?.reps || "",
              weight: logData[day]?.[index]?.[setIndex]?.weight || "",
            })),
          };
        }
      }),
    };

    console.log("Logged JSON data:", JSON.stringify(loggedData, null, 2));

    fetch(process.env.REACT_APP_BACKEND_URL + `/api/workouts/saveUserHistory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(loggedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error saving user history:", error);
      });
  };

  if (!workoutDetails) {
    return <div>Loading...</div>;
  }

  const { weeklyPlan } = workoutDetails;

  return (
    <div>
      <Navbar />
      <Container sx={{ paddingTop: 12 }}>
        <Banner details={workoutDetails} />
        <Container>
          <Box
            sx={{
              bgcolor: "background.paper",
              margin: "0 auto",
              backgroundColor: "white",
              borderRadius: 2,
            }}
          >
            <Tabs value={selectedTab} onChange={handleChange} centered>
              {weeklyPlan &&
                Object.keys(weeklyPlan).map((day, index) => (
                  <Tab label={day} key={index} />
                ))}
            </Tabs>
            {weeklyPlan &&
              Object.keys(weeklyPlan).map((day, index) => (
                <TabPanel
                  value={selectedTab}
                  index={index}
                  key={day}
                  minHeight={maxHeight}
                >
                  {weeklyPlan[day].restDay ? (
                    <Box
                      sx={{
                        marginBottom: 2,
                        boxShadow: 2,
                        padding: 2,
                        minHeight: maxHeight,
                        backgroundColor: "white",
                        borderRadius: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: "2rem" }}>
                        Rest Day
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: "grey.100",
                        borderRadius: 2,
                        padding: 2,
                      }}
                    >
                      {weeklyPlan[day].exercises.map((exercise, i) => (
                        <Box
                          key={i}
                          sx={{
                            marginBottom: 2,
                            boxShadow: 2,
                            padding: 2,
                            backgroundColor: "white",
                            borderRadius: 2,
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Card
                                sx={{
                                  height: "100%",
                                  position: "relative",
                                  backgroundColor: "grey.200",
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={exercise.exercise_image || "default_image.jpg"}
                                  alt={exercise.name}
                                />
                                <CardContent>
                                  <Typography
                                    variant="h6"
                                    component="div"
                                    gutterBottom
                                    sx={{ fontSize: "2rem" }}
                                  >
                                    {exercise.name}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      gap: 1,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <FloatingContainer
                                      text={`Total sets: ${exercise.sets}`}
                                    />
                                    <FloatingContainer
                                      text={`Duration: ${exercise.duration}`}
                                    />
                                    <FloatingContainer
                                      text={`Rest: ${exercise.rest}`}
                                    />
                                  </Box>
                                  <Tooltip title={exercise.formTip}>
                                    <IconButton
                                      sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                      }}
                                    >
                                      <InfoIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {Array.from({ length: exercise.sets }).map(
                                (_, setIndex) => (
                                  <Box
                                    key={setIndex}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mb: 2,
                                    }}
                                  >
                                    <Typography variant="body2" sx={{ mr: 2 }}>
                                      {setIndex + 1}.
                                    </Typography>
                                    <TextField
                                      label="Reps"
                                      variant="outlined"
                                      size="small"
                                      sx={{ mr: 2 }}
                                      value={logData[day]?.[i]?.[setIndex]?.reps || ""}
                                      onChange={(e) =>
                                        handleLogChange(
                                          day,
                                          i,
                                          setIndex,
                                          "reps",
                                          e.target.value
                                        )
                                      }
                                      inputProps={{
                                        inputMode: "decimal",
                                        pattern: "^\\d*\\.?\\d{0,2}$",
                                      }}
                                      disabled={exercise.repIndicator}
                                    />
                                    <TextField
                                      label="Weight"
                                      variant="outlined"
                                      size="small"
                                      value={logData[day]?.[i]?.[setIndex]?.weight || ""}
                                      onChange={(e) =>
                                        handleLogChange(
                                          day,
                                          i,
                                          setIndex,
                                          "weight",
                                          e.target.value
                                        )
                                      }
                                      inputProps={{
                                        inputMode: "decimal",
                                        pattern: "^\\d*\\.?\\d{0,2}$",
                                      }}
                                      disabled={exercise.weightIndicator}
                                    />
                                  </Box>
                                )
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{
                          marginTop: 2,
                          borderColor: "primary.main",
                          color: "primary.main",
                          "&:hover": {
                            backgroundColor: "primary.light",
                            borderColor: "primary.main",
                          },
                        }}
                        onClick={() => handleLogWorkout(day, subscribedWorkoutId.current, userId)}
                      >
                        Log Workout
                      </Button>
                    </Box>
                  )}
                </TabPanel>
              ))}
          </Box>
        </Container>
      </Container>
    </div>
  );
}

const Banner = ({ details }) => {
  const {
    name,
    description,
    imageUrl,
    duration = "8 weeks",
    level = "Intermediate",
    type = "Flexibility",
    equipment = "No Equipment",
    location = "Home",
    caloriesBurned = "200-400 calories",
  } = details;

  return (
    <Box
      sx={{
        margin: "0 auto",
        height: "auto",
        padding: 2,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#e0e0e0",
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "left",
        position: "relative",
      }}
    >
      <Box
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ paddingBottom: 2, paddingTop: 6 }}
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{ paddingBottom: 2 }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
          marginTop: 2,
          borderRadius: "16px",
          padding: "4px 8px",
        }}
      >
        <FloatingContainer icon={<CalendarTodayIcon />} text={duration} />
        <FloatingContainer icon={<TrendingUpIcon />} text={level} />
        <FloatingContainer icon={<FitnessCenterIcon />} text={type} />
        <FloatingContainer icon={<HomeIcon />} text={equipment} />
        <FloatingContainer icon={<LocationOnIcon />} text={location} />
        <FloatingContainer
          icon={<LocalFireDepartmentIcon />}
          text={`${caloriesBurned} calories`}
        />
      </Box>
    </Box>
  );
};

const FloatingContainer = ({ icon, text }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "4px 8px",
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: 1,
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
        <Box
          sx={{
            p: 3,
            minHeight: minHeight,
            backgroundColor: "grey.100",
            borderRadius: 2,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default WLogging;
