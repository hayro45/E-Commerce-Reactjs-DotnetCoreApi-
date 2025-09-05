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
                    {...register("cardname", {required: "card name is required"})}
                    label="Enter card name" 
                    fullWidth autoFocus 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.cardname}></TextField>

            </Box>
            <Box>
                <TextField 
                    {...register("cardnumber", {required: "card number is required"})}
                    label="Enter card number" 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.cardnumber}></TextField>
            </Box>

            <Box>
                <TextField 
                    {...register("cardexpiremonth", {required: "expire month is required"})}
                    label="Enter expire month" 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.cardexpiremonth}></TextField>
            </Box>
            <Box>
                <TextField 
                    {...register("cardexpireyear", {required: "expire year is required"})}
                    label="Enter expire year" 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.cardexpireyear}></TextField>
            </Box>
            <Box>
                <TextField 
                    {...register("cardcvc", {required: "card cvc is required"})}
                    label="Enter card cvc" 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.cardcvc}></TextField>
            </Box>
        </Box>
    );
}
  