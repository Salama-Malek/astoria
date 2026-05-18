import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  glow: string;
}

export default function TShirtPressModel({ glow }: Props) {
  const armRef = useRef<THREE.Group>(null);
  const coilRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (armRef.current) {
      armRef.current.rotation.x = -0.2 + Math.sin(t * 0.4) * 0.08;
    }
    if (coilRef.current) {
      const m = coilRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.4 + Math.sin(t * 2.5) * 0.6;
    }
  });

  return (
    <group>
      {/* Base plate (the fabric platen) */}
      <mesh castShadow receiveShadow position={[0, -0.4, 0]}>
        <boxGeometry args={[2.0, 0.18, 1.6]} />
        <meshStandardMaterial color="#1d1f24" metalness={0.8} roughness={0.35} />
      </mesh>
      {/* Soft pad on the base */}
      <mesh castShadow position={[0, -0.29, 0]}>
        <boxGeometry args={[1.8, 0.08, 1.4]} />
        <meshStandardMaterial color="#2a2c33" metalness={0.3} roughness={0.85} />
      </mesh>
      {/* Vertical post left */}
      <mesh castShadow position={[-1.1, 0.05, -0.6]}>
        <boxGeometry args={[0.18, 1.4, 0.18]} />
        <meshStandardMaterial color="#181a1f" metalness={0.85} roughness={0.4} />
      </mesh>
      {/* Pivot block */}
      <mesh castShadow position={[-1.1, 0.65, -0.6]}>
        <boxGeometry args={[0.4, 0.3, 0.4]} />
        <meshStandardMaterial color="#1d1f24" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Upper arm (heated platen) — rotates from pivot */}
      <group ref={armRef} position={[-1.1, 0.65, -0.6]}>
        <mesh castShadow position={[1.1, 0, 0.6]}>
          <boxGeometry args={[2.0, 0.22, 1.6]} />
          <meshStandardMaterial color="#1a1c20" metalness={0.85} roughness={0.35} />
        </mesh>
        {/* Heating coil underside — glow */}
        <mesh ref={coilRef} position={[1.1, -0.13, 0.6]}>
          <boxGeometry args={[1.85, 0.02, 1.45]} />
          <meshStandardMaterial
            color={glow}
            emissive={glow}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
        {/* Handle */}
        <mesh castShadow position={[2.25, 0.2, 0.6]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
          <meshStandardMaterial color="#3a3a40" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
      {/* Control panel */}
      <mesh position={[1.0, -0.05, -0.6]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.18]} />
        <meshStandardMaterial color="#0f1014" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[1.0, -0.05, -0.5]}>
        <boxGeometry args={[0.36, 0.18, 0.02]} />
        <meshStandardMaterial
          color={glow}
          emissive={glow}
          emissiveIntensity={1.0}
          toneMapped={false}
        />
      </mesh>
      {/* Fabric mock on the platen */}
      <mesh position={[0.1, -0.22, 0]}>
        <boxGeometry args={[1.3, 0.02, 1.1]} />
        <meshStandardMaterial color="#e6296b" metalness={0.1} roughness={0.85} />
      </mesh>
      {/* Base shadow */}
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.06, 1.7]} />
        <meshStandardMaterial color="#0a0b0d" metalness={0.3} roughness={0.8} />
      </mesh>
    </group>
  );
}
