import { create } from "zustand";
import { nanoid } from "nanoid";

const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const useStore = create((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || [],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        { key: nanoid(), pos: [x, y, z], texture: prev.texture },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    try {
      set((prev) => {
        setLocalStorage("cubes", prev.cubes);
        return prev
      });
      
    } catch (error) {
      console.log(error)
    }
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
