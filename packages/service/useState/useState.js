import { createRoot } from "react-dom/client";
let currentHookIndex = 0;
let hooks = [];
// const [state,setState] = useState(initialValue);
// setState(v=>v+1);
// setState(state + 1);
// setState([...state, newValue])
function useState(initialState) {
  let pair = hooks[currentHookIndex];

  if (pair) {
    currentHookIndex++;
    return pair;
  }

  pair = [initialState, setState];

  function setState(nextState) {
    pair[0] = nextState;
    render();
  }

  hooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function render($app, id) {
  currentHookIndex = 0;
  const root = createRoot(document.getElementById(id));
  root.render($app);
}

export default useState;
