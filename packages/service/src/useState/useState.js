// 함수형 업데이트도 처리해야 setState(v=>v+1);
import { debounce, debounceWithRAF } from "../util/debounce";

const options = {
  component: null,
  container: null,
  currentHookIndex: 0,
  hooks: [],
  renderCount: 0,
};

function SimpleUseState() {
  function useState(initialState) {
    const { hooks, currentHookIndex } = options;

    let pair = hooks[currentHookIndex];
    if (pair) {
      options.currentHookIndex++;
      return pair;
    }

    const setState = (nextState) => {
      if (nextState === pair[0]) return;
      if (JSON.stringify(nextState) === JSON.stringify(pair[0])) return;
      pair[0] = nextState;
      _render();
    };

    pair = [initialState, setState];

    hooks[currentHookIndex] = pair;
    options.currentHookIndex++;

    return pair;
  }

  const _render = debounce(() => {
    const { component, container } = options;
    if (!component || !container) return;
    options.currentHookIndex = 0;
    options.renderCount += 1;
    container.innerHTML = component();
  });

  function render(component, container) {
    options.component = component;
    options.container = container;
    _render();
  }

  return { useState, render };
}

export const { useState, render } = SimpleUseState();
