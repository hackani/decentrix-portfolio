"use client"
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points as DreiPoints, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

// Since we're spreading props onto DreiPoints, we should extend from its props type
type StarsProps = Partial<THREE.Points> & {
  stride?: number;
  frustumCulled?: boolean;
}

function Stars(props: StarsProps) {
  const ref = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);
  
  // Move sphere generation to useMemo to prevent recreation on every render
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const temp = new Float32Array(positions.length);
    random.inSphere(temp, { radius: 1.5 });
    
    // Ensure positions are properly set
    for (let i = 0; i < temp.length; i += 3) {
      positions[i] = temp[i];
      positions[i + 1] = temp[i + 1];
      positions[i + 2] = temp[i + 2];
    }
    
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <DreiPoints
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </DreiPoints>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ background: 'transparent' }}
      >
        <Stars />
      </Canvas>
    </div>
  );
} 