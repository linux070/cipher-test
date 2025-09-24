let currentDirection = null; // Start with no mode selected

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
      result += (char === char.toUpperCase()) ? newChar.toUpperCase() : newChar;
    } else {
      result += char;
    }
  }
  return result;
}

function updateCipher(direction) {
  const text = document.getElementById("text").value;
  let shift = parseInt(document.getElementById("shift").value);
  if (isNaN(shift)) shift = 0;

  currentDirection = direction;

  const output = caesarCipher(text, shift, direction);
  document.getElementById("result").textContent = output || "No text entered.";
  document.getElementById("status").textContent = `Mode: ${direction.charAt(0).toUpperCase() + direction.slice(1)} | Shift: ${shift}`;

  // Update button styles
  document.getElementById("encodeBtn").classList.toggle("active", direction === "encode");
  document.getElementById("decodeBtn").classList.toggle("active", direction === "decode");
}

function copyResult() {
  const resultText = document.getElementById("result").textContent;
  if (resultText && resultText !== "Result will appear here after you choose a mode...") {
    navigator.clipboard.writeText(resultText).then(() => {
      alert("Copied to clipboard!");
    });
  }
}

// Button actions
document.getElementById("encodeBtn").addEventListener("click", () => updateCipher("encode"));
document.getElementById("decodeBtn").addEventListener("click", () => updateCipher("decode"));



