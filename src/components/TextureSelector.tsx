"use client";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useStore } from "@/hooks/useStore";
import { useEffect, useState } from "react";

const images = {
  dirt: "/dirt.jpg",
  grass: "/grass.jpg",
  glass: "/glass.png",
  wood: "/wood.png",
  log: "/log.jpg",
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => {
    return [
      state?.texture || "dirt", // Provide a default value
      state?.setTexture || (() => {}), // Provide a default function
    ];
  });
  const { dirt, wood, log, glass, grass } = useKeyboard();

  const textures = {
    dirt,
    grass,
    glass,
    wood,
    log,
  };

  useEffect(() => {
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, glass, grass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);


  return (
    visible && (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex scale-[5]">
        {Object.entries(images).map(([k, src]) => (
          <img 
            src={src} 
            key={k} 
            alt={k} 
            className={`${k === activeTexture ? "border-2 border-red-500" : ""}`}
          />
        ))}
      </div>
    )
  );
};