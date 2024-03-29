// MADE BY SHANTANU

const noOfLifts = document.querySelector("#lifts");
const noOfFloors = document.querySelector("#floors");
const submitBtn = document.querySelector("#submit-btn");
const inputForm = document.querySelector(".input-form");
// let i = -1;

const generateFloor = (floorNo) => {
  const newFloor = document.createElement("div");
  const upBtn = document.createElement("button");
  const downBtn = document.createElement("button");

  newFloor.className = "floor";
  newFloor.id = `floor-${floorNo}`;
  newFloor.textContent = `Floor ${floorNo}`;
  newFloor.setAttribute("data-floor", floorNo);
  upBtn.textContent = "Up";
  downBtn.textContent = "Down";
  upBtn.classList.add("btn", "up-btn", "bold-600");
  downBtn.classList.add("btn", "down-btn", "bold-600");
  if (floorNo === 0) {
    downBtn.textContent = "Up";
    downBtn.classList.remove("down-btn");
    downBtn.classList.add("up-btn");
  }
  if (floorNo === noOfFloors.value - 1) {
    upBtn.textContent = "Down";
    upBtn.classList.remove("up-btn");
    upBtn.classList.add("down-btn");
    downBtn.classList.remove("down-btn");
    downBtn.classList.add("up-btn")
  }

  const floorBtnContainer = document.createElement("div");
  floorBtnContainer.className = "floor-btn-container";
  floorBtnContainer.append(upBtn, downBtn);
  floorBtnContainer.style.position = "absolute";
  floorBtnContainer.style.left = "70px";
  if (floorNo === noOfFloors.value - 1) {
    upBtn.addEventListener("click", () => moveLift("btn-up", floorNo));
  } else {
    upBtn.addEventListener("click", () => moveLift("btn-up", floorNo));
  }
  if (floorNo !== 0) {
    downBtn.addEventListener("click", () => moveLift("btn-down", floorNo));
  } else {
    downBtn.addEventListener("click", () => moveLift("btn-down", floorNo));
  }

  newFloor.appendChild(floorBtnContainer);
  document.getElementById("container").append(newFloor);
};

const generateLift = (liftNo) => {
  const newLift = document.createElement("div");
  newLift.className = "lift";
  newLift.id = `lift-${liftNo}`;
  newLift.setAttribute("data-floor", "0");

  document.getElementById("container").lastElementChild.appendChild(newLift);

  // doors
  const leftDoor = document.createElement("div");
  const rightDoor = document.createElement("div");
  leftDoor.className = "left-door";
  rightDoor.className = "right-door";

  newLift.append(leftDoor, rightDoor);
};

const moveLift = (id, floorClicked) => {
  const lifts = Array.from(document.querySelectorAll(".lift"));
  for (let i = 0; i < lifts.length; i++) {
    const lift = lifts[i];
    const currentFloor = +lift.dataset.floor;
    const { height } = document
      .querySelector(`[data-floor='${floorClicked}']`)
      .getBoundingClientRect();
    const floorCondition =
      id === "btn-down"
        ? currentFloor > floorClicked
        : currentFloor < floorClicked;
    if (floorCondition && currentFloor !== floorClicked) {
      // Calculate the duration for the lift to move 2 seconds per floor.
      const duration = Math.abs(currentFloor - floorClicked) * 2 * 1000; // Multiply by 1000 to convert seconds to milliseconds

      // Set the transition properties
      lift.style.transition = `transform ${duration}ms ease-in-out`;

      // Move the lift
      lift.style.transform = `translateY(-${height * floorClicked}px)`;

      // Update the data-floor attribute
      lift.dataset.floor = floorClicked;

      // Wait for the transition to end before opening doors
      lift.addEventListener("transitionend", function () {
        openDoors(lift.id);
      });
      break;
    }
  }
};

const openDoors = (liftId) => {
  document.getElementById(liftId).classList.add("open");

  // Wait for the transition to end
  document.getElementById(liftId).addEventListener("transitionend", () => {
    closeDoors(liftId);
  });
};

const closeDoors = (liftId) => {
  document.getElementById(liftId).classList.remove("open");
};

const generateBtn = (text) => {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.classList.add("btn", "generate-btn", "bold-600");
  return btn;
};

const resetBtnHandler = () => {
  const resetBtn = generateBtn("Reset");

  resetBtn.addEventListener("click", function () {
    const allLifts = document.querySelectorAll(".lift");
    i = -1;
    allLifts.forEach((lift) => {
      lift.style.transform = `translateY(0)`;
    });
  });

  return resetBtn;
};

const restartBtnHandler = () => {
  const restartBtn = generateBtn("Restart");

  restartBtn.addEventListener("click", function () {
    inputForm.style.display = "block";
    document.getElementById("container").innerHTML = "";

    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach((input) => {
      input.value = "";
    });
  });

  return restartBtn;
};

submitBtn.addEventListener("click", function (event) {
  // to prevent default behaviour.
  event.preventDefault();

  if (+noOfFloors.value < 1 || +noOfLifts.value < 1) {
    // validation
    alert("Please enter a Positive integer value");
    return;
  } else {
    inputForm.style.display = "none";

    // This will generate each floor.
    for (let i = +noOfFloors.value - 1; i >= 0; i--) {
      generateFloor(i);
    }

    // This will generate each lift.
    for (let j = 1; j <= +noOfLifts.value; j++) {
      generateLift(j);
    }

    const allFloors = document.querySelectorAll(".floor");

    // display the first floor down btn and last floor up button to none.
    allFloors[0].querySelector(".up-btn").style.display = "none";
    allFloors[allFloors.length - 1].querySelector(".up-btn").style.display =
      "none";

    // This will reset the game and bring back lifts to the first floor.
    const resetBtn = resetBtnHandler();

    // This will restart the game.
    const restartBtn = restartBtnHandler();

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.append(restartBtn, resetBtn);

    document.getElementById("container").appendChild(btnContainer);
    btnContainer.style.textAlign = "center";
  }
});
