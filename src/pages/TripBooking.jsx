import React from "react";
import "../features/booking/assets/index.css";
import {
  StepTracker,
  StepController,
  FirstStepOptions,
} from "@/features/booking";
import useDataFetcher from "@/hooks/useDataFetcher";
import SecondStepOptions from "@/features/booking/components/SecondStepOptions";
import ThirdStep from "@/features/booking/components/ThirdStep";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import Summary from "@/features/booking/components/Summary";
import { useMultiForm } from "@/context/MultiStepperProvider";
import api from "@/api/api";
import { useAuth } from "@/context/AuthProvider";
import Footer from '@/components/Footer';
import { FORM_DATA_SANITIZATION } from "@/utils/tripBookingUtils";

export default function TripBooking() {
    useDocumentTitle("Cargo Booking");
    const { stepDetails,setValue, value, dispatch, state, isDisable, maxStep} = useMultiForm()
    const { data: vessels, loading: vesselsLoading, error: vesselsError } = useDataFetcher("/vessel")
    const [loading, setLoading] = React.useState(false)
    const {token} = useAuth()
    console.log(value);
    React.useEffect(() => {
        if (value?.discount) {
            const request = value.data
            const payload = {
                discount_id: parseInt(request?.discount_id),
                type_id: request?.type_id,
                route_id: request?.route_id,
                weight_id: request?.weight_id || {},
                additional: request?.additional
            }
            const fareRequest = async () => {
                try{
                    const res = await api.post("/fare/transactionFare", payload, token)
                    setValue((prevState) => ({
                        ...prevState,
                        discount: res.data,
                    }));
                }catch(err){
                    console.error(err);
                }
            }
            fareRequest();
        }
    }, [value?.data]);

    if(state.status === 'done'){
        return <Navigate to="complete"/>
    }else if(state.status === 'reset'){
        return window.location.reload();
    }
    const onSubmitForm = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = FORM_DATA_SANITIZATION(value);
            await api.post("/ticket", {...formData, fare_id : value.discount.data?.fare?.id, payment: value.discount.data, total_amount: value.total_amount}, token);
            setLoading(false);
            dispatch({ type: "DONE" });
        } catch (err) {
            console.error("Error", err);
            setLoading(false);
        }
    };
    return (
        <React.Fragment>
            <section className="w-full min-h-screen py-[120px] px-[5%]">
                <div className="relative flex p-10 rounded-3xl  max-w-[1180px] mx-auto  borderbg-bg">
                { state.step !== 4 ? ( <Summary setValue={setValue} value={value} /> ) : ( "" ) }
                <div className="mx-auto gap-[96px]">
                    <StepTracker props={{ state, stepDetails, maxStep }} />
                    <form
                        onSubmit={onSubmitForm}
                        className={`ticket-form step-body mx-auto mt-24  px-10 pt-10  bg-white rounded-xl border flex flex-col select-none max-w-[652.11px] shadow-lg`}>
                        {state.step === 1 && <FirstStepOptions props={{ data: vessels, loading: vesselsLoading, error: vesselsError }} />}
                        {state.step === 2 && <SecondStepOptions />}
                        {state.step === 3 && <ThirdStep />}
                    <StepController props={{ dispatch, state, maxStep, isDisable, loading }} />
                    </form>
                </div>
                </div>
            </section>
            <Footer />
        </React.Fragment>
    );
}
