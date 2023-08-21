"use strict";

// Storage servie - save and load from localStorage

function saveToLocalStorage(key, val) {
  var json = JSON.stringify(val);
  localStorage.setItem(key, json);
}

function loadFromLocalStorage(key) {
  var json = localStorage.getItem(key);
  var val = JSON.parse(json);
  return val;
}
