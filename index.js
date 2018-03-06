/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null


function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)



  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    // if (false /**
    //            * Think about it -- what's happening here?
    //            * There's been a collision if one of three things is true:
    //            * 1. The rock's left edge is < the DODGER's left edge,
    //            *    and the rock's right edge is > the DODGER's left edge;
    //            * 2. The rock's left edge is > the DODGER's left edge,
    //            *    and the rock's right edge is < the DODGER's right edge;
    //            * 3. The rock's left edge is < the DODGER's right edge,
    //            *    and the rock's right edge is > the DODGER's right edge
    //            */) {
    //   return true
    // }
    return (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    )
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top

   GAME.appendChild(rock)


  function moveRock() {
  rock.style.top = `${top += 2}px`;

     if (checkCollision(rock)) {
           return endGame()
         } else if (top < GAME_HEIGHT) {
           window.requestAnimationFrame(moveRock)
         } else {
           rock.remove()
         }
       }



  window.requestAnimationFrame(moveRock)


  ROCKS.push(rock)

  return rock
}


function endGame() {
  clearInterval(gameInterval)
  return alert('YOU LOSE!')

  for(let i=0;i<ROCKS.length;i++){
    ROCKS[i].remove()
  }
document.removeEventListener('keydown', moveDodger)
}



function moveDodger(e) {

  const arrow = e.which


   if (arrow === LEFT_ARROW) {
  moveDodgerLeft()
} else if (arrow === RIGHT_ARROW) {
  moveDodgerRight()
}
}

function moveDodgerLeft() {
   window.requestAnimationFrame(function() {
   const left = positionToInteger(DODGER.style.left)

   if (left > 0) {
     DODGER.style.left = `${left - 4}px`;
   }
 })
}

function moveDodgerRight() {
   window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left < 360) {
      DODGER.style.left = `${left + 4}px`;
    }
  })
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
