function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.wall = [true, true, true, true];
  this.visited = false;

  this.show = function() {
    noFill();
    stroke(255);
    var x = this.i * w;
    var y = this.j * w;
    if (this.wall[0]) {
      //top
      line(x, y, x + w, y);
    }
    if (this.wall[1]) {
      //right
      line(x + w, y, x + w, y + w);
    }
    if (this.wall[2]) {
      //bottom
      line(x, y + w, x + w, y + w);
    }
    if (this.wall[3]) {
      //left
      line(x, y, x, y + w);
    }
    if (this.visited) {
      fill(50, 50, 240, 100);
      noStroke();
      rect(x, y, w, w);
    }
  };
  this.highlight = function() {
    fill(0, 255, 0, 100);
    noStroke();
    rect(i * w, j * w, w, w);
  };
  this.blocked = function() {
    fill(240, 50, 50, 100);
    noStroke();
    rect(i * w, j * w, w, w);
  };

  this.checkNeighbors = function() {
    var neighbors = [
      grid[getIndex(this.i, this.j - 1)],
      grid[getIndex(this.i + 1, this.j)],
      grid[getIndex(this.i, this.j + 1)],
      grid[getIndex(this.i - 1, this.j)]
    ];
    neighbors = neighbors
      .filter(neighbor => neighbor)
      .filter(neighbor => !neighbor.visited);
    if (neighbors.length > 0) {
      return neighbors[floor(random(0, neighbors.length))];
    }
    return undefined;
  };
}

function getIndex(i, j) {
  if (i < 0 || i === dim) {
    return -1;
  }
  return i + j * dim;
}

function removeWall(a, b) {
  var x = a.i - b.i;
  var y = a.j - b.j;
  if (x === 1) {
    a.wall[3] = false;
    b.wall[1] = false;
  }
  if (x === -1) {
    a.wall[1] = false;
    b.wall[3] = false;
  }
  if (y === 1) {
    a.wall[0] = false;
    b.wall[2] = false;
  }
  if (y === -1) {
    a.wall[2] = false;
    b.wall[0] = false;
  }
}
