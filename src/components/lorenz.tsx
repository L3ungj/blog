"use client";

import { useMousePosition } from "@/lib/MousePosition";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const MAX_TRAIL = 3000;
const LOOK_AT = new THREE.Vector3(0, 0, 20);
const CAMERA_POSITION = new THREE.Vector3(0, 60, 0);
const INITIAL_CONDITION = new THREE.Vector3(6, 0, 30);

export default function LorenzAttractor() {
  return (
    <>
      <Canvas>
        <LorenzParticle />
        <ambientLight intensity={0.5} />
      </Canvas>
      <div className="relative bottom-30 left-1/2 -translate-x-1/2 flex gap-2 flex-col" style={{ color: "rgba(255,255,255,0.5)" }}>
        <div className="flex gap-4 justify-center">
          <Latex>$\dot x = \sigma (y - x)$</Latex>
          <Latex>$\dot y = x (\rho - z) - y$</Latex>
          <Latex>$\dot z = xy - \beta z$</Latex>
        </div>
        <div className="flex gap-4 justify-center">
          <Latex>$\sigma = 10$</Latex>
          <Latex>$\rho = 28$</Latex>
          <Latex>$\beta = \frac{'{8}{3}'}$</Latex>
          <Latex>$\boldsymbol{'{r_0}'} = ({INITIAL_CONDITION.toArray().join(',\\ ')})$</Latex>
        </div>
      </div>
    </>
  );
}

function getNewLorenzPosition(position: THREE.Vector3): THREE.Vector3 {
  const sigma = 10;
  const beta = 8 / 3;
  const rho = 28;
  const delta = 0.01 + (Math.random() < 0.5 ? -0.001 : 0.001);

  const dx = sigma * (position.y - position.x) * delta;
  const dy = (position.x * (rho - position.z) - position.y) * delta;
  const dz = (position.x * position.y - beta * position.z) * delta;

  return position.clone().add(new THREE.Vector3(dx, dy, dz));
}

function LorenzParticle() {
  const particleRef = useRef<THREE.Mesh>(null);
  const [trail, setTrail] = useState<THREE.Vector3[]>(Array.from({ length: MAX_TRAIL }, () => INITIAL_CONDITION.clone()));

  const { camera } = useThree();
  const mouse = useMousePosition();
  const prevMouse = useRef(mouse);
  const rotationZ = useRef(0);
  const targetRotationZ = useRef(0);

  useFrame(() => {
    if (!particleRef.current) return;

    camera.lookAt(LOOK_AT);
    camera.up.set(0, 0, 1);

    const mouseDx = mouse.x - prevMouse.current.x;
    targetRotationZ.current += 0.002;
    targetRotationZ.current += (Math.sign(mouseDx) * Math.min(Math.abs(mouseDx), 10) / window.innerWidth) * 10;
    rotationZ.current = THREE.MathUtils.lerp(rotationZ.current, targetRotationZ.current, 0.1);
    const rotationMatrix = new THREE.Matrix4().makeRotationZ(rotationZ.current);
    const newCameraPosition = CAMERA_POSITION.clone().applyMatrix4(rotationMatrix);
    camera.position.copy(newCameraPosition);
    prevMouse.current = mouse;

    const newPosition = getNewLorenzPosition(particleRef.current.position);
    particleRef.current.position.copy(newPosition);

    setTrail(prev => {
      const newTrail = [...prev, newPosition];
      if (newTrail.length > MAX_TRAIL) {
        newTrail.shift();
      }
      return newTrail;
    });
  });

  return (
    <>
      <points ref={particleRef} position={INITIAL_CONDITION.toArray()}>
        <bufferGeometry>
          <bufferAttribute
            args={[new Float32Array([0, 0, 0]), 3]}
            attach="attributes-position"
          />
        </bufferGeometry>
        <pointsMaterial color="gray" size={5} sizeAttenuation={false} />
      </points>
      <Line
        points={trail.map(v => [v.x, v.y, v.z])}
        color="white"
        lineWidth={1}
      />
    </>
  );
}