$(document).ready(function (e) {
  var canvas_height = 476;
  var canvas_width = 476;
  var canvasStrokeStyle = "white";
  var canvasLineJoin = "round";
  var canvasLineWidth = 10;
  var canvasBackgroundColor = "black";
  var canvasId = "canvas box";
  var canvasclass = "canvascss";
  var drawing = false;
  var prev_pos = { x: 0, y: 0 };
  var cur_pos = { x: 0, y: 0 };
  var firststroke = false;

  var canvasbox = document.getElementById(canvasId);
  var canvas = document.createElement("canvas");
  var clear = document.getElementById("Clear_button");

  canvas.setAttribute("width", canvas_width);
  canvas.setAttribute("height", canvas_height);
  canvas.setAttribute("id", canvasId);
  canvas.setAttribute("class", canvasclass);
  canvas.style.backgroundColor = canvasBackgroundColor;
  canvasbox.appendChild(canvas);
  canvas.addEventListener(
    "mousedown",
    function (e) {
      mousedown(e);
    },
    false
  );
  canvas.addEventListener(
    "mouseup",
    function (e) {
      mouseup();
    },
    false
  );
  canvas.addEventListener(
    "mousemove",
    function (e) {
      mousemove(e);
    },
    false
  );
  clear.addEventListener(
    "click",
    function () {
      erase();
    },
    false
  );

  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = canvasStrokeStyle;
  ctx.lineWidth = canvasLineWidth;
  ctx.lineJoin = canvasLineJoin;

  function draw(e) {
    if (firststroke) {
      prev_pos.x = cur_pos.x;
      prev_pos.y = cur_pos.y;
      cur_pos.x = e.clientX - canvas.getBoundingClientRect().left;
      cur_pos.y = e.clientY - canvas.getBoundingClientRect().top;
      if (drawing == true) {
        ctx.beginPath();
        ctx.moveTo(prev_pos.x, prev_pos.y);
        ctx.lineTo(cur_pos.x, cur_pos.y);
        ctx.stroke();
        ctx.closePath();
      }
    } else {
      prev_pos.x = e.clientX - canvas.getBoundingClientRect().left;
      prev_pos.y = e.clientY - canvas.getBoundingClientRect().top;
      cur_pos.x = e.clientX - canvas.getBoundingClientRect().left;
      cur_pos.y = e.clientY - canvas.getBoundingClientRect().top;
      if (drawing == true) {
        ctx.beginPath();
        ctx.moveTo(prev_pos.x, prev_pos.y);
        ctx.lineTo(cur_pos.x, cur_pos.y);
        ctx.stroke();
        ctx.closePath();
        firststroke = true;
      }
    }
  }

  function erase() {
    var check = confirm("Are you sure you want to Clear?");
    if (check) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      firststroke = false;
    }
  }

  function mousedown(e) {
    prev_pos.x = cur_pos.x;
    prev_pos.y = cur_pos.y;
    cur_pos.x = e.clientX - canvas.getBoundingClientRect().left;
    cur_pos.y = e.clientX - canvas.getBoundingClientRect().top;
    drawing = true;
  }

  function mouseup() {
    drawing = false;
  }

  function mousemove(e) {
    draw(e);
  }
});
