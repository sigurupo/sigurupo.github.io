const guruguru = async () => {
  const canvas = document.querySelector('#guruguru')
  w = 512
  h = 512
  canvas.width = 512
  canvas.height = 512

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

  const prg = create_program(create_shader('vs'), create_shader('fs'))
  uniLocation[0] = gl.getUniformLocation(prg, 'time')
  uniLocation[1] = gl.getUniformLocation(prg, 'mouse')
  uniLocation[2] = gl.getUniformLocation(prg, 'resolution')
  let position = [
    -1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0
  ]
  let index = [
    0, 2, 1,
    1, 2, 3
  ]
  let vPosition = create_vbo(position)
  let vIndex = create_ibo(index)
  let vAttLocation = gl.getAttribLocation(prg, 'posision')
  gl.bindBuffer(gl.Array_BUFFER, vPosition)
  gl.enableVertexAttribArray(vAttLocation)
  gl.vertexAttribPointer(vAttLocation, 3, gl.FLOAT, false, 0, 0)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vIndex)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  mx = 0.5
  my = 0.5
  startTime = new Date().getTime()
  render()
}
if (document.readyState !== 'loading') {
  guruguru()
} else {
  document.addEventListener('DOMContentLoaded', guruguru(), {
    passive: false
  })
}
