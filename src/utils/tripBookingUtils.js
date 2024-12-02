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
        if(value.data?.type_id == 1){
            return value.data?.additional && value.data?.discount_id
        }else if(value.data?.type_id == 2){
            return value.data?.vehicle_type && value.data?.plate_number && value.data?.weight_id;
        }else if(value.data?.type_id == 3){
            return value.data?.item_name && value.data?.cargo_description && value.data?.quantity && value.data?.weight_id 
        }else{
            return value.data?.vehicle_type && value.data?.plate_number && value.data?.weight_id && value.data?.item_name && value.data?.cargo_description && value.data?.quantity && value.data?.additional && value.data?.discount_id
        }
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
    const fares = value.discount?.data;
    const calculated_amounts = fares?.calculated_amount;
    const types = value.data.type_id;

    const   fare = parseFloat(fares?.fare?.fare) || 0.00, 
            additionalFee = parseFloat(fares?.fare?.additional_fee) || 0.00, 
            discountApplied = fares?.discount?.name || 'REGULAR', 
            type = types === 1 ? 'Passenger' : (types === 2 ? 'Rolling Cargo' : (types === 3 ? 'Drop Cargo' : 'N/a')), 
            accomodation = fares?.fare?.additional_fee == true ? 'AIRCONDITIONED' : 'BASIC' ||  "n/a", 
            vessel = value.details.vessel_name ? value.details.vessel_name : "n/a", 
            totalBeforeDiscount = parseFloat(calculated_amounts.total_amount) || 0.00,//fare + additionalFee, 
            discountAmount = parseFloat(calculated_amounts.discounted_amount) || 0.00, 
            totalAmount = parseFloat(calculated_amounts.grand_total) || 0.00;

    return { fare , additionalFee , discountApplied , type , accomodation , vessel , totalBeforeDiscount , discountAmount , totalAmount }
}