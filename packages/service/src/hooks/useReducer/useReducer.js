import { useState } from "../useState";
// dispatch({type :'INIT', payload : { value: []}})

// const [state ,dispatch] = useReducer(reducer, INITIAL_STATE);
// reducer = (action, state) => {
//      switch (action.type) {
//         case ''
//      }
// }

function SimpleUseReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  const dispatch = (action) => {
    const nextState = reducer(action);
    setState(nextState);
  };

  return [state, dispatch];
}

export default SimpleUseReducer;
