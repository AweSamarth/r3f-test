"use client";

import { NearestFilter, TextureLoader, RepeatWrapping } from "three";
import {
  dirtImg,
  logImg,
  grassImg,
  glassImg,
  woodImg,
} from "../constants/index";

let dirtTexture, logTexture, glassTexture, woodTexture, grassTexture;

if (typeof window !== "undefined") {
  // Only load textures if we're in a browser environment
  const loader = new TextureLoader();
  dirtTexture = loader.load("/dirt.jpg");
  logTexture = loader.load("/log.jpg");
  glassTexture = loader.load("/glass.png");
  woodTexture = loader.load("/wood.png");
  grassTexture = loader.load("/grass.jpg");

  dirtTexture.magFilter = NearestFilter;
  logTexture.magFilter = NearestFilter;
  glassTexture.magFilter = NearestFilter;
  woodTexture.magFilter = NearestFilter;
  grassTexture.magFilter= NearestFilter
  grassTexture.wrapS = RepeatWrapping
  grassTexture.wrapT = RepeatWrapping
  grassTexture.repeat.set(100,100)
}

export { dirtTexture, logTexture, glassTexture, woodTexture, grassTexture };
