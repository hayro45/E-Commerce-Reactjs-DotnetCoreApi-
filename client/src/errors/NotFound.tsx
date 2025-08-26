import { Container, Typography, Card, Divider, Button } from "@mui/material";
import { NavLink } from "react-router";

export default function NotFound() {
    
    return (
        <Container component={Card} sx={{ p: 3 }}>
            <Typography variant="h6">Page not found</Typography>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" component={NavLink} color="primary" to="/catalog">
                Go to Catalog
            </Button>
        </Container>
    );
}