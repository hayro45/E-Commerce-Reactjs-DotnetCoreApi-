import {useEffect, useState } from 'react';
import Header from './Header'
import {CssBaseline, Container, CircularProgress} from '@mui/material';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from '../api/requests';
import { useAppDispatch } from '../hooks/hooks';
import { setCart } from '../features/cart/cartSlice';


function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
   
      request.Cart.get()
        .then(cart => dispatch(setCart(cart)))
        .catch(error => console.error(error))
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
