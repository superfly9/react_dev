import { Button } from "@monorepo/design-system";
import { useState } from "./useState/useState";

function App() {
  const [count, setCount] = useState(0);

  const handleBtnClick = () => {
    setCount(count + 1);
  };

  window.handleBtnClick = handleBtnClick;

  return `
    <div>
      <button id="count_btn" onClick="handleBtnClick()">Count</button>
    </div>
  `;
}

export default App;
