// write a function that makes a request to the server to get all the interests and subinterests from backend
import api from "../utils/api";

export const getPrograms = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get('/api/workout-programs/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  console.log(response);
  return response.data;
};

export const addProgram = async (workoutprogram) => {
  // read token from local storage
  const token = localStorage.getItem("token");
  const response = await api.post('/api/workout-programs/', workoutprogram, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateProgram = async (workoutprogram,programID) => {
  console.log('Updating Program ID:', programID);
    console.log('Workout Program Data:', workoutprogram);
  // read token from local storage
  const token = localStorage.getItem("token");
  const response = await api.put(`/api/workout-programs/${programID}`, workoutprogram, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};
