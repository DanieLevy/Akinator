'use strict'

var gQuestsTree
var gCurrQuest = null
var gPrevQuest = null
// ?
var gLastRes = null

var STORAGE_KEY = 'gQuestsTree'

function createQuestsTree() {
  if (loadFromStorage(STORAGE_KEY)) {
    gQuestsTree = loadFromStorage(STORAGE_KEY)
    gCurrQuest = gQuestsTree
    console.log('gQuestsTree: Loaded! LocalStorage', gQuestsTree)
  } else {
  gQuestsTree = createQuest('Male?')
  gQuestsTree.yes = createQuest('Gandhi')
  gQuestsTree.no = createQuest('Rita')

  gCurrQuest = gQuestsTree
  gPrevQuest = null

  saveToStorage('gQuestsTree', gQuestsTree)
  console.log('Saved! gQuestsTree:', gQuestsTree)
  }
}


function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  gLastRes = res;
  gPrevQuest = gCurrQuest;
  gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  const newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  
  newQuest.no = gCurrQuest
  gPrevQuest[lastRes] = newQuest
  gCurrQuest = gQuestsTree

  saveToStorage(STORAGE_KEY, gQuestsTree)
  console.log('Saved! gQuestsTree:', gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}

// Save and load from localStorage functions:

function saveToStorage(key, val) {
  saveToLocalStorage(key, val)
  console.log('Saved!', key, val);
}

function loadFromStorage(key) {
  if (!loadFromLocalStorage(key)) return console.log('No data in localStorage');
  console.log('Loaded!', key);
  return loadFromLocalStorage(key)
}