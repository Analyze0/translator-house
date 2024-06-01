const event = new KeyboardEvent('keydown', {
  key: 'Enter',
  code: 'Enter',
  which: 13,
  keyCode: 13,
});

if(!responsiveVoice.voiceSupport()) {
  alert('Your browser does not support responsiveVoice!');
}

document.getElementById('input').dispatchEvent(event);

document.querySelector('*').onkeydown = function(e){
  if(e.key == "ArrowUp"){
    if (recognition.running) {
      recognition.stop();
      document.getElementById('mic').innerHTML = "mic_off";
    } else {
      recognition.start();
      document.getElementById('mic').innerHTML = "mic";
    }
  }
}


var translated;
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[4]; 
document.getElementById('input').onkeyup = function(e){
  translated = " " + document.getElementById('input').value;
  translate(e);
  document.getElementById('output').innerHTML = translated;
}

const resultText = document.getElementById('resultText');

// Create a new SpeechRecognition instance
const recognition = new webkitSpeechRecognition(); // For Chrome
// const recognition = new SpeechRecognition(); // For other browsers

// Set the properties of the recognition instance
recognition.lang = 'en-US'; // Set the language
recognition.continuous = true;

// Event handler for when speech is recognized
var transcript;
recognition.onresult = (event) => {
  transcript = event.results[event.results.length - 1][0].transcript;
  document.getElementById('input').textContent = transcript;
  recognition.stop();
  speak();
};

// Event handler for errors
recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};

// Get the text area and speak button elements
let textArea = document.getElementById("resultText");

// Add an event listener to the speak button
function speak(e){
  translated = transcript;
  translate(e);

  responsiveVoice.speak(translated, "Swedish Female", { pitch: 1.2, rate: 0.8 });
  document.getElementById('output').innerHTML = translated;
  document.getElementById('mic').innerHTML = "mic_off";
}

translated = "Testing, one, two, three, four ";
responsiveVoice.speak(translated, "Swedish Female", { pitch: 1.2, rate: 0.8, volume: 1 });

//For voices: https://responsivevoice.org/text-to-speech-languages/