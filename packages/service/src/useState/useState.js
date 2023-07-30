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

function SimpleUseState() {
  // 초기값 설정, 값이 같으면 실행 금지, 최신의 값을 반환,함수형 업데이트
  // 여러 번 실행시 마지막 거만(60fs 기준 하나의 프레임으로)
  function useState(initialState) {
    const { hooks, currentHookIndex } = options;

    let pair = hooks[currentHookIndex];
    console.log("[pair]:", pair, "currentHookIndex:", currentHookIndex);
    // [1,f]
    if (pair) {
      options.currentHookIndex++;
      return pair;
    }

    pair = [initialState, setState];

    hooks[currentHookIndex] = pair;
    console.log("[hooks]:", hooks);

    options.currentHookIndex++;

    function setState(nextState) {
      if (nextState === pair[0]) return;
      if (JSON.stringify(nextState) === JSON.stringify(pair[0])) return;
      pair[0] = nextState;
      _render();
    }

    return pair;
  }

  function _render() {
    const { component, container } = options;
    if (!component || !container) return;
    options.currentHookIndex = 0;
    container.innerHTML = component();
  }

  function render(component, container) {
    options.component = component;
    options.container = container;
    _render();
  }

  return { useState, render };
}

export const { useState, render } = SimpleUseState();
