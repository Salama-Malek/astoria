import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  glow: string;
}

export default function PrinterModel({ glow }: Props) {
  const paper = useRef<THREE.Mesh>(null);
  const indicator = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (paper.current) {
      paper.current.position.y = 0.42 + Math.sin(t * 1.2) * 0.04;
    }
    if (indicator.current) {
      const m = indicator.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.2 + Math.sin(t * 3) * 0.4;
    }
  });

  return (
    <group>
      {/* Main body — dark steel */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 1.1, 1.6]} />
        <meshStandardMaterial color="#1d1f24" metalness={0.85} roughness={0.35} />
      </mesh>
      {/* Top platform/lid */}
      <mesh castShadow receiveShadow position={[0, 0.62, 0]}>
        <boxGeometry args={[2.7, 0.16, 1.7]} />
        <meshStandardMaterial color="#2a2c33" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Front panel — slight inset, darker */}
      <mesh position={[0, -0.05, 0.81]}>
        <boxGeometry args={[2.3, 0.7, 0.02]} />
        <meshStandardMaterial color="#0f1014" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Paper output slot — bright slit */}
      <mesh position={[0, 0.18, 0.82]}>
        <boxGeometry args={[1.8, 0.04, 0.02]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Paper sheet emerging */}
      <mesh ref={paper} position={[0, 0.42, 0.88]} castShadow>
        <boxGeometry args={[1.6, 0.02, 0.6]} />
        <meshStandardMaterial color="#f5f0e3" emissive="#f5f0e3" emissiveIntensity={0.05} />
      </mesh>
      {/* CMYK rim strip across the front */}
      <mesh position={[0, -0.32, 0.83]}>
        <boxGeometry args={[1.8, 0.04, 0.005]} />
        <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      {/* Status LED */}
      <mesh ref={indicator} position={[1.1, 0.05, 0.83]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      {/* Side vent slits */}
      {[-1.32, 1.32].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {[-0.2, 0, 0.2].map((z) => (
            <mesh key={z} position={[0, -0.1, z]}>
              <boxGeometry args={[0.02, 0.3, 0.06]} />
              <meshStandardMaterial color="#08090c" />
            </mesh>
          ))}
        </group>
      ))}
      {/* Base shadow plate */}
      <mesh position={[0, -0.56, 0]} receiveShadow>
        <boxGeometry args={[2.7, 0.06, 1.65]} />
        <meshStandardMaterial color="#0a0b0d" metalness={0.3} roughness={0.8} />
      </mesh>
    </group>
  );
}
