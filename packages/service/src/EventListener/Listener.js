const handlerMap = new Map();
function Listener() {
  const root = document.getElementById("root");

  const addEventListener = (type, handler) => {
    if (handlerMap.get(type)) {
      const beforeHandler = handlerMap.get(type);
      root.removeEventListener(type, beforeHandler);
    }

    handlerMap.set(type, handler);
    root.addEventListener(type, handler);
  };

  return { addEventListener };
}

export const { addEventListener } = Listener();
