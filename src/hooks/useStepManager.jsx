import React from "react";
export default function useStepManager(maxStep) {
  const initialState = 1
  const reducer = (state, action) => {
    switch (action.type) {
      case "NEXT":
        return { ...state, step: state.step + 1, status: state.status = 'next' , hide: state.action = 'hide-next'};
      case "BACK":
        return {...state, step: Math.max(state.step - 1, 1),  status: state.status = 'back' ,hide: state.action = 'show-next'};
      case "COMPLETE":
        return {...state,  step: Math.min(state.step + 1, maxStep),  status: state.status = 'complete', hide: state.action = 'hide-all' };
      default:
        return state;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, {step: initialState, status: ''});
  return { state, dispatch, maxStep};
}
