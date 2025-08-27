import {useEffect, useState } from 'react';
import Header from './Header'
import {CssBaseline, Container, CircularProgress} from '@mui/material';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from '../api/requests';
import { useCartContext } from '../context/CartContext';


function App() {
    const { setCart } = useCartContext();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
   
      request.Cart.get()
        .then((cart) => setCart(cart))
        .catch(error => console.error("Error fetching cart:", error))
        .finally(() => {
          setLoading(false);
        });
      }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header />
      
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
