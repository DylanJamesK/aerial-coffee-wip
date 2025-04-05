import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Cube = () => {
  const cubeRef = useRef();

  // Rotate the cube every frame
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef} position={[-3, 0.5, -3]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} /> {/* (width, height, depth) */}
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

export default Cube;