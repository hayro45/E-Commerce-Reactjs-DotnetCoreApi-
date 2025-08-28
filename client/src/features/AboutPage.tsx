import {Container, Typography} from '@mui/material'
import Counter from './counter/Counter';

export default function AboutPage(){
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography paragraph>
        Welcome to our e-commerce application! We are dedicated to providing you with the best online shopping experience.
      </Typography>
      <Counter />
    </Container>
  );
}