let scene, camera, renderer, cube

// Initialize the scene, camera, and renderer
function init() {
  // Create the scene
  scene = new THREE.Scene()

  // Create the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3

  // Create the renderer
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // Create the cube
  let geometry = new THREE.BoxGeometry()
  let material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}

// Animate the scene
function animate() {
  requestAnimationFrame(animate)

  // Rotate the cube
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  // Render the scene
  renderer.render(scene, camera)
}

// Resize the renderer and update the camera aspect ratio when the window size changes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Start the animation
init()
animate()

// Add the resize event listener
window.addEventListener('resize', onWindowResize, false)
