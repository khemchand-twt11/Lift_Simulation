const form = document.querySelector('.form')
const floorsContainer = document.querySelector('.floors-container')
const mainContainer = document.querySelector('.main-container')
const lifts = []

// Event listeners on button

function addLiftButtonListeners() {
  const liftButtons = document.querySelectorAll('.lift-button')
  liftButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const floorElement = this.closest('.floor-content')
      const floor = parseInt(floorElement.parentNode.id.split('-')[1])
      const direction = this.classList.contains('up-button') ? 'up' : 'down'
      console.log(floor, direction)
    })
  })
}

//generate floors
function generateFloors(numFloors) {
  for (let floor = numFloors; floor >= 1; floor--) {
    const floorDiv = document.createElement('div')
    const floorContent = document.createElement('div')
    floorContent.classList.add('floor-content')

    if (floor !== numFloors) {
      const upButton = document.createElement('button')
      upButton.textContent = '⬆️'
      upButton.classList.add('lift-button', 'up-button')
      floorContent.appendChild(upButton)
    }

    if (floor !== 1) {
      const downButton = document.createElement('button')
      downButton.textContent = '⬇️'
      downButton.classList.add('lift-button', 'down-button')
      floorContent.appendChild(downButton)
    }

    const floorLabel = document.createElement('div')
    floorLabel.textContent = `Floor ${floor}`
    floorLabel.classList.add('floor-label')
    // floorDiv.classList.add('floor')
    floorDiv.id = `floor-${floor}`
    floorDiv.appendChild(floorContent)
    floorDiv.appendChild(floorLabel)
    floorsContainer.appendChild(floorDiv)
  }
}

//generate lifts
function generateLifts(numLifts) {
  const firstFloor = document.getElementById('floor-1')
  for (let lift = 1; lift <= numLifts; lift++) {
    const liftElement = document.createElement('div')
    liftElement.classList.add('lift')
    liftElement.id = `lift-${lift}`

    const liftDoorOpening = document.createElement('div')
    liftDoorOpening.classList.add('lift-door', 'left-door')
    liftElement.appendChild(liftDoorOpening)

    const liftDoorClosing = document.createElement('div')
    liftDoorClosing.classList.add('lift-door', 'right-door')
    liftElement.appendChild(liftDoorClosing)
    liftElement.style.position = 'relative'
    firstFloor.appendChild(liftElement)

    lifts.push({
      currentFloor: 1,
      moving: false,
      direction: null,
      stops: [],
    })
  }
  console.log(lifts)
  addLiftButtonListeners()
}

//evnet listener form
form.addEventListener('submit', function (event) {
  event.preventDefault()

  const numFloorsInput = document.getElementById('floors')
  const numLiftsInput = document.getElementById('lifts')
  const numFloors = Number(numFloorsInput.value)
  const numLifts = Number(numLiftsInput.value)

  if (!numLifts || !numFloors || numFloors < 1 || numLifts < 1) {
    alert(
      'Please enter valid values for both number of floors and number of lifts.'
    )
    return
  }
  if (numFloors > 20) {
    alert('Maximum number of floors allowed is 20.')
    return
  }
  if (numLifts > 10) {
    alert('Maximum number of lifts allowed is 10.')
    return
  }
  if (numLifts > numFloors) {
    alert(
      'Number of lifts should be less than or equal to the number of floors.'
    )
    return
  }

  mainContainer.style.display = 'none'
  generateFloors(numFloors)
  generateLifts(numLifts)
})

//moving lift
function myMove(elemId, finalPos, totalTime) {
  var elem = document.getElementById(elemId)
  var totalSteps = Math.floor(totalTime * 60)
  var stepSize = finalPos / totalSteps

  var pos = 0
  var currentStep = 0

  var id = setInterval(frame, 16.67)

  function frame() {
    if (currentStep >= totalSteps) {
      clearInterval(id)
      setTimeout(() => {
        openDoors(elemId)
      }, 1000)
    } else {
      pos += stepSize
      elem.style.bottom = pos + 'px'
      currentStep++
    }
  }
}

//opening doors
function openDoors(liftId) {
  const liftElement = document.getElementById(liftId)
  const leftDoor = liftElement.querySelector('.left-door')
  const rightDoor = liftElement.querySelector('.right-door')

  leftDoor.classList.add('opening-left-door')
  rightDoor.classList.add('opening-right-door')

  setTimeout(() => {
    leftDoor.classList.remove('opening-left-door')
    leftDoor.classList.add('closing-left-door')

    rightDoor.classList.remove('opening-right-door')
    rightDoor.classList.add('closing-right-door')
  }, 2500)
}
