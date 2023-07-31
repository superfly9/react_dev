import { useState } from "./hooks/useState/useState";
import { addEventListener } from "./EventListener";

function App() {
  const [count, setCount] = useState(0);
  const [city, setCity] = useState("Seoul");
  const handleBtnClick = () => {
    setCount((count) => count + 1);
    setCity("Yong-in");
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
