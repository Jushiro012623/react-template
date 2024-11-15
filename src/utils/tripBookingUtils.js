/**
 * @param {string} state
 * @param {string} value
**/
export const isActive = (state = '', value = '') => {
    if (value === state){
        return 'border-indigo-400 bg-indigo-400/40'; 
    }else{
        return 'border-gray-200';
    }
}
export const formatToPeso = (value) =>{
  const formattedAmount = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
  return formattedAmount;
}
/**
 * @param {number} option
 * @param {object} value
 * @param {object} initialValue
 * @return {boolean} 
 **/
export const isFormValid = (option, value ,initialValue) => {
    if (option === 1) {
      return (value.data?.additional && value.data?.discount_id) || (initialValue.additional && initialValue.discount_id) ;
    } else if (option === 2) {
      return (value.data?.vehicle_type && value.data?.plate_number && value.data?.weight_id ) || (initialValue.vehicle_type && initialValue.plate_number && initialValue.weight_id) 
    } else if (option === 3) {
      return (value.data?.item_name && value.data?.cargo_description && value.data?.quantity && value.data?.weight_id ) || (initialValue.item_name && initialValue.cargo_description && initialValue.quantity && initialValue.weight_id);
    } else{
      return value.data?.vehicle_type && value.data?.plate_number && value.data?.weight_id && value.data?.item_name && value.data?.cargo_description && value.data?.quantity && value.data?.additional && value.data?.discount_id
    }
};

export const GENERATE_TRANSACTION_ID = `GT-${Math.random().toString(36).substring(2, 10000000000).toUpperCase()} `
export const VALUE_FORMAT = {
    data: {
      ticket_number: GENERATE_TRANSACTION_ID,
    },
    details: {
      route: {
        type: null,
        origin: null,
        destination: null,
        id: null,
      },
    },
}
export const TRANSACTION_SUMMARY = (value) => {
    const   fare = parseFloat(value.discount?.data?.fare?.fare) || 0.00, 
            additionalFee = parseFloat(value.discount?.data?.fare?.additional_fee) || 0.00, 
            discountApplied = value.discount?.data?.discount?.name || 'REGULAR', 
            amountOff = parseFloat(value.discount?.data?.discount?.deduction) || 0.00, 
            type = value.data.type_id === 1 ? 'Passenger' : (value.data.type_id === 2 ? 'Rolling Cargo' : (value.data.type_id === 3 ? 'Drop Cargo' : 'N/a')), 
            accomodation = value.data?.additional && value.data?.type_id === 1 ? (value.data?.additional == 1 ? 'AIRCONDITIONED' : 'BASIC') : "n/a", 
            vessel = value.details.vessel_name ? value.details.vessel_name : "n/a", 
            totalBeforeDiscount = fare + additionalFee, 
            discountAmount = totalBeforeDiscount * amountOff, 
            totalAmount = totalBeforeDiscount - discountAmount + amountOff
    return { fare , additionalFee , discountApplied , amountOff , type , accomodation , vessel , totalBeforeDiscount , discountAmount , totalAmount }
}