export const debounce = (callback) => {
  let id = null;
  let interval = 1000 / 60;

  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => callback(...args), interval);
  };
};
