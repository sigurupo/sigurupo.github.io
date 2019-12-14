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
const main = async() => {
  const ele = document.querySelector('#latest')
  const data = JSON.parse(await getFile('/latest.json'))
  let list = '<ul>'
  for(const name in data) {
    list += `<li><a href="${data[name]}">${name}</a></li>`
  }
  list += '</ul>'
  ele.innerHTML = list
}
if(document.readyState !== 'loading') {
  main()
} else {
  document.addEventListener('DOMContentLoaded', main(), {passive: false})
}
