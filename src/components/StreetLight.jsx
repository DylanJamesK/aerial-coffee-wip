import React from "react";

const StreetLight = ({ position = [0, 5, 0] }) => {
  const lightTarget = [position[0], position[1] - 1, position[2]]; // Target below

  return (
    <group>
      {/* 💡 Spotlight facing downward */}
      <spotLight
        position={position}
        target-position={lightTarget}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        distance={10}
        decay={2}
        castShadow
        color="red"
      />

      {/* 🔆 Visible glowing bulb */}
      <mesh position={position}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="orange"
          emissive="red"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
};

export default StreetLight;