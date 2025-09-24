function caesarCipher(text, shift, direction) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  shift = ((shift % 26) + 26) % 26;
  if (direction === "decode") shift = -shift;

  for (let char of text) {
    const lowerChar = char.toLowerCase();
    if (alphabet.includes(lowerChar)) {
      let position = alphabet.indexOf(lowerChar);
      let newPosition = (position + shift + 26) % 26;
      let newChar = alphabet[newPosition];
      result += char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
    } else {
      result += char;
    }
  }
  return result;
}

function runCipher(direction) {
  const text = document.getElementById("text").value;
  let shift = parseInt(document.getElementById("shift").value);
  if (isNaN(shift)) shift = 0;

  const output = caesarCipher(text, shift, direction);
  document.getElementById("result").textContent =
    output || "Your result will appear here...";
  document.getElementById("status").textContent = `Mode: ${
    direction.charAt(0).toUpperCase() + direction.slice(1)
  } | Shift: ${shift}`;

  // make the btns active ....
  document.getElementById("encodeBtn").classList.remove("active");
  document.getElementById("decodeBtn").classList.remove("active");
  document.getElementById(direction + "Btn").classList.add("active");
}

function copyResult() {
  const resultText = document.getElementById("result").textContent;
  if (resultText && resultText !== "Your result will appear here...") {
    navigator.clipboard.writeText(resultText).then(() => {
      alert("Copied to clipboard!");
    });
  }
}

//  this will work with the click events.
document
  .getElementById("encodeBtn")
  .addEventListener("click", () => runCipher("encode"));
document
  .getElementById("decodeBtn")
  .addEventListener("click", () => runCipher("decode"));

// thanks to chatGPT for this js.
