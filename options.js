var _gaq = _gaq || [];

function save() {
  storageWrite("tc-forums",document.getElementById('forums').value);
  localStorage["options"] = document.getElementById('forums').value;
  Update();
  console.log("saved");
  chrome.alarms.create({periodInMinutes: 1});

  document.querySelector('#toast1').show();
}

function getValues(key) {
  chrome.storage.sync.get(key, function(items){
    document.getElementById('forums').value = items[key];
  });
}

function load() {
  getValues('tc-forums');
  chrome.storage.sync.get(null, function(items){
    console.log(items);
  });
}

//document.addEventListener('DOMContentLoaded', load);
document.addEventListener('polymer-ready', load);
document.getElementById('btn-save').addEventListener('click', save);