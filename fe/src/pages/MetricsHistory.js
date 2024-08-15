// Created by Poojitha Mummadi
// src/pages/MetricsHistory.js
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/MetricsHistory.css";

const MetricsHistory = () => {
  const { auth } = useContext(AuthContext);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/metrics`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMetrics();
  }, [auth.token]);

  return (
    <div className="metrics-history">
      <h1>Metrics History</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Entry</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric._id}>
              <td>{new Date(metric.date).toLocaleDateString()}</td>
              <td>
                <Link to={`/metrics/${metric._id}`}>
                  Click here to see your entry!
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-close">
        <Link to="/">Close</Link>
      </button>
    </div>
  );
};

export default MetricsHistory;
