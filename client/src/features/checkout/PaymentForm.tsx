import { Box, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm(){
    const { register, formState: { errors } } = useFormContext();

    return (
        <Box  sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr'
            },
            gap: 2,
            mb: 2
        }}>
            <Box>
                <TextField 
                    {...register("card_name", {required: "card name is required"})}
                    label="Enter card name" 
                    fullWidth autoFocus 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.card_name}></TextField>

            </Box>
            <Box>
                <TextField 
                    {...register("card_number", {required: "card number is required"})}
                    label="Enter card number" 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.card_number}></TextField>
            </Box>

            <Box>
                <TextField 
                    {...register("expire_date", {required: "expire date is required"})}
                    label="Enter expire date    " 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.expire_date}></TextField>
            </Box>
            <Box>
                <TextField 
                    {...register("card_cvv", {required: "card cvv is required"})}
                    label="Enter card cvv" 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.card_cvv}></TextField>
            </Box>
        </Box>
    );
}
  