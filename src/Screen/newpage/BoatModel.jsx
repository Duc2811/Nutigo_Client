// src/components/BoatModel.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

const Boat = () => {
  const { scene } = useGLTF("/boat.glb");
  const ref = useRef();

  // Xoay mô hình tự động
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      object={scene}
      ref={ref}
      scale={3} 
      position={[0, -1.5, 0]} 
    />
  );
};

const BoatModel = () => {
  return (
    <Canvas style={{ width: "400px", height: "400px" }}>
      {/* Ánh sáng */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <Suspense fallback={null}>
        <Boat />
        <Environment preset="sunset" background={false} /> {/* ánh sáng HDR */}
        <OrbitControls enableZoom={true} /> {/* cho phép xoay chuột */}
      </Suspense>
    </Canvas>
  );
};

export default BoatModel;
