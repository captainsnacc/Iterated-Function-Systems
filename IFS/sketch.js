// in this code, v always represents a vector, m always represents a matrix

let points = []
let coordinateScale = 10
let showAxis

function setup()
{
  createCanvas(windowWidth, windowHeight)
  for (let i = 0; i < 20; i++)
  {
    points[i] = createVector(random(-4, 4), random(-4,4))
  }
  showAxis = createCheckbox(`show axis`, true)
}

function draw()
{
  background(10, 10, 20)
  // render coordinate axis
  if (showAxis.checked())
  {
    push()
    stroke(255)
    line(width / 2, 0, width / 2, height)
    line(0, height / 2, width, height / 2)
    pop()
  }
  // render all points
  points.forEach((v) => renderVec(v, coordinateScale))
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function renderVec(v, scaleFactor) // v is a p5.Vector object
{
  push()

  translate(width / 2, height / 2)
  scale(width / scaleFactor)
  stroke(255)
  strokeWeight(scaleFactor / width)

  point(v.x, -v.y)

  pop()
}
