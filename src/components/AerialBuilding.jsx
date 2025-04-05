import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Building = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/AerialBuilding.glb");
  const { camera } = useThree();
  
  // Track animation state
  const [isAnimating, setIsAnimating] = useState(true);
  const initialRotation = [-0.05, -2.3, 0]; // Starting rotation
  const initialPosition = [-3, 0.5, -3]; // Starting position
  const targetPosition = [-3, 0.5, -3]; // Position to hold when zoomed in
  
  // Store original camera position for comparison
  const cameraZRef = useRef(camera.position.z);
  
  // Values for the oscillation effect
  const time = useRef(0);
  const amplitude = { rotation: 0.03, position: 0.15 };
  
  // Monitor camera position changes to detect zoom
  useEffect(() => {
    const handleScroll = () => {
      // You may need to adjust this threshold based on your scene
      const zoomThreshold = 2; 
      const zoomDifference = Math.abs(camera.position.z - cameraZRef.current);
      
      // If camera has moved significantly closer, stop animation
      if (zoomDifference > zoomThreshold) {
        setIsAnimating(false);
      } else {
        setIsAnimating(true);
      }
    };
    
    // Add scroll listener if you're using scroll to control camera
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [camera]);
  
  // Animation frame
  useFrame((state, delta) => {
    if (!modelRef.current) return;
    
    if (isAnimating) {
      // Increment time for oscillation
      time.current += delta;
      
      // Side to side movement (y-axis rotation)
      modelRef.current.rotation.y = initialRotation[1] + Math.sin(time.current) * amplitude.rotation;
      
      // Up and down movement (y-axis position)
      modelRef.current.position.y = initialPosition[1] + Math.sin(time.current * 1.8) * amplitude.position;
      
      // Slight tilt (x-axis rotation)
      modelRef.current.rotation.x = initialRotation[0] + Math.sin(time.current * 1.2) * amplitude.rotation * 0.5;
    } else {
      // Smoothly transition to target position when not animating
      modelRef.current.position.lerp(
        { x: targetPosition[0], y: targetPosition[1], z: targetPosition[2] }, 
        0.05
      );
      
      // Hold rotation at a specific angle
      modelRef.current.rotation.x = initialRotation[0];
      modelRef.current.rotation.y = initialRotation[1];
      modelRef.current.rotation.z = initialRotation[2];
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      position={initialPosition} 
      rotation={initialRotation} 
      scale={0.75} 
    />
  );
};

export default Building;
