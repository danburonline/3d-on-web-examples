import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

function Box() {
  const meshRef = useRef<Mesh | null>(null)

  // Rotate the cube
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry attach='geometry' />
      <meshBasicMaterial attach='material' color='red' />
    </mesh>
  )
}

function App() {
  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <perspectiveCamera position={[0, 0, 3]} />
      <Box />
    </Canvas>
  )
}

export default App
