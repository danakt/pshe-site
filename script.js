'use strict';

var promt = document.querySelectorAll('.promt');
var cmd = promt[0].getAttribute('data-text');

var copiedHintTimeoutId = -1;

function runCmd() {
  return new Promise(function (resolve) {
    var cmdLetters = cmd.split('');
    var curItem = 0;
    var intervalId = setInterval(function () {
      promt[0].innerText += cmdLetters[curItem];
      curItem++;

      if (curItem >= cmdLetters.length) {
        promt[0].innerText += '\n';
        clearInterval(intervalId);
        setTimeout(function () {
          promt[0].innerText = promt[0].innerText.slice(0, -1);
          document.querySelector('.first-prompt .typing-cursor').style.display = 'none';
          resolve();
        }, 200);
      }
    }, 40);
  });
}

function showOutput() {
  return new Promise(function (resolve) {
    var outputLines = document.querySelectorAll('.output div');
    var curItem = 0;
    var intervalId = setInterval(function () {
      outputLines[curItem].style.display = 'block';
      curItem++;

      if (curItem >= outputLines.length) {
        clearInterval(intervalId);
        setTimeout(function () {
          resolve();
        }, 30);
      }
    }, 20);
  });
}

function showNextPromt() {
  return new Promise(function (resolve) {
    document.querySelector('.second-prompt').style.display = 'block';
  });
}

function copyToClipboard(text) {
  var el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function copyInstallationCode() {
  copyToClipboard(document.querySelector('.installation code').innerText);

  document.querySelector('.installation .copied-hint').classList.add('showed');

  clearTimeout(copiedHintTimeoutId);
  copiedHintTimeoutId = setTimeout(function () {
    document.querySelector('.installation .copied-hint').classList.remove('showed');
  }, 1000);
}

setTimeout(function () {
  runCmd().then(showOutput).then(showNextPromt);
}, 500);
