'use client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { Group, Mesh } from 'three'

interface Particle {
  position: [number, number, number];
  velocity: [number, number, number];
  life: number;
}

function Explosion() {
  const [particles, setParticles] = useState<Particle[]>([])
  const groupRef = useRef(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const newPosition: [number, number, number] = [
            particle.position[0] + particle.velocity[0] * delta,
            particle.position[1] + particle.velocity[1] * delta,
            particle.position[2] + particle.velocity[2] * delta
          ]
          return {
            ...particle,
            position: newPosition,
            life: particle.life - delta
          }
        }).filter(particle => particle.life > 0)
      )
    }
  })

  const explode = () => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        position: [0, 0, 0],
        velocity: [
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5
        ],
        life: 2 + Math.random() * 1 // Particles live for 2-3 seconds
      })
    }
    setParticles(prevParticles => [...prevParticles, ...newParticles])
  }

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <Sphere key={`${index}-${particle.life}`} args={[0.1]} position={particle.position}>
          <meshStandardMaterial color="orange" opacity={particle.life / 3} transparent />
        </Sphere>
      ))}
      <mesh onClick={explode}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Canvas className="w-52 border-2">
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Explosion />
      </Canvas>
    </main>
  )
}