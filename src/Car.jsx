import React, { useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car() {
  const gltf = useLoader(GLTFLoader, "models/delorean/scene.gltf");

  useEffect(() => {
    gltf.scene.scale.set(0.2, 0.2, 0.2);
    gltf.scene.position.set(0, 0.34, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0];
    group.children[71].rotation.y = Math.PI / 200; // Neumático delantero derecho
    group.children[72].rotation.y = Math.PI / 200; // Llanta delantera derecha
    group.children[73].rotation.y = -Math.PI / 200; // Neumático delantero izquierdo
    group.children[32].rotation.y = -Math.PI / 200; // Llanta delantera izquierda

    group.children[67].rotation.x = t * 2; // llantas traseras
    group.children[68].rotation.x = t * 2; // neumaticos traseros
    group.children[71].rotation.x = t * 2; // Neumatico delantero derecho
    group.children[72].rotation.x = t * 2; // llanta delantera derecha
    group.children[73].rotation.x = t * 2; // Neumatico delantero izquierdo
    group.children[32].rotation.x = t * 2; // llanta delantera izquierda
  });

  return <primitive object={gltf.scene} />;
}
