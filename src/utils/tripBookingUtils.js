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
      return (value.data?.vehicle_type && value.data?.plate_number && value.data?.weight ) || (initialValue.vehicle_type && initialValue.plate_number && initialValue.weight) 
    } else if (option === 3) {
      return (value.data?.item_name && value.data?.cargo_description && value.data?.quantity && value.data?.weight ) || (initialValue.item_name && initialValue.cargo_description && initialValue.quantity && initialValue.weight);
    } else{
      return value.data?.vehicle_type && value.data?.plate_number && value.data?.weight && value.data?.item_name && value.data?.cargo_description && value.data?.quantity && value.data?.additional && value.data?.discount_id
    }
  };