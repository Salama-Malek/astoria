import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Types ──────────────────────────────────────────────────────────────────
interface BoxPart {
  type: 'box';
  w: number; h: number; d: number;
  x: number; y: number; z: number;
  rx: number; ry: number; rz: number;
  mat: MatKey;
}
interface CylPart {
  type: 'cyl';
  rt: number; rb: number; h: number;
  x: number; y: number; z: number;
  rx: number; ry: number; rz: number;
  mat: MatKey;
}
type Part = BoxPart | CylPart;

type MatKey = 'body' | 'trim' | 'panel' | 'screen' | 'paper' | 'neonM' | 'neonC' | 'neonY';

interface Device {
  accent: number;
  parts: Part[];
}

// ─── Device definitions (all share part count for morph) ───────────────────
const DEVICES: Device[] = [
  // 0: PRINTER
  {
    accent: 0x2db4d8,
    parts: [
      { type: 'box', w: 2.4, h: 1.1, d: 1.6,  x: 0,     y: 0.15,  z: 0,     rx: 0, ry: 0, rz: 0, mat: 'body' },
      { type: 'box', w: 2.38, h: 0.1, d: 1.58, x: 0,    y: 0.75,  z: 0,     rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'box', w: 2.0, h: 0.5, d: 0.06, x: 0,     y: 0.1,   z: 0.83,  rx: 0, ry: 0, rz: 0, mat: 'panel' },
      { type: 'box', w: 0.5, h: 0.28, d: 0.05, x: 0.6,  y: 0.38,  z: 0.84,  rx: 0, ry: 0, rz: 0, mat: 'screen' },
      { type: 'cyl', rt: 0.07, rb: 0.07, h: 0.05, x: 0.98, y: 0.38, z: 0.84, rx: Math.PI / 2, ry: 0, rz: 0, mat: 'neonM' },
      { type: 'cyl', rt: 0.05, rb: 0.05, h: 0.04, x: -0.55, y: 0.25, z: 0.84, rx: Math.PI / 2, ry: 0, rz: 0, mat: 'neonM' },
      { type: 'cyl', rt: 0.05, rb: 0.05, h: 0.04, x: -0.35, y: 0.25, z: 0.84, rx: Math.PI / 2, ry: 0, rz: 0, mat: 'neonC' },
      { type: 'cyl', rt: 0.05, rb: 0.05, h: 0.04, x: -0.15, y: 0.25, z: 0.84, rx: Math.PI / 2, ry: 0, rz: 0, mat: 'neonY' },
      { type: 'box', w: 1.8, h: 0.08, d: 0.8, x: 0,    y: -0.35, z: -0.4,  rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'box', w: 0.2, h: 0.12, d: 0.22, x: -0.9, y: -0.72, z: 0.6,  rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'box', w: 0.2, h: 0.12, d: 0.22, x: 0.9,  y: -0.72, z: 0.6,  rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'box', w: 0.2, h: 0.12, d: 0.22, x: -0.9, y: -0.72, z: -0.6, rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'box', w: 0.2, h: 0.12, d: 0.22, x: 0.9,  y: -0.72, z: -0.6, rx: 0, ry: 0, rz: 0, mat: 'trim' },
    ],
  },
  // 1: T-SHIRT PRESS
  {
    accent: 0xe6296b,
    parts: [
      { type: 'box', w: 2.4, h: 0.2, d: 1.8, x: 0,    y: -0.5,  z: 0,     rx: 0, ry: 0, rz: 0, mat: 'body' },
      { type: 'box', w: 2.1, h: 0.12, d: 1.5, x: 0,    y: -0.28, z: 0,     rx: 0, ry: 0, rz: 0, mat: 'neonY' },
      { type: 'box', w: 2.1, h: 0.12, d: 1.5, x: 0,    y: 0.55,  z: 0,     rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'box', w: 0.15, h: 1.4, d: 0.15, x: 1.0, y: 0.1,   z: -0.6,  rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'cyl', rt: 0.09, rb: 0.09, h: 0.5, x: 1.0, y: 0.85, z: -0.6, rx: 0, ry: Math.PI / 2, rz: 0, mat: 'neonM' },
      { type: 'cyl', rt: 0.15, rb: 0.15, h: 0.1, x: 1.0, y: 0.7,  z: -0.6, rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'box', w: 0.6, h: 0.4, d: 0.35, x: -0.8, y: 0.1,   z: -0.75, rx: 0, ry: 0, rz: 0, mat: 'body' },
      { type: 'box', w: 0.45, h: 0.25, d: 0.04, x: -0.8, y: 0.12, z: -0.57, rx: 0, ry: 0, rz: 0, mat: 'screen' },
      { type: 'box', w: 1.4, h: 0.8, d: 0.04, x: 0,    y: 0.08,  z: 0.02,  rx: 0, ry: 0, rz: 0, mat: 'paper' },
      { type: 'box', w: 0.45, h: 0.28, d: 0.04, x: -0.93, y: 0.38, z: 0.02, rx: 0, ry: 0, rz: Math.PI * 0.12, mat: 'paper' },
      { type: 'box', w: 0.45, h: 0.28, d: 0.04, x: 0.93, y: 0.38, z: 0.02, rx: 0, ry: 0, rz: -Math.PI * 0.12, mat: 'paper' },
      { type: 'box', w: 0.55, h: 0.4, d: 0.05, x: 0,    y: 0.08,  z: 0.05,  rx: 0, ry: 0, rz: 0, mat: 'neonM' },
      { type: 'box', w: 0.3, h: 0.6, d: 0.3, x: 0,    y: -0.88, z: 0,     rx: 0, ry: 0, rz: 0, mat: 'trim' },
    ],
  },
  // 2: LAMINATOR
  {
    accent: 0xf0b020,
    parts: [
      { type: 'box', w: 3.2, h: 0.7, d: 1.2, x: 0,    y: 0,     z: 0,     rx: 0, ry: 0, rz: 0, mat: 'body' },
      { type: 'box', w: 3.18, h: 0.08, d: 1.18, x: 0,  y: 0.39,  z: 0,     rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'box', w: 2.4, h: 0.06, d: 0.05, x: -0.3, y: 0.15, z: 0.63,  rx: 0, ry: 0, rz: 0, mat: 'neonY' },
      { type: 'box', w: 2.4, h: 0.06, d: 0.05, x: 0.3, y: 0.15,  z: -0.63, rx: 0, ry: 0, rz: 0, mat: 'neonY' },
      { type: 'cyl', rt: 0.08, rb: 0.08, h: 2.3, x: 0, y: 0.2,   z: 0.4,   rx: 0, ry: Math.PI / 2, rz: 0, mat: 'neonC' },
      { type: 'cyl', rt: 0.08, rb: 0.08, h: 2.3, x: 0, y: 0.2,   z: -0.3,  rx: 0, ry: Math.PI / 2, rz: 0, mat: 'neonC' },
      { type: 'box', w: 0.55, h: 0.3, d: 0.05, x: 1.15, y: 0.22, z: 0.64,  rx: -0.25, ry: 0, rz: 0, mat: 'screen' },
      { type: 'cyl', rt: 0.07, rb: 0.07, h: 0.06, x: 1.1, y: 0.42, z: 0.35, rx: 0, ry: 0, rz: 0, mat: 'neonM' },
      { type: 'cyl', rt: 0.04, rb: 0.04, h: 0.05, x: 0.7, y: 0.42, z: 0.35, rx: 0, ry: 0, rz: 0, mat: 'neonM' },
      { type: 'cyl', rt: 0.04, rb: 0.04, h: 0.05, x: 0.85, y: 0.42, z: 0.35, rx: 0, ry: 0, rz: 0, mat: 'neonC' },
      { type: 'cyl', rt: 0.04, rb: 0.04, h: 0.05, x: 1.0, y: 0.42, z: 0.35, rx: 0, ry: 0, rz: 0, mat: 'neonY' },
      { type: 'box', w: 0.22, h: 0.14, d: 1.0, x: -1.3, y: -0.42, z: 0,    rx: 0, ry: 0, rz: 0, mat: 'trim' },
      { type: 'box', w: 0.22, h: 0.14, d: 1.0, x: 1.3,  y: -0.42, z: 0,    rx: 0, ry: 0, rz: 0, mat: 'trim' },
    ],
  },
];

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const makeGeo = (p: Part): THREE.BufferGeometry =>
  p.type === 'box'
    ? new THREE.BoxGeometry(p.w, p.h, p.d)
    : new THREE.CylinderGeometry(p.rt, p.rb, p.h, 20);

