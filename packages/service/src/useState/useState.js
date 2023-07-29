// const [state,setState] = useState(initialValue);
// setState(state + 1);
// setState([...state, newValue])
// setState(v=>v+1);
const options = {
  component: null,
  container: null,
  currentHookIndex: 0,
  hooks: [],
};
export function useState(initialState) {
  const { hooks, currentHookIndex } = options;

  let pair = hooks[currentHookIndex];

  if (pair) {
    // currentHookIndex - read only이므로 option을 수정해줘야
    options.currentHookIndex++;
    return pair;
  }

  pair = [initialState, setState];

  function setState(nextState) {
    pair[0] = nextState;
    render();
  }
  hooks[currentHookIndex] = pair;
  options.currentHookIndex++;
  return pair;
}

function _render() {
  const { component, container } = options;
  if (!component || !container) return;
  options.currentHookIndex = 0;
  container.innerHTML = component();
}

export function render(component, container) {
  options.component = component;
  options.container = container;
  _render();
}
