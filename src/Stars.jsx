import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const Star = ({ position, speed }) => {
  const ref = useRef();

  useFrame(() => {
    ref.current.position.z -= speed; // Cambiamos el signo de la velocidad para que vaya en sentido contrario
    if (ref.current.position.z < -100) {
      ref.current.position.z = 0;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 5, 5]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export function HyperspaceScene() {
  return (
    <>
      <Stars
        radius={100}
        depth={10}
        count={5000}
        factor={1}
        saturation={0}
        fade={true}
      />
    </>
  );
}
