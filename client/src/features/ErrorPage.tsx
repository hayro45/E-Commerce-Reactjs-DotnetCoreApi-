import { Alert, AlertTitle, Button, Container, ListItem, ListItemText } from "@mui/material";
import request from "../api/requests";
import { useState } from "react";

export default function ErrorPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    function getValidationError() {
        request.Errors.getValidationError()
        .then(()=> console.log("no validation errors"))
        .catch(err => {
            setValidationErrors(err);
        });
    }
    return (
        <Container>
            {
                validationErrors.length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                       <AlertTitle>Validation Errors</AlertTitle>
                        {validationErrors.map((error, index) => (
                            <ListItem key={index}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </Alert>
                )
            }
            <Button sx={{ mr: 2 }} variant="contained" 
                onClick={() => request.Errors.get400Error().catch(err => console.log(err))}>Get 400 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" 
                            onClick={() => request.Errors.get401Error().catch(err => console.log(err))}>Get 401 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" 
                            onClick={() => request.Errors.get404Error().catch(err => console.log(err))}>Get 404 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" 
                            onClick={() => request.Errors.get500Error().catch(err => console.log(err))}>Get 500 Error</Button>
            <Button sx={{ mr: 2 }} variant="contained" 
                                        onClick={getValidationError}>Validation Error</Button>

        </Container>
    );
};

