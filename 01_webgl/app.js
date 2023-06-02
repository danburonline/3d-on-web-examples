// Create the canvas and get a WebGL context from it
var canvas = document.getElementById('canvas')
var gl = canvas.getContext('webgl')

// Set the canvas size to the window size
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Define the vertices for a cube
var vertices = [
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1,
  1, 1,
]

// Define the indices for a cube
var indices = [
  0, 1, 2, 2, 3, 0, 4, 5, 6, 6, 7, 4, 0, 1, 5, 5, 4, 0, 2, 6, 7, 7, 3, 2, 0, 3,
  7, 7, 4, 0, 1, 2, 6, 6, 5, 1,
]

// Define the vertex shader
var vertexShaderSrc = `
    attribute vec3 position;
    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;
    void main(void) {
        gl_Position = projection * view * model * vec4(position, 1.0);
    }
`

// Define the fragment shader
var fragmentShaderSrc = `
    void main(void) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // color the cube red
    }
`

// Create the vertex buffer
var vertexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

// Create the index buffer
var indexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

// Create the vertex shader
var vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertexShaderSrc)
gl.compileShader(vertexShader)

// Create the fragment shader
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragmentShaderSrc)
gl.compileShader(fragmentShader)

// Create the shader program and link the shaders
var shaderProgram = gl.createProgram()
gl.attachShader(shaderProgram, vertexShader)
gl.attachShader(shaderProgram, fragmentShader)
gl.linkProgram(shaderProgram)
gl.useProgram(shaderProgram)

// Get the attribute and uniform locations
var position = gl.getAttribLocation(shaderProgram, 'position')
var modelUniform = gl.getUniformLocation(shaderProgram, 'model')
var viewUniform = gl.getUniformLocation(shaderProgram, 'view')
var projectionUniform = gl.getUniformLocation(shaderProgram, 'projection')

// Enable the position attribute
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(position)

// Set the viewport to match the canvas size
gl.viewport(0, 0, canvas.width, canvas.height)

// Create the model, view, and projection matrices
var model = mat4.create()
var view = mat4.create()
var projection = mat4.create()

// Initialize the view and projection matrices
mat4.lookAt(view, [3, 3, 3], [0, 0, 0], [0, 1, 0])
mat4.perspective(
  projection,
  Math.PI / 4,
  canvas.width / canvas.height,
  0.1,
  100.0
)

// Set the view and projection uniforms
gl.uniformMatrix4fv(viewUniform, false, view)
gl.uniformMatrix4fv(projectionUniform, false, projection)

// Set the clear color and enable depth testing
gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.enable(gl.DEPTH_TEST)

// Start the render loop
requestAnimationFrame(function render() {
  // Clear the color and depth buffers
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // Rotate the model matrix
  mat4.rotateY(model, model, 0.01)

  // Set the model uniform
  gl.uniformMatrix4fv(modelUniform, false, model)

  // Draw the cube
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)

  // Request the next frame
  requestAnimationFrame(render)
})

// Update the canvas size and projection matrix when the window size changes
window.addEventListener('resize', function () {
  // Update the canvas size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Update the projection matrix
  mat4.perspective(
    projection,
    Math.PI / 4,
    canvas.width / canvas.height,
    0.1,
    100.0
  )

  // Update the viewport to match the canvas size
  gl.viewport(0, 0, canvas.width, canvas.height)

  // Set the projection uniform
  gl.uniformMatrix4fv(projectionUniform, false, projection)
})
