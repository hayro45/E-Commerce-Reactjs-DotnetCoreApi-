import { DeliveryDining, Payments } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Review(){
    const {getValues} = useFormContext();

    return (
        <>
            <Stack spacing={2} sx={{ mb:3 }}>
                <Stack direction={"column"} divider= {<Divider />} spacing={2} sx={{ my: 2 }}>
                    <div>
                        <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <DeliveryDining color="action" />
                            Teslimat Bilgileri
                        </Typography>
                        <Typography variant="body2">
                            {getValues("firstname")} {getValues("lastname")}
                        </Typography>
                         <Typography variant="body2">
                            {getValues("phone")}
                        </Typography>
                         <Typography variant="body2">
                            {getValues("addressline")} / {getValues("city")}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Payments color="action" />
                            Ödeme Bilgileri
                        </Typography>
                        <Typography variant="body2">
                            {getValues("cardname")} 
                        </Typography>
                         <Typography variant="body2">
                            {getValues("cardnumber")}
                        </Typography>
                         <Typography variant="body2">
                            {getValues("cardexpiremonth")}/{getValues("cardexpireyear")}
                        </Typography>
                        <Typography variant="body2">
                            {getValues("cardcvv")}
                        </Typography>
                    </div>

                </Stack>
            </Stack>

        </>
    );
}
