import React, { useState, useEffect, useContext } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { AuthContext } from "../context/AuthContext";
import Modal from "react-modal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "../styles/ProgressReports.css"; // Import the CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Initialize with empty data
const initialLineChartData = {
  labels: [],
  datasets: [
    {
      label: "Weight Progress",
      data: [],
      fill: false,
      borderColor: "blue",
    },
  ],
};

const initialDoughnutChartData = {
  labels: ["Carbohydrates", "Protein", "Fats"],
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const ProgressReports = () => {
  const { auth } = useContext(AuthContext);
  const [lineChartData, setLineChartData] = useState(initialLineChartData);
  const [doughnutChartData, setDoughnutChartData] = useState(
    initialDoughnutChartData
  );
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showCaloriesModal, setShowCaloriesModal] = useState(false);
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("");
  const [metrics, setMetrics] = useState({
    weight: "",
    bodyFat: "",
    muscleMass: "",
    bmi: "",
    notes: "",
  });
  const [calories, setCalories] = useState({
    totalCalories: "",
    carbohydrates: "",
    protein: "",
    fats: "",
    fiber: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [caloriesErrors, setCaloriesErrors] = useState({});

  useEffect(() => {
    if (auth && auth.token) {
      fetchWeightData();
      fetchCalorieData();
    }
  }, [auth]);

  const fetchWeightData = async () => {
    if (!auth || !auth.token) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/weight/all`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const newLabels = data.map((entry) =>
          new Date(entry.date).toLocaleDateString()
        );
        const newWeightData = data.map((entry) => entry.weight);

        setLineChartData({
          labels: newLabels,
          datasets: [{ ...lineChartData.datasets[0], data: newWeightData }],
        });
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching weight data:", error);
    }
  };

  const fetchCalorieData = async () => {
    if (!auth || !auth.token) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/calories/all`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const newCaloriesData = data.reduce(
          (acc, entry) => {
            acc[0] += entry.carbohydrates || 0;
            acc[1] += entry.protein || 0;
            acc[2] += entry.fats || 0;
            return acc;
          },
          [0, 0, 0]
        );

        setDoughnutChartData({
          labels: ["Carbohydrates", "Protein", "Fats"],
          datasets: [
            { ...doughnutChartData.datasets[0], data: newCaloriesData },
          ],
        });
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching calorie data:", error);
    }
  };

  const handleAddWeightClick = () => {
    setShowWeightModal(true);
  };

  const handleAddCaloriesClick = () => {
    setShowCaloriesModal(true);
  };

  const handleWeightFormSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!date) {
      formErrors.date = "Date is required";
    }
    if (!metrics.weight) {
      formErrors.weight = "Weight is required";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!auth || !auth.token) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/weight/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ ...metrics, date }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        fetchWeightData();
        setShowWeightModal(false);
        setMetrics({
          weight: "",
          bodyFat: "",
          muscleMass: "",
          bmi: "",
          notes: "",
        });
        setDate("");
        setErrors({});
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error saving weight progress:", error);
    }
  };

  const handleCaloriesFormSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!date) {
      formErrors.date = "Date is required";
    }
    if (!mealType) {
      formErrors.mealType = "Meal Type is required";
    }
    if (!calories.totalCalories) {
      formErrors.totalCalories = "Total Calories is required";
    }
    if (!calories.carbohydrates) {
      formErrors.carbohydrates = "Carbohydrates are required";
    }
    if (!calories.protein) {
      formErrors.protein = "Protein is required";
    }
    if (!calories.fats) {
      formErrors.fats = "Fats are required";
    }
    if (Object.keys(formErrors).length > 0) {
      setCaloriesErrors(formErrors);
      return;
    }

    if (!auth || !auth.token) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/calories/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            ...calories,
            date,
            mealType,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        fetchCalorieData();
        setShowCaloriesModal(false);
        setCalories({
          totalCalories: "",
          carbohydrates: "",
          protein: "",
          fats: "",
          fiber: "",
          notes: "",
        });
        setCaloriesErrors({});
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error saving calories data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetrics({ ...metrics, [name]: value });
  };

  const handleCaloriesInputChange = (e) => {
    const { name, value } = e.target;
    setCalories({ ...calories, [name]: value });
  };

  return (
    <div className="container">
      <header className="header"></header>
      <main className="main">
        <div className="charts">
          <div className="chart">
            <h2>Your progress so far! Great Job!</h2>
            <Line
              data={lineChartData}
              options={{
                scales: {
                  y: {
                    ticks: {
                      stepSize: 20, // Set the interval for y-axis ticks
                      beginAtZero: true,
                      callback: function (value) {
                        return value; // Custom labels (values)
                      },
                    },
                  },
                },
              }}
            />
            <button className="chart-button" onClick={handleAddWeightClick}>
              + Add Weight Progress
            </button>
          </div>
          <div className="PiechartContainer">
            <h2>Calories Consumed</h2>
            <div className="PieChart">
              <Doughnut
                data={doughnutChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  height: 325,
                  width: 325,
                }}
              />
            </div>
            <button className="chart-button" onClick={handleAddCaloriesClick}>
              + Add today's Calories
            </button>
          </div>
        </div>
      </main>
      <Modal
        isOpen={showWeightModal}
        onRequestClose={() => setShowWeightModal(false)}
        contentLabel="Add Weight Progress"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Add Weight Progress</h2>
        <button
          className="close-button"
          onClick={() => setShowWeightModal(false)}
        >
          X
        </button>
        <form className="chart-form" onSubmit={handleWeightFormSubmit}>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={errors.date ? "input-error" : ""}
            />
            {errors.date && (
              <span className="error-message">{errors.date}</span>
            )}
          </label>
          <label>
            Weight:
            <input
              type="number"
              name="weight"
              value={metrics.weight}
              onChange={handleInputChange}
              className={errors.weight ? "input-error" : ""}
            />
            {errors.weight && (
              <span className="error-message">{errors.weight}</span>
            )}
          </label>
          <label>
            Body Fat (%):
            <input
              type="number"
              name="bodyFat"
              value={metrics.bodyFat}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Muscle Mass:
            <input
              type="number"
              name="muscleMass"
              value={metrics.muscleMass}
              onChange={handleInputChange}
            />
          </label>
          <label>
            BMI:
            <input
              type="number"
              name="bmi"
              value={metrics.bmi}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Notes:
            <textarea
              name="notes"
              value={metrics.notes}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
      <Modal
        isOpen={showCaloriesModal}
        onRequestClose={() => setShowCaloriesModal(false)}
        contentLabel="Add Today's Calories"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Add Today's Calories</h2>
        <button
          className="close-button"
          onClick={() => setShowCaloriesModal(false)}
        >
          X
        </button>
        <form className="chart-form" onSubmit={handleCaloriesFormSubmit}>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={caloriesErrors.date ? "input-error" : ""}
            />
            {caloriesErrors.date && (
              <span className="error-message">{caloriesErrors.date}</span>
            )}
          </label>
          <label>
            Meal Type:
            <select
              name="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className={caloriesErrors.mealType ? "input-error" : ""}
            >
              <option value="">Select Meal Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
            {caloriesErrors.mealType && (
              <span className="error-message">{caloriesErrors.mealType}</span>
            )}
          </label>
          <label>
            Total Calories:
            <input
              type="number"
              name="totalCalories"
              value={calories.totalCalories}
              onChange={handleCaloriesInputChange}
              className={caloriesErrors.totalCalories ? "input-error" : ""}
            />
            {caloriesErrors.totalCalories && (
              <span className="error-message">
                {caloriesErrors.totalCalories}
              </span>
            )}
          </label>
          <label>
            Carbohydrates (g):
            <input
              type="number"
              name="carbohydrates"
              value={calories.carbohydrates}
              onChange={handleCaloriesInputChange}
              className={caloriesErrors.carbohydrates ? "input-error" : ""}
            />
            {caloriesErrors.carbohydrates && (
              <span className="error-message">
                {caloriesErrors.carbohydrates}
              </span>
            )}
          </label>
          <label>
            Protein (g):
            <input
              type="number"
              name="protein"
              value={calories.protein}
              onChange={handleCaloriesInputChange}
              className={caloriesErrors.protein ? "input-error" : ""}
            />
            {caloriesErrors.protein && (
              <span className="error-message">{caloriesErrors.protein}</span>
            )}
          </label>
          <label>
            Fats (g):
            <input
              type="number"
              name="fats"
              value={calories.fats}
              onChange={handleCaloriesInputChange}
              className={caloriesErrors.fats ? "input-error" : ""}
            />
            {caloriesErrors.fats && (
              <span className="error-message">{caloriesErrors.fats}</span>
            )}
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default ProgressReports;
