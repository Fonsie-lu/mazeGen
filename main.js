var w = 20;
var dim;
var grid = [];
var current;
var stack = [];

function setup() {
  createCanvas(800, 800);
  dim = height / w;

  for (var i = 0; i < dim; i++) {
    for (var j = 0; j < dim; j++) {
      grid.push(new Cell(j, i));
    }
  }
  current = grid[0];
}

function draw() {
  background(50);
  current.visited = true;
  grid.forEach(cell => cell.show());
  var next = current.checkNeighbors();
  if (next) {
    removeWall(current, next);
    stack.push(current);
    current.highlight();
    current = next;
  } else if (stack.length > 0 && !next) {
    current = stack.pop();
    current.blocked();
  } else {
    console.log("Done");
    noLoop();
  }
}
