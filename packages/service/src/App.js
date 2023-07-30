import { useState } from "./useState/useState";
import { addEventListener } from "./EventListener";

function App() {
  const [count, setCount] = useState(0);
  const handleBtnClick = () => {
    setCount(count + 1);
  };

  addEventListener("click", handleBtnClick);

  return `
    <div>
      <button id="count_btn">Count : ${count}</button>
    </div>
  `;
}

export default App;
