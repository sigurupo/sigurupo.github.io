(async()=> {


const getFile = url => {
  return new Promise((resolve, rejext) => {
    const XHR = new XMLHttpRequest()
    XHR.open('GET', url, true)
    XHR.addEventListener('load', e => {
      if (XHR.readyState === 4) {
        if (XHR.status === 200) {
          resolve(XHR.responseText)
          return
        } else {
          console.error(XHR.statusText)
          reject()
          return
        }
      }
    })
    XHR.addEventListener('error', function(event) {
      alert('Oups! Something goes wrong.')
    })
    XHR.send(null)
  })
}
var [vertexSource, fragmentSource] = await Promise.all([getFile('/vertex.glsl'), getFile('/fragment.glsl')]).catch(e => console.log)
const main = async() => {
  var canvas = document.getElementById('canvas')
  var gl = canvas.getContext('webgl')
  if(!gl) return

  // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 深度テストを有効化
    // gl.enable(gl.DEPTH_TEST);
    // 近くにある物体は、遠くにある物体を覆い隠す
    // gl.depthFunc(gl.LEQUAL);
    // カラーバッファや深度バッファをクリアする
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, vertexSource)
  gl.compileShader(vertexShader)
  console.log(gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragmentShader, fragmentSource)
  gl.compileShader(fragmentShader)
  console.log(gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
  var program = gl.createProgram()
   gl.attachShader(program, vertexShader)
   gl.attachShader(program, fragmentShader)
   gl.linkProgram(program)
   console.log(gl.getProgramParameter(program, gl.LINK_STATUS))
   var positionAttributeLocation = gl.getAttribLocation(program, "a_position")
   var positionBuffer = gl.createBuffer()
   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
   var positions = [
     0, 0,
     0, 0,5,
     0,7, 0
   ]
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
   gl.viewport(0, 0, canvas.width, canvas.height)
   gl.clearColor(0, 0, 0, 0)
   gl.clear(gl.COLOR_BUFFER_BIT)
   gl.useProgram(program)
   gl.enableVertexAttribArray(positionAttributeLocation)
   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
   var size = 2
   var type = gl.FLOAT
   var normalize = false
   var stride = 0
   var offset = 0
   gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
   var primitiveType = gl.TRIANGLES
   // var offset = 0
   var count = 3
   gl.drawArrays(primitiveType, offset, count)

}

if(document.readyState !== 'loading') {
  main()
} else {
  document.addEventListener('DOMContentLoaded', main(), {passive: false})
}

})()
