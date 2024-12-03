import MiniLoader from "@/components/ui/MiniLoader";
import Typography from "@/components/ui/Typography";
import { formatToPeso, TRANSACTION_SUMMARY } from "@/utils/tripBookingUtils";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function Summary({ value }) {
    const {fare ,additionalFee ,discountApplied ,type ,accomodation ,vessel ,totalBeforeDiscount ,discountAmount ,totalAmount } = TRANSACTION_SUMMARY(value)

    const [isSummaryOpen, setIsSummaryOpen] = React.useState();

    return (
        // <div className={`fixed top-20 z-50 right-0 `}>
        <React.Fragment>
            {/* <IoIosArrowRoundForward className={`absolute top-0 left-0 -translate-x-full select-none cursor-pointer`} size={30}  onClick={(e) => setIsSummaryOpen(!isSummaryOpen)}/> */}
            <div className={`relative mx-auto w-[400px] xh-screen p-8 border transition-all rounded-2xl bg-white shadow-lg ${isSummaryOpen ? 'hidden xtranslate-x-full' : 'block xtranslate-x-0' }`}>
                {/* {loading && <MiniLoader className={`absolute w-full h-full top-0 left-0 bg-white rounded-3xl `}/>  }  */}
                <Typography variant="h4" className={``}>
                    Summary
                </Typography>
                <Typography
                    color="light"
                    variant="info"
                    className={`w-[300px] text-wrap mt-2 `}>
                    This summary provides an overview of your transaction amounts, and
                    details.
                </Typography>
                <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-6"></span>
                <SummaryContentText value={value.data?.ticket_number} name="Transaction ID"/>
                <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-4"></span>
                <div className="items-center w-full mt-4 flex justify-between">
                    <div className="flex items-center gap-x-1">
                        <IoIosArrowRoundForward className="text-primary"/>
                        <Typography color="gray" className={`!text-[11px] font-semibold uppercase`}>Route</Typography>
                    </div>
                    {/* <Typography className={`text-[14px] font-medium`}>Route</Typography> */}
                    {value.details.route.id ? (
                    <div className="flex items-center gap-x-2 font-semibold uppercase">
                        <Typography
                        variant="span"
                        className={` ${
                            value.details.route.type === "out"
                            ? "bg-error"
                            : "bg-success"
                        } px-3 py-[2px] text-white rounded text-[10px]`}>
                            {value.details.route.type === "out" ? "Out" : "In"}
                        </Typography>
                        <Typography color="gray"  className={`!text-[11px] `}>
                            {value.details.route.origin}
                        </Typography>
                        <IoIosArrowRoundForward />
                        <Typography color="gray"  className={`!text-[11px] `}>
                            {value.details.route.destination}
                        </Typography>
                    </div>
                    ) : (
                    <Typography color="gray"  className={`!text-[11px] font-semibold uppercase`}>
                        N/A
                    </Typography>
                    )}
                </div>
                <SummaryContentText value={vessel} name="Vessel"/>
                <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-4"></span>
                <SummaryContentText value={type} name="Type" childClass={``}/>
                <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-4"></span>
                <SummaryContentText value={formatToPeso(fare)} name="Transportation fee"/>
                <SummaryContentText value={accomodation} name="Accommodation Type"/>
                <SummaryContentText value={ formatToPeso(additionalFee)} name="Service Charge"/>
                <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-4"></span>
                <SummaryContentText arrowVisible={false} value={formatToPeso(totalBeforeDiscount)} name="Total" className="!sr-onlyfont-bold " childClass={`capitalize !text-blue-400`}/>
                <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-4"></span>
                <SummaryContentText value={discountApplied} name="Discount Applied" childClass={`capitalize `}/>
                <SummaryContentText value={` - ${formatToPeso(discountAmount)} `} name="Amount Off" childClass={`capitalize`}/>
                <span className="block h-[2px] border-dotted w-full border-b-2 border-gray-300 mt-4"></span>
                <SummaryContentText arrowVisible={false} value={formatToPeso(totalAmount)} name="Total Amount" className="!font-bold" childClass={`!text-[14px] !text-blue-400 font-bold`}/>

            </div>
        </React.Fragment>
        // </div>
  );
}

const SummaryContentText = ({value, name, className, childClass, arrowVisible = true}) =>{
  return (
    <div className="items-center w-full mt-4 flex justify-between">
      <div className="flex items-center gap-x-1">
        {arrowVisible ? <IoIosArrowRoundForward className="text-primary"/> : null}
        <Typography color="gray" className={`!text-[11px] font-semibold uppercase ${className}`}>{name}</Typography>
      </div>
        <div className="flex items-center gap-x-3">
          <Typography color="gray" className={`!text-[11px] uppercase font-semibold ${childClass}`}>
            {value}
          </Typography>
        </div>
      </div>
  )
}
