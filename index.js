const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let isMouseDown = false;
const color = document.querySelector("input[type='color']");
const radius = document.querySelector("input[type='number']");
const eraser = document.querySelector(".eraser");
let rect = canvas.getBoundingClientRect();
let stroke = [];

eraser.addEventListener("click", (e) => {
  color.value = "#ffffff";
});

canvas.addEventListener("mousedown", (e) => {
  isMouseDown = true;
});

canvas.addEventListener("mouseup", (e) => {
  isMouseDown = false;
  for (let i = 0; i < stroke.length - 1; i++) {
    ctx.beginPath();
    ctx.strokeStyle = color.value;
    ctx.lineWidth = parseInt(radius.value) * 2;
    ctx.moveTo(stroke[i].x, stroke[i].y);
    ctx.lineTo(stroke[i + 1].x, stroke[i + 1].y);
    ctx.closePath();
    ctx.stroke();
  }
  stroke = [];
});

function draw(x, y) {
  ctx.beginPath();
  ctx.fillStyle = color.value;
  ctx.arc(
    x - rect.left,
    y - rect.top,
    parseInt(radius.value),
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
  ctx.closePath();
}

canvas.addEventListener("mousemove", (e) => {
  let xlim = e.clientX - rect.left;
  let ylim = e.clientY - rect.top;
  if (!isMouseDown) {
    return;
  }
  draw(e.clientX, e.clientY);
  stroke.push({
    x: xlim,
    y: ylim,
  });
});
