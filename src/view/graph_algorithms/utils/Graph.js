export const Color = {
  WHITE: "rgb(248,248,255)",
  GRAY: "rgb(105,105,105)",
  RED: "rgb(255,0,0)",
  PALE_RED: "rgb(205,65,65)",
  DARK_RED: "rgb(139, 0, 0)",
  GREEN: "rgb(0, 128, 0)",
  BLACK: "rgb(0,0,0)",
};

export class Position {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export class Edge {
  constructor(fromVertex, toVertex, weight = 1, color = Color.BLACK) {
    this.fromVertex = fromVertex;
    this.toVertex = toVertex;
    this.weight = weight;
    this.color = color;
  }
}

export class Vertex {
  constructor(
    position = new Position(),
    parent = null,
    color = Color.PALE_RED,
    depth = Infinity,
    cost = Infinity,
    distance = Infinity,
    discoveryTime = 0,
    finishingTime = 0
  ) {
    this.position = position;
    this.depth = depth;
    this.parent = parent;
    this.color = color;
    this.cost = cost;
    this.distance = distance;
    this.discoveryTime = discoveryTime;
    this.finishingTime = finishingTime;
  }
}

export class Graph {
  constructor(directed = false) {
    this.noOfVertices = 0;
    this.directed = directed;
    this.adjList = new Map();
  }

  addVertex(v) {
    this.noOfVertices++;
    this.adjList.set(v, []);
  }

  removeVertex(v) {
    this.adjList.delete(v);
    let reindexList = [];
    for (const entry of this.adjList.entries()) {
      let index = 0;
      while (index < entry[1].length) {
        if (entry[1][index].toVertex === v) {
          entry[1].splice(index, 1);
        } else ++index;
      }
      if (entry[0] > v) {
        reindexList.push(entry[0]);
      }
    }
    for (let i = 0; i < reindexList.length; ++i) {
      for (const entry of this.adjList.entries()) {
        if (entry[0] === reindexList[i]) {
          for (let j = 0; j < entry[1].length; ++j) {
            entry[1][j].fromVertex = reindexList[i] - 1;
          }
        }
        for (let j = 0; j < entry[1].length; ++j) {
          if (entry[1][j].toVertex === reindexList[i]) {
            entry[1][j].toVertex = reindexList[i] - 1;
          }
        }
      }
      this.adjList.set(reindexList[i] - 1, this.adjList.get(reindexList[i]));
      this.adjList.delete(reindexList[i]);
    }
    this.noOfVertices--;
  }

  removeEdge(src, dest) {
    for (let i = 0; i < this.adjList.get(src).length; ++i) {
      if (this.adjList.get(src)[i].toVertex === dest) {
        this.adjList.get(src).splice(i, 1);
      }
    }
  }

  removeEdgeBetweenVertices(src, dest) {
    this.removeEdge(src, dest);
    if (!this.directed) this.removeEdge(dest, src);
  }

  changeWeightForEdgeBetweenVertices(src, dest, newWeight) {
    for (let i = 0; i < this.adjList.get(src).length; ++i) {
      if (this.adjList.get(src)[i].toVertex === dest) {
        this.adjList.get(src)[i].weight = newWeight;
      }
    }
  }

  changeWeight(src, dest, newWeight) {
    this.changeWeightForEdgeBetweenVertices(src, dest, newWeight);
    if (!this.directed)
      this.changeWeightForEdgeBetweenVertices(dest, src, newWeight);
  }

  isEdgeInEdgeList(edge, edgeList) {
    for (let i = 0; i < edgeList.length; ++i) {
      if (
        edge.fromVertex === edgeList[i].fromVertex &&
        edge.toVertex === edgeList[i].toVertex &&
        edge.weight === edgeList[i].weight
      ) {
        return true;
      }
    }
    return false;
  }

  isEdgeFromVertexToVertex(index, otherIndex) {
    for (let i = 0; i < this.adjList.get(index).length; ++i) {
      if (this.adjList.get(index)[i].toVertex === otherIndex) {
        return true;
      }
    }
    return false;
  }

  isTwoWayEdgeBetweenVertices(index, otherIndex) {
    return (
      this.isEdgeFromVertexToVertex(index, otherIndex) &&
      this.isEdgeFromVertexToVertex(otherIndex, index)
    );
  }

  getEdge(src, dest) {
    for (let i = 0; i < this.adjList.get(src).length; ++i) {
      if (this.adjList.get(src)[i].toVertex === dest) {
        return this.adjList.get(src)[i];
      }
    }
    return null;
  }

  addEdge(src, dest, weight = 1) {
    if (!this.isEdgeFromVertexToVertex(src, dest))
      this.adjList.get(src).push(new Edge(src, dest, weight));

    if (!this.directed && !this.isEdgeFromVertexToVertex(dest, src))
      this.adjList.get(dest).push(new Edge(dest, src, weight));
  }
}
