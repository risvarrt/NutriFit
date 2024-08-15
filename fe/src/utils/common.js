
export const getBaseURL = () => {
    return process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/';
}

export const getAPIURL = (apiURL) => {
    return getBaseURL() + apiURL;
}

export const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];
export const typeOptions = ['HIIT', 'Cardio', 'Yoga', 'Strength Training', 'Pilates', 'CrossFit'];
export const goalOptions = ['Fat Loss', 'Muscle Gain', 'Flexibility', 'Endurance', 'Body Toning', 'Overall Health'];
export const locationOptions = ['Home', 'Gym', 'Outdoor', 'Any'];
export const focusOptions = ['Shoulder', 'Biceps', 'Triceps', 'Cardio', 'Chest', 'Lats', 'Thighs', 'Calisthenics'];
export const caloriesOptions = [
    '100-200',
    '200-300',
    '300-400',
    '400-500',
    '500-600',
    '600-700',
  ];