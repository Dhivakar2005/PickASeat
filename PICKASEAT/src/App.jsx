import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import Footer from './components/Footer';
import Details from './components/Details';
import Booking from './components/Booking';
import Payment from './components/Payment';
import MyBooking from './components/MyBooking';
import Movies from './components/Movies';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
          <Toaster position="top-center" />
          <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/booking" element={<Booking />}/>
        <Route path="/payment"element={<Payment />}/>
        <Route path="/mybooking"element={<MyBooking />}/>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
