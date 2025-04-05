import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const CoffeeBeam = ({
  modelPath = "./models/CoffeeCup.glb",
  count = 5,
  startY = 0,
  endY = 6,
  origin = [0, 0, 0],
}) => {
  const { scene } = useGLTF(modelPath);
  const cupsRef = useRef([]);

  const cupConfigs = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      offset: new THREE.Vector3(
        origin[0] + (Math.random() - 0.5) * 2,
        0,
        origin[2] + (Math.random() - 0.5) * 2
      ),
      speed: 0.5 + Math.random() * 0.75, // units per second
      phase: Math.random() * 5, // phase shift so they're not synced
      rotationSpeed: (Math.random() - 0.5) * 0.01,
    }));
  }, [count, origin]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    cupsRef.current.forEach((cup, i) => {
      if (!cup) return;

      const { offset, speed, phase, rotationSpeed } = cupConfigs[i];
      const range = endY - startY;

      // Create a looping effect using modulo
      const progress = ((t + phase) * speed) % range;
      const y = startY + progress;

      cup.position.set(offset.x, y, offset.z);
      cup.rotation.y += rotationSpeed;
      cup.rotation.x += rotationSpeed * 0.5;
    });
  });

  return (
    <>
      {cupConfigs.map((_, i) => (
        <primitive
          key={i}
          object={scene.clone()}
          ref={(ref) => (cupsRef.current[i] = ref)}
          scale={0.1}
          position={[0, startY, 0]}
        />
      ))}
    </>
  );
};

export default CoffeeBeam;