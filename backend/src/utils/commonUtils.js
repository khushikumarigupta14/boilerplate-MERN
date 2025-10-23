export const commonUtils = {
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  clone: ( T)=> JSON.parse(JSON.stringify(obj)),
  pick: (keys) =>
    keys.reduce((acc, key) => {
      if (obj[key] !== undefined) acc[key] = obj[key];
      return acc;
    }),
  omit: (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k))),
};
