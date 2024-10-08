// @ts-nocheck
'use client'

import { usePlane } from "@react-three/cannon"
import {RepeatWrapping, NearestFilter} from "three"
//@ts-ignore
import {grassTexture } from "@/textures/textures.js"
import { useStore } from "@/hooks/useStore"
export const Ground = () =>{
    const [ref] = usePlane(()=>({
        rotation:[-Math.PI/2,0,0] , position:[0,-0.5,0]
    }))

    const [addCube] = useStore((state)=>[state?.addCube])





    return (
        <mesh ref={ref}
        onClick={(e)=>{e.stopPropagation()

            const [x,y,z] = Object.values(e.point).map(val=>Math.ceil (val))
            addCube(x,y,z)
        }}
        >
            <planeGeometry attach="geometry" args={[100,100]} />
            {/* @ts-ignore */}
            <meshStandardMaterial  attach="material" map={grassTexture} />

        </mesh>


    )
}