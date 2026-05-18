import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useUIStore, type DeviceKey } from '@/state/useUIStore';
import { deviceColor } from '@/lib/cmyk';
import PrinterModel from './models/PrinterModel';
import TShirtPressModel from './models/TShirtPressModel';
import LaminatorModel from './models/LaminatorModel';
import InkParticles from './InkParticles';

function DeviceStage({ device }: { device: DeviceKey }) {
  const group = useRef<THREE.Group>(null);
  const mouseX = useUIStore((s) => s.mouseX);
  const mouseY = useUIStore((s) => s.mouseY);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetRotX = (mouseY - 0.5) * 0.18;
    const targetRotY = (mouseX - 0.5) * 0.5;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.06;
    group.current.rotation.y += (targetRotY + Math.PI * 0.02 - group.current.rotation.y) * 0.06;
    group.current.position.y = -0.2 + Math.sin(performance.now() * 0.0006) * 0.05;
    // gentle idle spin
    group.current.rotation.y += delta * 0.06;
  });

  const glow = deviceColor[device];

  return (
    <group ref={group}>
      {device === 'printer' && <PrinterModel glow={glow} />}
      {device === 'press' && <TShirtPressModel glow={glow} />}
      {device === 'laminator' && <LaminatorModel glow={glow} />}
    </group>
  );
}

export default function HeroDevice() {
  const activeDevice = useUIStore((s) => s.activeDevice);
  const glow = deviceColor[activeDevice];

  // small DPR safeguard
  useEffect(() => {}, []);

  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.6, 6.2], fov: 38 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      {/* Spotlight from above */}
      <ambientLight intensity={0.15} />
      <spotLight
        position={[0, 6, 2.6]}
        angle={0.55}
        penumbra={0.85}
        intensity={2.4}
        castShadow
        color="#f5f0e3"
      />
      {/* CMYK rim lights */}
      <pointLight position={[3.8, 0.4, 1.6]} intensity={1.4} color={glow} distance={9} />
      <pointLight position={[-3.4, -0.2, 2.0]} intensity={0.9} color={glow} distance={8} />
      <pointLight position={[0, -1.0, 3.0]} intensity={0.5} color="#f0b020" distance={6} />

      <Environment preset="city" environmentIntensity={0.15} />

      <DeviceStage device={activeDevice} />

      <ContactShadows
        position={[0, -1.0, 0]}
        opacity={0.55}
        scale={9}
        blur={2.8}
        far={2.4}
        color="#000"
      />

      <InkParticles count={90} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.7} luminanceThreshold={0.55} luminanceSmoothing={0.18} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
