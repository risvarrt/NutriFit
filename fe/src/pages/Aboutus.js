import React from "react";

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About NutriFit</h1>
      <p style={styles.paragraph}>
        NutriFit is a comprehensive fitness application designed to help users seamlessly integrate exercise and nutrition into their daily lives. Our mission is to provide a one-stop solution for all fitness-related needs, allowing users to discover new workouts, track their progress, and create personalized meal plans.
      </p>
      <div style={styles.teamContainer}>
        <h2 style={styles.subHeader}>Our Team</h2>
        <div style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              style={styles.teamMember}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.teamMember.backgroundColor;
                e.currentTarget.style.color = "#2c3e50";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3 style={styles.name}>{member.name}</h3>
              <p style={styles.role}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.missionContainer}>
        <h2 style={styles.subHeader}>Our Mission</h2>
        <p style={styles.paragraph}>
          At NutriFit, we believe in empowering individuals to achieve their health and wellness goals by providing a seamless blend of fitness and nutrition resources. Our user-friendly platform is designed to cater to all fitness enthusiasts, from beginners to professionals, making it easier to maintain a balanced lifestyle.
        </p>
      </div>
    </div>
  );
};

const teamMembers = [
  { name: "Rhushabh Bontapalle", role: "Full Stack Developer" },
  { name: "Poojitha Mummadi", role: "Full Stack Developer" },
  { name: "Purushotham Parthy", role: "Full Stack Developer" },
  { name: "Jahnavi Prasad Srirampurapu", role: "Full Stack Developer" },
  { name: "Mrunal Mangesh Patkar", role: "Full Stack Developer" },
  { name: "Rishi Varman Rathimala Thangaravi", role: "Full Stack Developer" },
];

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    animation: "fadeIn 2s ease-in-out",
  },
  header: {
    fontSize: "36px",
    textAlign: "center",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  paragraph: {
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "28px",
    marginBottom: "15px",
    color: "#34495e",
  },
  teamContainer: {
    marginBottom: "40px",
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  teamMember: {
    textAlign: "center",
    padding: "30px 10px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
    color: "#2c3e50",
  },
  name: {
    fontSize: "20px",
    marginBottom: "5px",
  },
  role: {
    fontSize: "16px",
  },
  missionContainer: {
    padding: "20px",
    backgroundColor: "#ecf0f1",
    borderRadius: "10px",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

export default AboutUs;
