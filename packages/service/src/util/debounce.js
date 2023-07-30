// export const debounceWithRAF = (callback) => {
//   let rafId = null;
//   return () => {
//     cancelAnimationFrame(rafId);
//     rafId = requestAnimationFrame(callback);
//   };
// };

export const debounce = (callback) => {
  let id = null;
  let interval = 1000 / 60;

  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => callback(...args), interval);
  };
};
