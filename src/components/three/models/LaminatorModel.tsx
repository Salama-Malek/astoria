import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  glow: string;
}

export default function LaminatorModel({ glow }: Props) {
  const rollerTop = useRef<THREE.Mesh>(null);
  const rollerBot = useRef<THREE.Mesh>(null);
  const sheet = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (rollerTop.current) rollerTop.current.rotation.x += delta * 1.6;
    if (rollerBot.current) rollerBot.current.rotation.x -= delta * 1.6;
    if (sheet.current) {
      sheet.current.position.x = ((state.clock.elapsedTime * 0.4) % 3) - 1.5;
    }
  });

  return (
    <group>
      {/* Outer housing — wide low box */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[3.0, 0.9, 1.4]} />
        <meshStandardMaterial color="#1d1f24" metalness={0.85} roughness={0.35} />
      </mesh>
      {/* Top cover slab */}
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[3.1, 0.16, 1.5]} />
        <meshStandardMaterial color="#2a2c33" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Feed slot — bright slit */}
      <mesh position={[1.55, 0.0, 0]}>
        <boxGeometry args={[0.04, 0.12, 1.2]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Output slot */}
      <mesh position={[-1.55, 0.0, 0]}>
        <boxGeometry args={[0.04, 0.12, 1.2]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Rollers visible through window — emissive */}
      <mesh ref={rollerTop} position={[0.3, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 1.2, 24]} />
        <meshStandardMaterial color="#3a3a40" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh ref={rollerBot} position={[0.3, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 1.2, 24]} />
        <meshStandardMaterial color="#3a3a40" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Glass window above rollers */}
      <mesh position={[0.3, 0.25, 0]}>
        <boxGeometry args={[1.0, 0.02, 1.25]} />
        <meshStandardMaterial
          color="#0a0a0c"
          metalness={0.1}
          roughness={0.05}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Sheet sliding through */}
      <mesh ref={sheet} position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.012, 0.9]} />
        <meshStandardMaterial color="#f5f0e3" emissive="#f5f0e3" emissiveIntensity={0.04} />
      </mesh>
      {/* Glow rim strip front */}
      <mesh position={[0, -0.36, 0.71]}>
        <boxGeometry args={[2.6, 0.04, 0.005]} />
        <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      {/* LED ring */}
      <mesh position={[-1.25, 0.18, 0.71]}>
        <ringGeometry args={[0.06, 0.09, 24]} />
        <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={1.6} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      {/* Base shadow */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[3.1, 0.06, 1.45]} />
        <meshStandardMaterial color="#0a0b0d" metalness={0.3} roughness={0.8} />
      </mesh>
    </group>
  );
}
