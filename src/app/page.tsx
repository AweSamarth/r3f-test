"use client";

import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Ground } from "@/components/Ground";
import { Player } from "@/components/Player";
import { FPV } from "@/components/FPV";
import { Cubes } from "@/components/Cubes";
import { TextureSelector } from "@/components/TextureSelector";
import { Menu } from "@/components/Menu";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* <div>Outside canvas</div> */}

      <div className="h-screen w-full">
        <Canvas className="border-2 ">
          <Sky sunPosition={[100, 100, 100]} />
          <ambientLight intensity={0.9} />
          <FPV />
          <Physics>
            <Player />
            <Cubes />
            <Ground />
          </Physics>
        </Canvas>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          +
        </div>{" "}
      </div>
      <TextureSelector />
      <Menu />
    </main>
  );
}
