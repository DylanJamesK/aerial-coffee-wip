import { Canvas } from '@react-three/fiber';
import Ufo from "./UfoModel";
import Building from "./AerialBuilding";
import AerialEnvironment from './AerialEnvironment';
import CoffeeBeam from './CoffeeBeam';
import { Stars } from '@react-three/drei';

export default function Hero() {
    return (
      <section className="relative flex items-center justify-center">
        <div className= "w-full h-dvh">
          <Canvas shadows camera={{ position: [-10, 5, -10] }}>
            <ambientLight color="darkgoldenrod" intensity={.05} />
            <directionalLight color="darkgoldenrod" position={[1, 4, 1]} intensity={.1}/>
            <pointLight position={[-2.9, 3.5, -3]} color="goldenrod" intensity={.5}/>
            <pointLight position={[-4.5, 1.7, -5.8]} color="khaki" intensity={.1}/>
            <Ufo/>
            <Building/>
            <CoffeeBeam
              modelPath="./models/CoffeeCup.glb"
              count={8}
              origin={[0, 0, 0]}   // X/Z position of the beam center
              startY={0}           // Where cups start
              endY={6}    
            />
            <AerialEnvironment/>
            <Stars
                radius={100}        // Size of the sphere that stars get mapped onto
                depth={50}          // How deep (along z-axis) stars spread
                count={5000}        // Number of stars
                factor={4}          // Star size
                saturation={0}      // Color saturation
                fade                // Enables fading as stars get further away
                speed={2}           // Animation speed (for slight movement)
            />
            <pointLight position={[12, -4, 2]} color="orange" intensity={.1}/>
            <pointLight position={[16, -4, 6]} color="orange" intensity={.1}/>
            <pointLight position={[4, -4, 10]} color="orange" intensity={.1}/>
            <pointLight position={[8, -4, 14]} color="orange" intensity={.1}/>
            <pointLight position={[-6, -4, 20]} color="orange" intensity={.1}/>
            <pointLight position={[-1, -4, 24]} color="orange" intensity={.1}/>
            <pointLight position={[26, -4, -3]} color="orange" intensity={.1}/>
            <pointLight position={[22, -4, -8]} color="orange" intensity={.1}/>
          </Canvas>
        </div>
      </section>
    );
  }