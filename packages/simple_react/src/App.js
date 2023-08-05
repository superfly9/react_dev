import { useState } from "./hooks/useState/useState";
import { addEventListener } from "./EventListener";
import useReducer from "./hooks/useReducer";

const reducer = (action, state) => {
  console.log(action, state);
  switch (action.type) {
    case "ADD":
      return state + action.amount;
    default:
      throw Error("Type is not matched");
  }
};

const INITIAL_STATE = 10;

function App() {
  const [count, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [city, setCity] = useState("Seoul");

  const handleBtnClick = () => {
    dispatch({ type: "ADD", amount: 10 });
  };

  addEventListener("click", handleBtnClick);

  return `
    <div>
      <button id="count_btn">Count : ${count}</button>
      살고있는 도시 : ${city}
    </div>
  `;
}

export default App;
