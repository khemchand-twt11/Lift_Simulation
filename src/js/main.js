const form = document.querySelector('.form');
const floorsContainer = document.querySelector('.floors-container');
const mainContainer = document.querySelector('.main-container');
const lifts = [];
const pendingQueue = [];

//evnet listener form
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const numFloorsInput = document.getElementById('floors');
  const numLiftsInput = document.getElementById('lifts');
  const numFloors = Number(numFloorsInput.value);
  const numLifts = Number(numLiftsInput.value);

  if (!numLifts || !numFloors || numFloors < 1 || numLifts < 1) {
    alert(
      'Please enter valid values for both number of floors and number of lifts.'
    );
    return;
  }
  if (numFloors > 20) {
    alert('Maximum number of floors allowed is 20.');
    return;
  }
  if (numLifts > 10) {
    alert('Maximum number of lifts allowed is 10.');
    return;
  }
  if (numLifts > numFloors) {
    alert(
      'Number of lifts should be less than or equal to the number of floors.'
    );
    return;
  }

  mainContainer.style.display = 'none';
  generateFloors(numFloors);
  generateLifts(numLifts);
});
//generate floors
function generateFloors(numFloors) {
  for (let floor = numFloors; floor >= 1; floor--) {
    const floorDiv = document.createElement('div');
    const floorContent = document.createElement('div');
    floorContent.classList.add('floor-content');

    if (floor !== numFloors) {
      const upButton = document.createElement('button');
      upButton.textContent = '⬆️';
      upButton.classList.add('lift-button', 'up-button');
      floorContent.appendChild(upButton);
    }

    if (floor !== 1) {
      const downButton = document.createElement('button');
      downButton.textContent = '⬇️';
      downButton.classList.add('lift-button', 'down-button');
      floorContent.appendChild(downButton);
    }

    const floorLabel = document.createElement('div');
    floorLabel.textContent = `Floor ${floor}`;
    floorLabel.classList.add('floor-label');
    // floorDiv.classList.add('floor')
    floorDiv.id = `floor-${floor}`;
    floorDiv.appendChild(floorContent);
    floorDiv.appendChild(floorLabel);
    floorsContainer.appendChild(floorDiv);
  }
}

//generate lifts
function generateLifts(numLifts) {
  const firstFloor = document.getElementById('floor-1');
  for (let lift = 1; lift <= numLifts; lift++) {
    const liftElement = document.createElement('div');
    liftElement.classList.add('lift');
    liftElement.id = `lift-${lift}`;

    const liftDoorOpening = document.createElement('div');
    liftDoorOpening.classList.add('lift-door', 'left-door');
    liftElement.appendChild(liftDoorOpening);

    const liftDoorClosing = document.createElement('div');
    liftDoorClosing.classList.add('lift-door', 'right-door');
    liftElement.appendChild(liftDoorClosing);
    liftElement.style.position = 'relative';
    firstFloor.appendChild(liftElement);

    lifts.push({
      liftId: `lift-${lift}`,
      currentFloor: 1,
      moving: false,
      direction: null,
    });
  }

  addLiftButtonListeners();
}

// Lift button listener
function addLiftButtonListeners() {
  const liftButtons = document.querySelectorAll('.lift-button');

  liftButtons.forEach((button) => {
    button.addEventListener('click', handleLiftButtonClick);
  });
}

function handleLiftButtonClick() {
  const floorElement = this.closest('.floor-content');
  const floor = parseInt(floorElement.parentNode.id.split('-')[1]);
  const nearestLift = findNearestIdleLift(floor); // floor number
  if (nearestLift) {
    handleNearestLift(nearestLift, floor);
  } else {
    handlePendingQueue(floor);
  }
}

function findNearestIdleLift(floor) {
  const idleLifts = lifts.filter((lift) => !lift.moving);

  if (idleLifts.length > 0) {
    const nearestLift = idleLifts.reduce((nearest, lift) => {
      const distance = Math.abs(floor - lift.currentFloor);
      if (!nearest || distance < Math.abs(floor - nearest.currentFloor)) {
        return lift;
      }
      return nearest;
    }, null);
    return nearestLift;
  } else {
    return null;
  }
}

function handleNearestLift(lift, floor) {
  lift.moving = true;
  if (lift.currentFloor === floor) {
    return openDoors(lift.liftId, floor);
  }
  const distanceToFloor = Math.abs(floor - lift.currentFloor);
  myMove(
    lift.liftId,
    distanceToFloor * 122,
    distanceToFloor * 2.5,
    floor,
    floor > lift.currentFloor ? 'up' : 'down'
  );
}

function handlePendingQueue(floor) {
  if (pendingQueue[pendingQueue.length - 1] !== floor) {
    pendingQueue.push(floor);
  }
  console.log(`Floor ${floor} added to pending queue.`);
}

//moving lift
function myMove(elemId, finalPos, totalTime, floorId, direction) {
  var elem = document.getElementById(elemId);
  var initialPos = parseInt(elem.style.bottom) || 0;

  var totalSteps = Math.floor(totalTime * 60);

  var stepSize =
    direction === 'up' ? finalPos / totalSteps : -finalPos / totalSteps;

  var pos = initialPos;
  var currentStep = 0;

  var id = setInterval(frame, 16.67);

  function frame() {
    if (currentStep >= totalSteps) {
      clearInterval(id);

      openDoors(elemId, floorId);
    } else {
      pos += stepSize;
      elem.style.bottom = pos + 'px';

      currentStep++;
    }
  }
}

//opening doors
function openDoors(liftId, floorId) {
  const liftElement = document.getElementById(liftId);
  const leftDoor = liftElement.querySelector('.left-door');

  const rightDoor = liftElement.querySelector('.right-door');

  leftDoor.classList.add('opening-left-door');
  rightDoor.classList.add('opening-right-door');

  setTimeout(() => {
    leftDoor.classList.remove('opening-left-door');
    leftDoor.classList.add('closing-left-door');

    rightDoor.classList.remove('opening-right-door');
    rightDoor.classList.add('closing-right-door');

    setTimeout(() => {
      leftDoor.classList.remove('closing-left-door');
      rightDoor.classList.remove('closing-right-door');
      const lift = lifts.find((lift) => lift.liftId === liftId);
      lift.moving = false;
      lift.currentFloor = floorId;

      handleIdleLift(lift);
    }, 2500);
  }, 2500);
}

function handleIdleLift(lift) {
  console.log(pendingQueue);
  const nextFloor = pendingQueue.shift();
  if (!nextFloor) return;
  setTimeout(() => {
    if (nextFloor) {
      const direction = nextFloor > lift.currentFloor ? 'up' : 'down';
      if (lift.currentFloor === nextFloor) {
        console.log(`Lift ${lift.liftId} arrived at floor ${nextFloor}.`);

        return openDoors(lift.liftId, nextFloor);
      }

      if (!lift.moving) {
        lift.direction = direction;
        console.log(
          `Lift ${lift.liftId} is moving ${direction} to floor ${nextFloor}.`
        );
        lift.moving = true;
        myMove(
          lift.liftId,
          Math.abs(nextFloor - lift.currentFloor) * 122,
          Math.abs(nextFloor - lift.currentFloor) * 2.5,
          nextFloor,
          nextFloor > lift.currentFloor ? 'up' : 'down'
        );
      }
    }
  }, 2500);
}
