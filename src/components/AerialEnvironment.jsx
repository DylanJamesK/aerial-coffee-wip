import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const AerialEnvironment = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/AerialEnvironment.glb");

  return (
    <>
        <primitive
        ref={modelRef}
        object={scene}
        position={[-1.4, 1, -1]}// set internal position
        rotation={[0, 3.93, 0]} // set internal rotation
        scale={.8}              // set internal scale
        recieveShadow             
        />
    </>
  );
};

export default AerialEnvironment;