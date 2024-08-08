'use client'
import { useStore } from "@/hooks/useStore";

export const Menu = () => {
  const [saveWorld, resetWorld] = useStore((state) => [
    state.saveWorld,
    state.resetWorld,
  ]);

  return (
    <div className="absolute z-50 top-1 left-2 flex gap-2">
      <button className="border-2" onClick={saveWorld}>Save</button>
      <button className="border-2" onClick={resetWorld}>Reset</button>
    </div>
  );
};
