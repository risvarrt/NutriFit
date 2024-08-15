import React, { useContext } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import styles from "../styles/App.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import FAQPage from "../pages/FAQPage";
import ContactForm from "../pages/ContactForm";
import ViewProductsPage from "../pages/ViewProductsPage";
import { CartProvider } from "../context/CartContext";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import CartPage from "../pages/CartPage";
import BlogPage from "../pages/BlogPage";
import BWorkouts from "../pages/BWorkouts";
import WDetails from "../pages/WDetails";
import WLogging from "../pages/WLogging";
import MyPrograms from "../pages/MyPrograms";
import ProgramBuilder from "../pages/ProgramBuilder";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import GymSignIn from "../pages/GymSignIn";
import ResetPassword from "../pages/ResetPassword";
import MyFitnessJourney from "../pages/MyFitnessJourney";
import ProgressReports from "../pages/ProgressReports";
import MetricsHistory from "../pages/MetricsHistory";
import ViewMetricsHistory from "../pages/ViewMetricsHistory";
import PrivateRoute from "./PrivateRoute";
import RecipeBrowser from "../pages/RecipeBrowser";
import RecipeDetails from "../pages/RecipeDetails";
import RecipeBuilder from "../pages/RecipeBuilder.js";
import AboutUs from "../pages/Aboutus.js";
const AppRoutes = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route
        path="/view-products"
        element={<PrivateRoute element={<ViewProductsPage />} />}
      />
      <Route path="/recipes" element={<RecipeBrowser />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/create-recipe" element={<RecipeBuilder />} />
      <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
      <Route path="/blog" element={<PrivateRoute element={<BlogPage />} />} />
      <Route path="/my-journey" element={<MyFitnessJourney />} />
      <Route path="/progress-reports" element={<ProgressReports />} />
      <Route path="/metrics-history" element={<MetricsHistory />} />
      <Route path="/metrics/:id" element={<ViewMetricsHistory />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/gym-login" element={<GymSignIn />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/my-profile"
        element={<PrivateRoute element={<Profile />} />}
      />
      <Route
        path="/my-programs"
        element={<PrivateRoute element={<MyPrograms />} />}
      />
      <Route
        path="/create-program"
        element={<PrivateRoute element={<ProgramBuilder />} />}
      />
      <Route
        path="/edit-program"
        element={<PrivateRoute element={<ProgramBuilder />} />}
      />

      <Route
        path="/bWorkouts"
        element={<PrivateRoute element={<BWorkouts />} />}
      />
      <Route
        path="/workout-details"
        element={<PrivateRoute element={<WDetails />} />}
      />
      <Route
        path="/workout-logging"
        element={<PrivateRoute element={<WLogging />} />}
      />
      <Route path="/Aboutus" element={<AboutUs />} />
    </Routes>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarFooter = [
    "/my-programs",
    "/create-program",
    "/edit-program",
  ].includes(location.pathname);

  return (
    <div className={styles.App}>
      {!hideNavbarFooter && <Navbar />}
      <AppRoutes />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
