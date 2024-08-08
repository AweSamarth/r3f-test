import { useBox } from "@react-three/cannon";
import { useStore } from "../hooks/useStore";
import * as textures from "@/textures/textures";
import { useState } from "react";

//@ts-ignore
const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));
  //@ts-ignore
  const activeTexture = textures[texture + "Texture"];

  const [addCube, removeCube] = useStore((state) => [
    state?.addCube,
    state?.removeCube,
  ]);

  return (
    <mesh
    onPointerMove={(e)=>{
      e.stopPropagation()
      setIsHovered(true)
    }}
    onPointerOut={(e)=>{
      e.stopPropagation()
      setIsHovered(false)
    }}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        //@ts-ignore
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;

        if(e.button==2){
            removeCube(x,y,z)
        }
        else if (clickedFace === 0) {
          addCube(x + 1, y, z);
        } else if (clickedFace === 1) {
          addCube(x - 1, y, z);
        } else if (clickedFace === 2) {
          addCube(x, y+1, z);
        } else if (clickedFace === 3) {
          addCube(x, y-1, z);
        } else if (clickedFace === 4) {
          addCube(x, y, z+1);
        } else if (clickedFace === 5) {
          addCube(x, y, z-1);
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial color={isHovered?"grey":"white"} opacity={texture==="glass"?0.6:1} map={activeTexture} attach="material" />
    </mesh>
  );
};

export const Cubes = () => {
  const [cubes] = useStore((state) => [state?.cubes]);
  //@ts-ignore
  return cubes?.map(({ key, pos, texture }) => {
    return <Cube texture={texture} key={key} position={pos} />;
  });
};
