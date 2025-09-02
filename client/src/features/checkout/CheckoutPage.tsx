import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded, DeliveryDining } from "@mui/icons-material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import requests from "../../api/requests";
import { useDispatch } from "react-redux";
import { clearCart } from "../cart/cartSlice";
import { LoadingButton } from "@mui/lab";

const steps = ["Teslimat Bilgileri","Ödeme","Sipariş Özeti"];

function getStepContent(step: number)
{
    switch(step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error("Bilinmeyen bir step");
    }
}

export default function CheckoutPage()
{
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();

    const [orderId, setOrderId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    function handlePrevious() {
        setActiveStep(activeStep - 1);
    }
    
    async function handleNext(data: FieldValues) {
        if(activeStep === steps.length - 1){
            setIsLoading(true);
            try {
                
                const order = await requests.Order.createOrder(data);
                if(order) setOrderId(order.id);
                dispatch(clearCart());
                setActiveStep(activeStep + 1);
            } catch (error) {
                console.error("Error creating order:", error);
            } finally {
                setIsLoading(false);
            }
        }
        else {
            setActiveStep(activeStep + 1);

        }
    }

    return (
        <FormProvider {...methods}>
            <Paper>
                {/* Ana content grid layout */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: activeStep !== steps.length ? { xs: '1fr', md: '1fr 2fr' } : '1fr',
                    gap: 4
                }}>
                    {activeStep!==steps.length && (
                        <Box sx={{
                            borderRight: "1px solid",
                            borderColor: "divider",
                            p: 2, height: "fit-content"
                        }}>
                            <Info />
                        </Box>
                    )}
                    

                    {/* Sağ taraf - Form */}
                    <Box sx={{ p: 4 }}>
                        <Stepper activeStep={activeStep} sx={{ mb: 4, height: 40 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                            {activeStep === steps.length ? (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <h2><span style={{fontSize: "1.5em", verticalAlign: "middle", marginRight: 8}}>📦</span>	 Sipariş tamamlandı.</h2>
                                    <p>Siparişiniz en kısa sürede hazırlanıp gönderilecektir.</p>
                                    <DeliveryDining sx={{ fontSize: "2em", verticalAlign: "middle", marginRight: 1 }} color="action" />
                                    <Typography variant="h6" sx={{ mt: 2 }}>Sipariş Numaranız: <strong>#{orderId}</strong></Typography>
                                    <Button variant="contained" color="primary" sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" }, mt: 2 }}>
                                        Siparişleri Görüntüle
                                    </Button>
                                </Box>
                            ) : (
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {/* Form content */}
                                    <Box sx={{ mb: 3 }}>
                                        {getStepContent(activeStep)}
                                    </Box>

                                    {/* Navigation buttons */}
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: activeStep !== 0 ? "space-between" : "flex-end",
                                        gap: 2
                                    }}>
                                        {activeStep !== 0 && (
                                            <Button 
                                                startIcon={<ChevronLeftRounded />} 
                                                variant="outlined" 
                                                onClick={handlePrevious}
                                            >
                                                Geri
                                            </Button>
                                        )}

                                        <LoadingButton
                                            loading={isLoading} 
                                            type="submit"
                                            endIcon={<ChevronRightRounded />} 
                                            variant="contained"
                                            color={activeStep === steps.length - 1 ? "success" : "primary"}
                                        >
                                            {activeStep === steps.length - 1 ? "Siparişi Tamamla" : "İleri"}
                                        </LoadingButton>
                                    </Box>
                                </form>
                            )}
                    </Box>
                </Box>
            </Paper>
        </FormProvider>
    );
}