const textEl = document.getElementById("clamped");
const text = textEl.innerText;

function clampHeight(numLines) {
  const { lineHeight } = getComputedStyle(textEl);
  textEl.style.maxHeight = `calc(${numLines} * ${lineHeight})`;
}

function addTruncator(string) {
  const textRect = textEl.getBoundingClientRect();
  // if there is no overflow, don't add a truncator
  if (textEl.scrollHeight === textRect.height) {
    return;
  }

  const truncEl = document.createElement("button");
  truncEl.innerText = string;

  let min = 0;
  let max = text.length - 1;
  let i;

  while (i !== max) {
    i = min + Math.floor((max - min) / 2);
    textEl.innerText = text.slice(0, i);
    textEl.append(truncEl);
    if (truncEl.getBoundingClientRect().top <= textRect.bottom) {
      min = i;
    } else {
      // last index must be at least 1 ealier if it is to fit
      max = i - 1;
    }
  }
}

function clampText(numLines, truncator = "...") {
  clampHeight(numLines);
  addTruncator(truncator);
}

function expandText() {
  textEl.innerText = text;
  textEl.style.maxHeight = "none";
}

clampText(4, "wow");
// expandText();
