/**
 * @param {string} state
 * @param {string} value
**/
export const isActive = (state = '', value = '') => {
    if (value === state){
        return 'border-indigo-400'; 
    }else{
        return 'border-gray-200';
    }
}
export const isFormValid = (option, value ,initialValue) => {
    if (option === 1) {
      return (value.data?.additional && value.data?.discount) || (initialValue.additional && initialValue.discount) ;
    } else if (option === 2) {
      return (value.data?.vehicle_type && value.data?.plate_number && value.data?.weight ) || (initialValue.vehicle_type && initialValue.plate_number && initialValue.weight) 
    } else if (option === 3) {
      return (value.data?.item_name && value.data?.description && value.data?.quantity && value.data?.weight ) || (initialValue.item_name && initialValue.description && initialValue.quantity && initialValue.weight);
    } else{
      
      return value.data?.vehicle_type && value.data?.plate_number && value.data?.weight && value.data?.item_name && value.data?.description && value.data?.quantity && value.data?.additional && value.data?.discount
    }
  };