let area = [
  [1,1,0,9],
  [1,1,0,1],
  [0,1,0,1],
  [1,1,1,1],
];
let area2 = [
  [1,1,0,1],
  [1,9,0,1],
  [0,1,0,1],
  [1,1,1,1],
];
let area3 = [
  [1,1,1,1],
  [1,0,0,1],
  [0,1,0,1],
  [9,1,1,1],
];
let area4 = [
  [1,1,1,1,1,1],
  [1,0,0,1,0,0],
  [0,1,1,9,0,1],
  [1,1,1,0,1,0],
  [1,0,1,0,1,0]
];
let area5 = [
  [1,1,1,1,1,1],
  [1,0,0,1,0,0],
  [0,1,1,1,0,1],
  [1,1,1,0,1,0],
  [1,0,1,0,1,0]
];

let nodeList = [];
let current = [];
let next = [];
let count = 0;
let max = 100; //timeout

class Node {
  constructor(row, column, value) {
    this.row = row;
    this.col = column;
    this.value = value;
    this.visited = false;
  };
};

function createNodes(grid) {
    for (let i = 0; i < grid.length;i++) {
    for (let j = 0; j < grid[i].length; j++) {
      nodeList.push(new Node(i, j, grid[i][j]));
    };
  };
};

function findRoute() {
  if (max <=0) {
    console.log('limit reached');
    return;
  };
  if (current.length > 0) {
    for (let i = 0; i < current.length; i++) {
      if (current[i].value == 9) {
        console.log(`quickest route: ${count} hops.`);
        //reset values
        nodeList = [];
        current = [];
        next = [];
        count = 0;
        max = 100 //timeout
        return;
      };
      let roads = getRoads(current[i]);
      for (let j = 0; j < roads.length; j++) {
        if (!next.find(node => node === roads[j])) next.push(roads[j]);
      };
      let currentNode = nodeList.find(node => node === current[i]);
      currentNode.visited = true;
      current.shift();
      i--;
    };
    for (let k = 0; k < next.length; k++) {
      current.push(next[k]);
    };
    count++;
    next = [];
    max--;
    // console.log('current', current, 'next', next, "count", count)
    findRoute();
  } else {
    console.log('no route found');
    return;
  };
};

function getQuickestRoute(grid) {
  createNodes(grid);
  if (nodeList[0].type == 9) return 1;
  current = getRoads(nodeList[0]);
  nodeList[0].visited = true;
  count++;
  findRoute();
}

function getRoads(node) {
  let roads = [];
  nodeList.forEach(sibling => {
      if (sibling.row == node.row-1 && sibling.col == node.col) {
        if ((sibling.value == 1 || sibling.value == 9) && sibling.visited == false) {
          roads.push (sibling);
        };
      };
      if (sibling.row == node.row+1 && sibling.col == node.col) {
        if ((sibling.value == 1 || sibling.value == 9) && sibling.visited == false) {
          roads.push (sibling);
        };
      };
      if (sibling.row == node.row && sibling.col == node.col-1) {
        if ((sibling.value == 1 || sibling.value == 9) && sibling.visited == false) {
          roads.push (sibling);
        };
      };
      if (sibling.row == node.row && sibling.col == node.col+1) {
        if ((sibling.value == 1 || sibling.value == 9) && sibling.visited == false) {
          roads.push (sibling);
        };
      };
  });
  return roads;
};

getQuickestRoute(area);
console.log('expected result: 9 hops\n');
getQuickestRoute(area2);
console.log('expected result: 2 hops\n');
getQuickestRoute(area3);
console.log('expected result: 9 hops\n');
getQuickestRoute(area4);
console.log('expected result: 5 hops\n');
getQuickestRoute(area5);
console.log('expected result: no route found\n');
