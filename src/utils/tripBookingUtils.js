export const isActive = (state, value) => {
    if (value === state){
        return 'border-indigo-400';
    }else{
        return 'border-gray-300';
    }
}