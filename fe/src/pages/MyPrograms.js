import React from 'react';
import ProgramList from '../components/MyPrograms/ProgramList';
import Container from '@mui/material/Container';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Typography, Button, Box } from '@mui/material';

export const BannerSection = ({ title, subtitle, buttonText, buttonLink, backgroundImage }) => (
  <Box 
    className="hover-banner" 
    sx={{ 
      my: 4, 
      textAlign: 'center', 
      pt: 8, 
      pb: 4, 
      color: 'white', 
      borderRadius: 2, 
      background: `url(${backgroundImage}) no-repeat center center`, 
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', borderRadius: 2 }} />
    <Typography variant="h2" component="h1" gutterBottom sx={{ position: 'relative', zIndex: 1 , color:'white' }}>{title}</Typography>
    <Typography variant="h5" component="h2" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>{subtitle}</Typography>
    <Button variant="contained" color="secondary" size="large" href={buttonLink} sx={{ position: 'relative', zIndex: 1 }}>{buttonText}</Button>
  </Box>
);

const MyPrograms = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ padding: '100px', paddingBottom: '50px' }}>
        <BannerSection
          title="My Programs"
          subtitle="List of Programs offered by the Gym"
          buttonText="Explore"
          buttonLink="#"
          backgroundImage="https://media.istockphoto.com/id/1679800838/photo/close-up-of-feet-sportman-runner-running-on-treadmill-in-fitness-club-cardio-workout-healthy.jpg?s=2048x2048&w=is&k=20&c=gCxijqL4nBoDraULTQsitBQtisUGhQH-RhdhHj9DjGo=" 
        />
        <ProgramList />
      </Container>
      <Footer />
    </>
  );
};

export default MyPrograms;
