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
import MiniLoader from "@/components/ui/MiniLoader";
import Summary from "@/features/booking/components/Summary";
import { submitData } from "@/utils/submitData";
import { MultiStepper } from "@/context/MultiStepperProvider";

export default function TripBooking() {
    useDocumentTitle("Ticket Booking");
    const { stepDetails,setValue, value, dispatch, state, setIsDisable, user_, headers, serUser_, isDisable, maxStep} = React.useContext(MultiStepper)
    const { data: vessels, loading: vesselsLoading, error: vesselsError } = useDataFetcher("vessel", null, headers)
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)
    const [loadingSummary, setLoadingSummary] = React.useState(false);
    React.useEffect(() => {
        serUser_({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
        });
    }, [value]);
    React.useEffect(() => {
        if (value?.discount) {
        const summaryTicket = async () => {
            setLoadingSummary(true);
            try {
            const res = await submitData(
                "fare/transactionFare",
                {
                discount_id: parseInt(value.data?.discount_id),
                type_id: value.data?.type_id,
                route_id: value.data?.route_id,
                weight_id: value.data?.weight_id || {}
                },
                headers
            );
            setValue((prevState) => ({
                ...prevState,
                discount: res.data,
            }));
            } catch (err) {
            console.error(err);
            } finally {
            setLoadingSummary(false);
            }
        };
        summaryTicket();
        }
    }, [value?.data]);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
        await submitData("ticket", {...value.data, fare_id : value.discount.data?.fare?.id}, headers);
        setLoading(false);
        navigate("complete");
        } catch (err) {
        console.log("Error", err);
        setLoading(false);
        }
    };
    // if(!isLoggedIn){
    //     navigate("/login");
    // }
    return (
        <MultiStepper.Provider 
        value={{ setValue, value, dispatch, state, setIsDisable, user_, headers}}>
        <section className="w-full h-screen py-[120px] px-[5%]">
            <div className="relative flex  p-10 rounded-3xl max-w-[1180px] mx-auto bg-bg border">
            { state.step === 3 ? ( <Summary value={value} loading={loadingSummary} /> ) : ( "" ) }
            <div className="mx-auto gap-[96px]">
                <StepTracker props={{ state, stepDetails, maxStep }} />
                <form
                    onSubmit={handleOnSubmit}
                    className={`ticket-form step-body mx-auto mt-24 px-10 pt-10  bg-white rounded-xl border flex flex-col select-none max-w-[652.11px] `}>
                {(() => {
                    switch (state.step) {
                    case 1:
                        return <FirstStepOptions props={{ data: vessels, loading: vesselsLoading, error: vesselsError, }}/>
                    case 2:
                        return <SecondStepOptions />;
                    case 3:
                        return <ThirdStep />;
                    default:
                        return <p>Default</p>;
                    }
                })()}
                <StepController props={{ dispatch, state, maxStep, isDisable }} />
                </form>
            </div>
            {loading && <MiniLoader className={`absolute w-full h-full top-0 left-0 bg-slate-900/40 rounded-3xl `}/>}
            </div>
        </section>
        </MultiStepper.Provider>
    );
}
