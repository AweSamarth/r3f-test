"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "@/hooks/useKeyboard";

const JUMP_FORCE = 4;
const MOVEMENT_SPEED = 4;
const SPRINT_SPEED = 8;

export const Player = () => {
  const { moveBackward, moveForward, moveLeft, moveRight, jump, sprint } =
    useKeyboard();
  const { camera } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 10,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  useFrame(() => {
    const facingDirection = new Vector3();
    camera.getWorldDirection(facingDirection);

    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );

    let movementSpeed = MOVEMENT_SPEED;
    if (sprint && moveForward) {
      movementSpeed = SPRINT_SPEED;
    }

    const direction = new Vector3(
      (moveRight ? 1 : 0) - (moveLeft ? 1 : 0),
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )
      .normalize()
      .multiplyScalar(movementSpeed)
      .applyEuler(camera.rotation);



    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.02) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return <mesh ref={ref}></mesh>;
};
