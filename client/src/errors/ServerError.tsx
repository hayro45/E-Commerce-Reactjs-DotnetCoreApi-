import { Card, Container, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
    const { state } = useLocation();
    return (
        <Container component={Card} sx={{ p: 3 }}>
        {
            state?.error ? (
                <>
                    <Typography variant="h3" color="error" gutterBottom>{state.error.title} - {state.status}</Typography>
                    <Typography>{state.error.detail || "Unknown error occurred."}</Typography>
                </>
            ) : (
                <Typography variant="h6">No error information available.</Typography>
            )}
        </Container>
    );
}