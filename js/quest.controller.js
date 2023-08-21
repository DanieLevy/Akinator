'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

// onload
$(onInit)


function onInit() {
  console.log('Started...');

  createQuestsTree()
  addEventListeners()

}

function addEventListeners() {
  $('.btn-start').click(onStartGuessing)
  // Insert data to element's data-list
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse)
  $('.btn-no').click({ ans: 'no' }, onUserResponse)
  $('.btn-add-guess').click(onAddGuess)
  $('.close-btn').click(closeModal)

}


function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()
  
  renderQuest()
  // TODO: show the quest section
  $('.quest').show()

  // TODO: Call renderQuest
  renderQuest()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  var currQuest = getCurrQuest()
  $('.quest h2').text(currQuest.txt)
}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  console.log('res', res);
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      console.log('Yes, I knew it!');
      $('.modal').show()
      onRestartGame()
    } else {
      console.log('I dont know...teach me!')
      askQuesetion()
    }
  } else {
    moveToNextQuest(res)
    renderQuest()
  }
}

      

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  console.log('newGuess', newGuess);
  var newQuest = $('#newQuest').val()
  console.log('newQuest', newQuest);
    // TODO: Get the inputs' values

  // OK: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  console.log('gQuestsTree: New', gQuestsTree);

  onRestartGame()

}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  $('.quest').hide()
  gCurrQuest = gQuestsTree
  gLastRes = null
}

function askQuesetion() {
  $('.new-quest').show()
  $('.quest').hide()
}

function closeModal() {
  $('.modal').hide()
}



