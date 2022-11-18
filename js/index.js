const button = document.querySelector("button")
const conclusion = document.querySelector('#conclusion')
const conclusionClose = conclusion.querySelector('button')
const furnacesPerCountyInput = document.getElementById('furnaces-per-county')
const furnacesPerCountyOutput = document.querySelector('.range-holder strict')
const image   = document.querySelector("main img")
const canvas  = document.querySelector("main canvas")
const kmPerPixel   = document.getElementById("km-per-pixel")

const ctx = canvas.getContext('2d')

document.querySelector('h1').textContent = document.title

function setFurnacesCount(){
  const {value} = furnacesPerCountyInput
  furnacesPerCountyOutput.textContent = value
}

furnacesPerCountyInput.addEventListener('change', setFurnacesCount)
setFurnacesCount()

conclusionClose.addEventListener('click', () => conclusion.classList.add('d-none'))

const {width, height} = canvas

const PIXELS_COUNT = width * height
const BYTE_COUNT  = PIXELS_COUNT * 4
let filled = []
let origin = []

image.addEventListener("load", (e) => {
  ctx.drawImage(image, 0, 0, 385, 600)
  const imageData = ctx.getImageData(0, 0, width, height);
  const {data} = imageData
  origin = [...data]
  for(let i = 0; i < BYTE_COUNT; i += 4){
    const pixel = data.slice(i, i + 4)
    const [red, green, blue] = pixel
    if(red === 255 && green === 255 && blue === 255) continue
    filled.push(i)
  }
  kmPerPixel.textContent = Math.round(BRITAIN_SQUARE / filled.length * 100) / 100
})

image.src = `${image.src}?${Math.random()}` 

async function delayedAction (delay, func = () => {}){
  return new Promise((yep) => setTimeout(() => yep(func()), delay))
}

async function deforestation(){
  button.classList.add('disabled')
  let years = 0
  const conclusionSpan = conclusion.querySelector('span')
  conclusionSpan.innerHTML = ''
  conclusion.classList.add('d-none')
  const furnacesCount = furnacesPerCountyInput.value 
  const speed = Math.round(DEFORESTATION_SPEED_PER_FURNACE * COUNTY_COUNT * furnacesCount)
  const englandPixelsCount = Math.round(filled.length * ENGLAND_SQUARE / BRITAIN_SQUARE)
  const imageData = ctx.getImageData(0, 0, width, height);
  ctx.drawImage(image, 0, 0, 385, 600)
  const {data} = imageData
  for(let i = 0; i < origin.length; i ++){
    data[i] = origin[i]
  }
  ctx.putImageData(imageData, 0, 0)
  for(let i = filled.length; i > englandPixelsCount; i--){
      const n = filled[i]
      data[n] = 166
      data[n + 1] = 62
      data[n + 2] = 41
      if(i % speed === 0){
           await delayedAction(100)
           ctx.putImageData(imageData, 0, 0)
           years++
      }
  }
  ctx.putImageData(imageData, 0, 0)
  conclusionSpan.innerHTML = `При наличии ${furnacesCount} горнов в каждом из 48 графств<br> Англия могла лишится леса за ${years} ${getYearPostfix(years)}.`
  conclusion.classList.remove('d-none')
  button.classList.remove('disabled')

  //setTimeout(() => conclusion.classList.add('d-none'), 5000)
}

function getYearPostfix(years){
  let rest = years % 100
  if(rest > 10 && rest < 20) return 'лет'
  rest = years % 10
  switch(rest){
    case 1: return 'год'
    case 2:
    case 3:
    case 4:
      return 'года'
    default: return 'лет'
  }
}

button.addEventListener('click', deforestation)
