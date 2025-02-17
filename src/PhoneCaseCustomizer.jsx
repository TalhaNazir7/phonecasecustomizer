/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PhoneCase = ({ texture }) => {
  const { scene } = useGLTF("/iPhone16.glb");
  const caseTexture = useTexture(texture);

  return (
    <primitive object={scene} scale={0.04} position={[0, 0, 0]}>
      {scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: caseTexture,
          });
        }
      })}
    </primitive>
  );
};

const PhoneCaseCustomizer = () => {
  const [texture, setTexture] = useState("/texture.jpg");

  const handleTextureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTexture(url);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <p className="font-medium">Upload Custom texture</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleTextureUpload}
        className="mb-4 p-2 border rounded"
      />
      <Canvas className="h-5/6 ">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls enablePan={true} />
        <PhoneCase texture={texture} />
      </Canvas>
    </div>
  );
};

export default PhoneCaseCustomizer;
