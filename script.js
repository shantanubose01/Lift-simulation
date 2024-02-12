// MADE BY SHANTANU BOSE

const noOfLifts = document.querySelector("#lifts");
const noOfFloors = document.querySelector("#floors");
const submitBtn = document.querySelector("#submit-btn");
const inputForm = document.querySelector(".input-form");
let i = -1;


const generateFloor = (floorNo) => {
  const newFloor = document.createElement("div");
  const upBtn = document.createElement("button");
  const downBtn = document.createElement("button");

  newFloor.className = "floor";
  newFloor.id = `floor-${floorNo}`;
  newFloor.textContent = `Floor ${floorNo}`;

  upBtn.textContent = "Up";
  downBtn.textContent = "Down";
  upBtn.classList.add("btn", "up-btn", "bold-600");
  downBtn.classList.add("btn", "down-btn", "bold-600");

  const floorBtnContainer = document.createElement("div");
  floorBtnContainer.className = "floor-btn-container";
  floorBtnContainer.append(upBtn, downBtn);
  floorBtnContainer.style.position = "absolute";
  floorBtnContainer.style.left = "70px";
  upBtn.addEventListener("click", () => moveLift(newFloor.id));
  downBtn.addEventListener("click", () => moveLift(newFloor.id));
  newFloor.appendChild(floorBtnContainer);
  document.getElementById("container").append(newFloor);
};


const generateLift = (liftNo) => {
  const newLift = document.createElement("div");
  newLift.className = "lift";
  newLift.id = `lift-${liftNo}`;

  document.getElementById("container").lastElementChild.appendChild(newLift);

  // doors
  const leftDoor = document.createElement("div");
  const rightDoor = document.createElement("div");
  leftDoor.className = "left-door";
  rightDoor.className = "right-door";

  newLift.append(leftDoor, rightDoor);
};


const moveLift = (floorId) => {
  const floorNo = floorId.split("-");
  const liftId = liftSelector();
  const lift = document.getElementById(liftId);

  // Calculate the distance to move the lift. The floor is 100px height each.
  const distance = (Number(floorNo[1]) - 1) * 100;

  // Calculate the number of floors to move the lift.
  const totalFloorsToMove = distance / 100;

  // Calculate the duration for the lift to move 2s per floor.
  const duration = 2000 * totalFloorsToMove;

  // Move the lift using CSS transition
  lift.style.transition = `transform ${duration}ms ease-in-out`;
  lift.style.transform = `translateY(-${distance}px)`;

  // Wait for the transition to end
  lift.addEventListener("transitionend", () => {
    openDoors(liftId);
  });
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



const liftSelector = () => {
  const allLifts = document.querySelectorAll(".lift");

  if (allLifts.length > 0) {
    if (i < allLifts.length - 1) {
      i++;
    } else {
      i = 0;
    }

    return allLifts[i].id;
  } else {
    console.error("No lifts found.");
    return null;
  }
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
    alert("Please enter a valid number");
    return;
  } else {
    inputForm.style.display = "none";

    // This will generate each floor.
    for (let i = +noOfFloors.value; i > 0; i--) {
      generateFloor(i);
    }

    // This will generate each lift.
    for (let j = 1; j <= +noOfLifts.value; j++) {
      generateLift(j);
    }

    const allFloors = document.querySelectorAll(".floor");

    // display the first floor down btn and last floor up button to none.
    allFloors[0].querySelector(".up-btn").style.display = "none";
    allFloors[allFloors.length - 1].querySelector(".down-btn").style.display =
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