interface Printer3DProps {
  deviceIndex: number;
  onMorphComplete?: () => void;
}

export default function Printer3D({ deviceIndex }: Printer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const deviceIndexRef = useRef(deviceIndex);

  // Sync ref with prop so the animation loop sees the latest value
  useEffect(() => {
    deviceIndexRef.current = deviceIndex;
  }, [deviceIndex]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = () => mount.clientWidth || 500;
    const H = () => mount.clientHeight || 500;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W(), H());
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W() / H(), 0.1, 100);
    camera.position.set(0, 1.2, 7);
    camera.lookAt(0, 0, 0);

    // ── Lights ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(5, 8, 6);
    key.castShadow = true;
    scene.add(key);

    const fillM = new THREE.PointLight(0xe6296b, 0.7, 12);
    fillM.position.set(-4, 2, 3);
    const fillC = new THREE.PointLight(0x2db4d8, 0.7, 12);
    fillC.position.set(4, 2, 3);
    const fillY = new THREE.PointLight(0xf0b020, 0.5, 10);
    fillY.position.set(0, -2, 5);
    scene.add(fillM, fillC, fillY);

    // ── Materials ─────────────────────────────────────────────────────────
    const mats: Record<MatKey, THREE.MeshStandardMaterial> = {
      body: new THREE.MeshStandardMaterial({ color: 0xf5f0e3, roughness: 0.4, metalness: 0.2 }),
      trim: new THREE.MeshStandardMaterial({ color: 0xe6dfc8, roughness: 0.5, metalness: 0.15 }),
      panel: new THREE.MeshStandardMaterial({ color: 0xfaf6ec, roughness: 0.3, metalness: 0.2 }),
      screen: new THREE.MeshStandardMaterial({ color: 0x2db4d8, emissive: 0x2db4d8, emissiveIntensity: 1.0, roughness: 0.2 }),
      paper: new THREE.MeshStandardMaterial({ color: 0xfdfcf7, roughness: 0.95, metalness: 0 }),
      neonM: new THREE.MeshStandardMaterial({ color: 0xe6296b, emissive: 0xe6296b, emissiveIntensity: 0.85, roughness: 0.3 }),
      neonC: new THREE.MeshStandardMaterial({ color: 0x2db4d8, emissive: 0x2db4d8, emissiveIntensity: 0.85, roughness: 0.3 }),
      neonY: new THREE.MeshStandardMaterial({ color: 0xf0b020, emissive: 0xf0b020, emissiveIntensity: 0.85, roughness: 0.3 }),
    };

    // ── Build mesh pool ───────────────────────────────────────────────────
    const PART_COUNT = DEVICES[0].parts.length;
    const group = new THREE.Group();
    scene.add(group);

    const meshes: THREE.Mesh[] = [];
    for (let i = 0; i < PART_COUNT; i++) {
      const p = DEVICES[0].parts[i];
      const mesh = new THREE.Mesh(makeGeo(p), mats[p.mat]);
      mesh.castShadow = true;
      mesh.position.set(p.x, p.y, p.z);
      mesh.rotation.set(p.rx, p.ry, p.rz);
      group.add(mesh);
      meshes.push(mesh);
    }

    // ── Animated paper sheet (printer only) ───────────────────────────────
    const paperGroup = new THREE.Group();
    group.add(paperGroup);
    const pSheet = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.014, 1.05), mats.paper);
    paperGroup.add(pSheet);
    ([
      { z: 0, m: mats.neonC },
      { z: 0.22, m: mats.neonM },
      { z: -0.22, m: mats.neonY },
    ] as const).forEach(({ z, m }) => {
      const line = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.007, 0.04), m);
      line.position.set(0, 0.012, z);
      paperGroup.add(line);
    });

    // ── Ground shadow ─────────────────────────────────────────────────────
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 3),
      new THREE.MeshBasicMaterial({ color: 0x6b5a30, transparent: true, opacity: 0.12 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.84;
    scene.add(ground);

    // ── Floating CMYK particles ───────────────────────────────────────────
    const particles: THREE.Mesh[] = [];
    const pMats = [mats.neonM, mats.neonC, mats.neonY];
    for (let i = 0; i < 16; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.03 + Math.random() * 0.02, 8, 8),
        pMats[i % 3]
      );
      m.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3.5 + 0.5,
        (Math.random() - 0.5) * 2 - 0.5
      );
      m.userData = {
        speed: 0.003 + Math.random() * 0.004,
        off: Math.random() * Math.PI * 2,
        baseY: m.position.y,
      };
      scene.add(m);
      particles.push(m);
    }

    // ── Morph state ───────────────────────────────────────────────────────
    let currentDevice = 0;
    let targetDevice = 0;
    let morphT = 1;
    type FromPart = { x: number; y: number; z: number; rx: number; ry: number; rz: number; type: 'box' | 'cyl' };
    let fromParts: FromPart[] = DEVICES[0].parts.map((p) => ({
      x: p.x, y: p.y, z: p.z, rx: p.rx, ry: p.ry, rz: p.rz, type: p.type,
    }));

    const startMorph = (idx: number) => {
      if (idx === targetDevice) return;
      fromParts = meshes.map((m, i) => ({
        x: m.position.x, y: m.position.y, z: m.position.z,
        rx: m.rotation.x, ry: m.rotation.y, rz: m.rotation.z,
        type: DEVICES[currentDevice].parts[i].type,
      }));
      targetDevice = idx;
      morphT = 0;
    };

    // ── Mouse parallax ────────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width - 0.5;
      mouseY = (e.clientY - r.top) / r.height - 0.5;
    };
    const onMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };
    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseleave', onMouseLeave);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    };
    window.addEventListener('resize', onResize);

    // ── Animate ───────────────────────────────────────────────────────────
    let t = 0;
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t++;

      // React state → morph trigger
      if (deviceIndexRef.current !== targetDevice) {
        startMorph(deviceIndexRef.current);
      }

      // Morph
      if (morphT < 1) {
        morphT = Math.min(1, morphT + 0.022);
        const et = easeInOut(morphT);
        const toD = DEVICES[targetDevice];
        meshes.forEach((mesh, i) => {
          const f = fromParts[i];
          const to = toD.parts[i];
          mesh.position.x = lerp(f.x, to.x, et);
          mesh.position.y = lerp(f.y, to.y, et);
          mesh.position.z = lerp(f.z, to.z, et);
          mesh.rotation.x = lerp(f.rx, to.rx, et);
          mesh.rotation.y = lerp(f.ry, to.ry, et);
          mesh.rotation.z = lerp(f.rz, to.rz, et);

          // Geometry swap (box ↔ cyl) once we're past the midpoint
          if (f.type && to.type && f.type !== to.type && morphT > 0.5) {
            mesh.geometry.dispose();
            mesh.geometry = makeGeo(to);
          }
          mesh.material = mats[to.mat];
        });
        if (morphT >= 1) {
          currentDevice = targetDevice;
          meshes.forEach((mesh, i) => {
            const to = DEVICES[currentDevice].parts[i];
            mesh.geometry.dispose();
            mesh.geometry = makeGeo(to);
          });
        }
      }

      // Idle float + parallax
      group.position.y = Math.sin(t * 0.018) * 0.07;
      group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.04;
      group.rotation.x += (-mouseY * 0.15 - group.rotation.x) * 0.04;

      // Paper eject (printer only)
      const isPrinter = currentDevice === 0 && targetDevice === 0;
      paperGroup.visible = isPrinter;
      if (isPrinter) {
        const CYCLE = 260;
        const phase = (t % CYCLE) / CYCLE;
        let pp = 0;
        if (phase < 0.05) pp = 0;
        else if (phase < 0.55) pp = (phase - 0.05) / 0.5;
        else if (phase < 0.85) pp = 1;
        else pp = 1 - (phase - 0.85) / 0.15;
        paperGroup.position.set(0, 0.52 + pp * 0.1, 0.25 + pp * 0.75);
        paperGroup.rotation.x = -pp * 0.22;
      }

      // Light flicker
      fillM.intensity = 0.6 + Math.sin(t * 0.03) * 0.2;
      fillC.intensity = 0.6 + Math.sin(t * 0.03 + 2) * 0.2;
      mats.screen.emissiveIntensity = 0.85 + Math.sin(t * 0.25) * 0.15;

      // Particles
      particles.forEach((p) => {
        const u = p.userData as { speed: number; off: number; baseY: number };
        p.position.y = u.baseY + Math.sin(t * u.speed + u.off) * 0.4;
        p.position.x += Math.sin(t * u.speed * 0.5 + u.off) * 0.002;
        if (Math.abs(p.position.x) > 3.5) p.position.x *= -0.92;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('mouseleave', onMouseLeave);

      meshes.forEach((m) => m.geometry.dispose());
      Object.values(mats).forEach((m) => m.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-10" />;
}
