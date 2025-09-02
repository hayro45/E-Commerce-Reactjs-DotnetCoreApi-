import { Box, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm(){
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
                    {...register("firstname", {required: "firstname is required"})}
                    label="Enter firstname" 
                    fullWidth autoFocus 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.firstname}></TextField>

            </Box>
            <Box>
                <TextField 
                    {...register("lastname", {required: "lastname is required"})}
                    label="Enter lastname" 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.lastname}></TextField>
            </Box>

            <Box>
                <TextField 
                    {...register("phone", {required: "phone is required"})}
                    label="Enter phone" 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.phone}></TextField>
            </Box>
            <Box>
                <TextField 
                    {...register("city", {required: "city is required"})}
                    label="Enter city" 
                    fullWidth 
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.city}></TextField>
            </Box>
            <Box sx={{
                gridColumn: {
                    xs: '1',        // Mobile: 1. kolon (tek kolon var)
                    md: '1 / -1'    // Desktop: 1'den son kolona kadar (2 kolon kaplar)
                }
            }}>
                <TextField 
                    {...register("addressline", {required: "addressline is required"})}
                    label="Enter address line " 
                    fullWidth 
                    multiline
                    rows={5}
                    sx={{mb: 2}} 
                    size="small"
                    error={!!errors.addressline}></TextField>
            </Box>
        </Box>
    );
}
  