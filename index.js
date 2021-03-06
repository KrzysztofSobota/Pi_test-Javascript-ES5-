'use strict'

// window.addEventListener("DOMContentLoaded", PiTest);

function PiTest() {
  const canvas = document.querySelector('#myCanvas');
  let a = canvas.width; // square edge value
  let r = canvas.width/2; // circle radius value
  
/* Choosing sample size for test */
  let valueSelected = document.querySelector('#valueList');
  
  function selectedValues() {
    let listValue = valueSelected.value;
    let testNumber = Number(listValue);
      
    return testNumber;       
  }
  
  let putNumber = selectedValues();  
  valueSelected.addEventListener('change', selectedValues);

  
/*** Calculating dots position for canvas (numerical part of the test) ***/

  function calculate(putNumber) {
    let coordinates = [];
    let j = 0;
 
    const pointsInside = document.querySelector('#number1');
    const percent = document.querySelector('#number2');
    const piValue = document.querySelector('#PiResult');

    for (let i = 1; i <= putNumber; i++) {
      /* Double using Math.round() because x nad y values for point (x,y) must be calculate independent!! */
      let x = Math.round((Math.random()) * a);
      let y = Math.round((Math.random()) * a);
      coordinates.push(x,y);

      let squareEquation = Math.pow(x-r, 2) + Math.pow(y-r, 2);
      let point = Math.round(Math.sqrt(squareEquation));
      
        if (point <= r) {
          j++;
        }
     
  /* Calculating results on the table */
      pointsInside.textContent = j;
      percent.textContent = (j / putNumber * 100).toFixed(1);
      piValue.textContent = (4 * (j / i)).toFixed(2);
    }
      
    return coordinates;
  }
  
  let xyArray = calculate(putNumber);

/*** Drawing point into the canvas (graphical parts of the test) ***/
const ctx = canvas.getContext('2d');
  function draw() {
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // taking x and y from the array
    for (let i = 0; i < (xyArray.length / 2); i++) {
      let X = xyArray[2 * i];
      let Y = xyArray[2 * i+ 1]; 
      
/* (0,0) point is moving to the center of canvas */
      let equation2 = Math.pow(X-r, 2) + Math.pow(Y-r, 2);
      
      let points = Math.round(Math.sqrt(equation2));
      
 /* Make a right color for the points */
        if (points <= r) {
          ctx.fillStyle = 'red';
        }
        else {
          ctx.fillStyle = 'black';
        }
      
/* dots defined as 1x1 pixels rectangles */
      ctx.fillRect(X, Y, 1, 1);
    }
    
    // window.requestAnimationFrame(draw);
  }
  
  draw();
}
  
let btn = document.querySelector('#testing');
btn.addEventListener('click', PiTest);

/** User can show/hide theoretical description of "Pi test". This saves a lot of document space - it is especially important for mobile devices **/

let showHideButton = document.querySelector('#savespace');

function ShowHideText() {
  let hiddenText = document.querySelector('.description');
  
  if (hiddenText.style.display === 'none') {
    hiddenText.style.display = 'flex';
  } else {
    hiddenText.style.display = 'none';
  }
}

showHideButton.addEventListener('click', ShowHideText);