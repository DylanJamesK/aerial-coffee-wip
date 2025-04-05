import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Ufo = ({ radius = .25, speed = 2.5 }) => {
  const modelRef = useRef();
  const beamRef = useRef();
  const { scene } = useGLTF("./models/UFOModel.glb"); // Load model

  const { camera } = useThree(); // Access camera
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update zoom on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; 
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll; // Normalize to [0,1]
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(({ clock }) => {
    if (modelRef.current && beamRef.current) {
      const t = clock.getElapsedTime() * speed; // Time-based animation
      const x = Math.cos(t) * radius; // Circular X
      const z = Math.sin(t) * radius; // Circular Z

      // Update UFO position
      modelRef.current.position.set(x, 6, z);
      modelRef.current.rotation.y += 0.01; // Rotate UFO

      // Update beam position to follow UFO
      beamRef.current.position.set(x, -1, z);

      // Adjust camera zoom dynamically
      camera.position.z = -10 - scrollProgress * -5.6; // Zoom in as you scroll down
      camera.position.y = 5 - scrollProgress * 4.4; // Slight downward motion
      camera.position.x = -10 - scrollProgress * -6.3; // adjust the camera to keep the zoom centered

      camera.rotation.x = 3.6 - scrollProgress * .05;
      camera.rotation.y = -.7 - scrollProgress * .01;

    }
  });

  return (
    <>
      {/* 🛸 UFO Model */}
      <primitive object={scene} ref={modelRef} scale={4} rotation={[-0.2, 0, 0]} />

      {/* 👽 Abduction Beam (Cylinder) */}
      <mesh ref={beamRef} casShadow>
        <cylinderGeometry args={[0, 6, 18, 32]} /> {/* (topRadius, bottomRadius, height, segments) */}
        <meshStandardMaterial                                                               
          color="yellow"
          transparent
          opacity={0.5} // See-through effect
          emissive="gold"
          emissiveIntensity={1}
        />
      </mesh>

    </>
  );
};

export default Ufo;
