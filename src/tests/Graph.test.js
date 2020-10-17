import {
  Color,
  Position,
  Edge,
  Vertex,
  Graph,
} from "../view/graph_algorithms/utils/Graph";

describe("Test Class: Position", () => {
  test("Test Function: constructor (default)", () => {
    const position = new Position();
    expect(position.x).toBe(0);
    expect(position.y).toBe(0);
  });

  test("Test Function: constructor (with x)", () => {
    const position = new Position(5);
    expect(position.x).toBe(5);
    expect(position.y).toBe(0);
  });

  test("Test Function: constructor (with x, y)", () => {
    const position = new Position(4, 10);
    expect(position.x).toBe(4);
    expect(position.y).toBe(10);
  });
});

describe("Test Class: Edge", () => {
  test("Test Function: constructor (default)", () => {
    const edge = new Edge(2, 5);
    expect(edge.fromVertex).toBe(2);
    expect(edge.toVertex).toBe(5);
    expect(edge.weight).toBe(1);
    expect(edge.color).toBe(Color.BLACK);
  });

  test("Test Function: constructor (with all params)", () => {
    const edge = new Edge(2, 5, 1, Color.PALE_RED);
    expect(edge.fromVertex).toBe(2);
    expect(edge.toVertex).toBe(5);
    expect(edge.weight).toBe(1);
    expect(edge.color).toBe(Color.PALE_RED);
  });
});

describe("Test Class: Vertex", () => {
  test("Test Function: constructor (default)", () => {
    const vertex = new Vertex();
    expect(vertex.position).toEqual(new Position());
    expect(vertex.parent).toBe(null);
    expect(vertex.color).toBe(Color.PALE_RED);
    expect(vertex.depth).toBe(Infinity);
    expect(vertex.cost).toBe(Infinity);
    expect(vertex.distance).toBe(Infinity);
    expect(vertex.discoveryTime).toBe(0);
    expect(vertex.finishingTime).toBe(0);
  });

  test("Test Function: constructor (with weight)", () => {
    const vertex = new Vertex(
      1,
      new Position(50, 204),
      5,
      Color.GREEN,
      4,
      15,
      25,
      5,
      12
    );
    expect(vertex.vertexNumber).toEqual(1);
    expect(vertex.position).toEqual(new Position(50, 204));
    expect(vertex.parent).toBe(5);
    expect(vertex.color).toBe(Color.GREEN);
    expect(vertex.depth).toBe(4);
    expect(vertex.cost).toBe(15);
    expect(vertex.distance).toBe(25);
    expect(vertex.discoveryTime).toBe(5);
    expect(vertex.finishingTime).toBe(12);
  });
});

describe("Test Class: Graph", () => {
  describe("Test Case: Undirected Graph", () => {
    const undirectedGraph = new Graph();

    test("Test Function: constructor (default)", () => {
      expect(undirectedGraph.noOfVertices).toBe(0);
      expect(undirectedGraph.directed).toBe(false);
      expect(undirectedGraph.adjList).not.toBeNull();
      expect(undirectedGraph.adjList.size).toBe(0);
    });

    test("Test Function: addVertex", () => {
      expect(undirectedGraph.noOfVertices).toBe(0);
      expect(undirectedGraph.adjList.size).toBe(0);
      undirectedGraph.addVertex(0);
      expect(undirectedGraph.noOfVertices).toBe(1);
      expect(undirectedGraph.adjList.size).toBe(1);
      expect(undirectedGraph.adjList.get(0)).toEqual([]);
    });

    test("Test Function: removeVertex", () => {
      expect(undirectedGraph.noOfVertices).toBe(1);
      expect(undirectedGraph.adjList.size).toBe(1);
      expect(undirectedGraph.adjList.get(0)).toEqual([]);
      undirectedGraph.removeVertex(0);
      expect(undirectedGraph.noOfVertices).toBe(0);
      expect(undirectedGraph.adjList.size).toBe(0);
      expect(undirectedGraph.adjList.get(0)).toEqual(undefined);
      expect(undirectedGraph.adjList.has(0)).toBeFalsy();
    });

    test("Test Function: addEdge", () => {
      undirectedGraph.addVertex(0);
      undirectedGraph.addVertex(1);
      undirectedGraph.addVertex(2);
      undirectedGraph.addVertex(3);
      undirectedGraph.addVertex(4);
      undirectedGraph.addVertex(5);
      expect(undirectedGraph.noOfVertices).toBe(6);
      expect(undirectedGraph.adjList.size).toBe(6);
      expect(undirectedGraph.adjList.get(0)).toEqual([]);
      expect(undirectedGraph.adjList.get(1)).toEqual([]);
      expect(undirectedGraph.adjList.get(2)).toEqual([]);
      expect(undirectedGraph.adjList.get(3)).toEqual([]);
      expect(undirectedGraph.adjList.get(4)).toEqual([]);
      expect(undirectedGraph.adjList.get(5)).toEqual([]);
      undirectedGraph.addEdge(0, 2);
      undirectedGraph.addEdge(1, 2);
      undirectedGraph.addEdge(2, 5);
      undirectedGraph.addEdge(3, 4);
      undirectedGraph.addEdge(0, 4);
      undirectedGraph.addEdge(4, 0);
      expect(undirectedGraph.adjList.get(0)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 0, toVertex: 2, weight: 1 },
        { color: "rgb(0,0,0)", fromVertex: 0, toVertex: 4, weight: 1 },
      ]);
      expect(undirectedGraph.adjList.get(1)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 1, toVertex: 2, weight: 1 },
      ]);
      expect(undirectedGraph.adjList.get(2)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 2, toVertex: 0, weight: 1 },
        { color: "rgb(0,0,0)", fromVertex: 2, toVertex: 1, weight: 1 },
        { color: "rgb(0,0,0)", fromVertex: 2, toVertex: 5, weight: 1 },
      ]);
      expect(undirectedGraph.adjList.get(3)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 3, toVertex: 4, weight: 1 },
      ]);
      expect(undirectedGraph.adjList.get(4)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 4, toVertex: 3, weight: 1 },
        { color: "rgb(0,0,0)", fromVertex: 4, toVertex: 0, weight: 1 },
      ]);
      expect(undirectedGraph.adjList.get(5)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 5, toVertex: 2, weight: 1 },
      ]);
    });

    test("Test Function: getEdge", () => {
      expect(undirectedGraph.getEdge(0, 2)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 2,
        weight: 1,
      });
      expect(undirectedGraph.getEdge(2, 0)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 2,
        toVertex: 0,
        weight: 1,
      });
      expect(undirectedGraph.getEdge(3, 0)).toBeNull();
    });

    test("Test Function: isEdgeFromVertexToVertex", () => {
      expect(undirectedGraph.isEdgeFromVertexToVertex(0, 2)).toBeTruthy();
      expect(undirectedGraph.isEdgeFromVertexToVertex(2, 0)).toBeTruthy();
      expect(undirectedGraph.isEdgeFromVertexToVertex(3, 0)).toBeFalsy();
    });

    test("Test Function: isTwoWayEdgeBetweenVertices", () => {
      for (let i = 0; i < undirectedGraph.noOfVertices; ++i) {
        for (let j = 0; j < undirectedGraph.adjList.get(i).length; ++j) {
          let edgeList = undirectedGraph.adjList.get(i);
          for (let k = 0; k < edgeList.length; ++k) {
            expect(
              undirectedGraph.isTwoWayEdgeBetweenVertices(
                edgeList[k].fromVertex,
                edgeList[k].toVertex
              )
            ).toBeTruthy();
          }
        }
      }
    });

    test("Test Function: isEdgeInEdgeList", () => {
      for (let i = 0; i < undirectedGraph.noOfVertices; ++i) {
        for (let j = 0; j < undirectedGraph.adjList.get(i).length; ++j) {
          let edgeList = undirectedGraph.adjList.get(i);
          for (let k = 0; k < edgeList.length; ++k) {
            expect(
              undirectedGraph.isEdgeInEdgeList(edgeList[k], edgeList)
            ).toBeTruthy();
          }
        }
      }
      expect(
        undirectedGraph.isEdgeInEdgeList(
          { fromVertex: 1, toVertex: 2, weight: 5 },
          undirectedGraph.adjList.get(0)
        )
      ).toBeFalsy();
      expect(
        undirectedGraph.isEdgeInEdgeList(
          { fromVertex: 0, toVertex: 10, weight: 1 },
          undirectedGraph.adjList.get(0)
        )
      ).toBeFalsy();
    });

    test("Test Function: changeWeight", () => {
      expect(undirectedGraph.adjList.get(0)[0]).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 2,
        weight: 1,
      });
      undirectedGraph.changeWeight(0, 2, 5);
      expect(undirectedGraph.getEdge(0, 2)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 2,
        weight: 5,
      });
      expect(undirectedGraph.getEdge(2, 0)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 2,
        toVertex: 0,
        weight: 5,
      });
      undirectedGraph.changeWeight(0, 2, 1);
      expect(undirectedGraph.getEdge(0, 2)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 2,
        weight: 1,
      });
      expect(undirectedGraph.getEdge(2, 0)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 2,
        toVertex: 0,
        weight: 1,
      });
      expect(undirectedGraph.adjList.get(0)[0]).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 2,
        weight: 1,
      });
    });

    test("Test Function: removeEdgeBetweenVertices", () => {
      expect(undirectedGraph.getEdge(0, 4)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 4,
        weight: 1,
      });
      expect(undirectedGraph.getEdge(4, 0)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 4,
        toVertex: 0,
        weight: 1,
      });
      undirectedGraph.removeEdgeBetweenVertices(4, 0);
      expect(undirectedGraph.getEdge(0, 4)).toBe(null);
      expect(undirectedGraph.getEdge(4, 0)).toBe(null);
    });

    test("Test Function: removeVertex (remove edges)", () => {
      expect(undirectedGraph.noOfVertices).toBe(6);
      expect(undirectedGraph.adjList.size).toBe(6);
      for (let i = 0; i < 6; ++i) undirectedGraph.removeVertex(0);
      expect(undirectedGraph.noOfVertices).toBe(0);
      expect(undirectedGraph.adjList.size).toBe(0);
    });
  });

  describe("Test Case: Directed Graph", () => {
    const directedGraph = new Graph(true);

    test("Test Function: constructor (directed: true)", () => {
      expect(directedGraph.noOfVertices).toBe(0);
      expect(directedGraph.directed).toBe(true);
      expect(directedGraph.adjList).not.toBeNull();
      expect(directedGraph.adjList.size).toBe(0);
    });

    test("Test Function: addVertex", () => {
      expect(directedGraph.noOfVertices).toBe(0);
      expect(directedGraph.adjList.size).toBe(0);
      directedGraph.addVertex(0);
      expect(directedGraph.noOfVertices).toBe(1);
      expect(directedGraph.adjList.size).toBe(1);
      expect(directedGraph.adjList.get(0)).toEqual([]);
    });

    test("Test Function: removeVertex", () => {
      expect(directedGraph.noOfVertices).toBe(1);
      expect(directedGraph.adjList.size).toBe(1);
      expect(directedGraph.adjList.get(0)).toEqual([]);
      directedGraph.removeVertex(0);
      expect(directedGraph.noOfVertices).toBe(0);
      expect(directedGraph.adjList.size).toBe(0);
      expect(directedGraph.adjList.get(0)).toEqual(undefined);
      expect(directedGraph.adjList.has(0)).toBeFalsy();
    });

    test("Test Function: addEdge", () => {
      directedGraph.addVertex(0);
      directedGraph.addVertex(1);
      directedGraph.addVertex(2);
      directedGraph.addVertex(3);
      directedGraph.addVertex(4);
      directedGraph.addVertex(5);
      expect(directedGraph.noOfVertices).toBe(6);
      expect(directedGraph.adjList.size).toBe(6);
      expect(directedGraph.adjList.get(0)).toEqual([]);
      expect(directedGraph.adjList.get(1)).toEqual([]);
      expect(directedGraph.adjList.get(2)).toEqual([]);
      expect(directedGraph.adjList.get(3)).toEqual([]);
      expect(directedGraph.adjList.get(4)).toEqual([]);
      expect(directedGraph.adjList.get(5)).toEqual([]);
      directedGraph.addEdge(0, 2);
      directedGraph.addEdge(1, 2);
      directedGraph.addEdge(2, 5);
      directedGraph.addEdge(3, 4);
      directedGraph.addEdge(0, 4);
      directedGraph.addEdge(4, 0);
      expect(directedGraph.adjList.get(0)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 0, toVertex: 2, weight: 1 },
        { color: "rgb(0,0,0)", fromVertex: 0, toVertex: 4, weight: 1 },
      ]);
      expect(directedGraph.adjList.get(1)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 1, toVertex: 2, weight: 1 },
      ]);
      expect(directedGraph.adjList.get(2)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 2, toVertex: 5, weight: 1 },
      ]);
      expect(directedGraph.adjList.get(3)).toEqual([
        { color: "rgb(0,0,0)", fromVertex: 3, toVertex: 4, weight: 1 },
      ]);
      expect(directedGraph.adjList.get(4)).toEqual([
        {
          color: "rgb(0,0,0)",
          fromVertex: 4,
          toVertex: 0,
          weight: 1,
        },
      ]);
      expect(directedGraph.adjList.get(5)).toEqual([]);
    });

    test("Test Function: getEdge", () => {
      expect(directedGraph.getEdge(0, 2)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 2,
        weight: 1,
      });
      expect(directedGraph.getEdge(2, 0)).toBeNull();
      expect(directedGraph.getEdge(3, 0)).toBeNull();
    });

    test("Test Function: isEdgeFromVertexToVertex", () => {
      expect(directedGraph.isEdgeFromVertexToVertex(0, 2)).toBeTruthy();
      expect(directedGraph.isEdgeFromVertexToVertex(2, 0)).toBeFalsy();
      expect(directedGraph.isEdgeFromVertexToVertex(3, 0)).toBeFalsy();
    });

    test("Test Function: isTwoWayEdgeBetweenVertices", () => {
      for (let i = 0; i < directedGraph.noOfVertices; ++i) {
        for (let j = 0; j < directedGraph.adjList.get(i).length; ++j) {
          let edgeList = directedGraph.adjList.get(i);
          for (let k = 0; k < edgeList.length; ++k) {
            if (
              (edgeList[k].fromVertex === 4 && edgeList[k].toVertex === 0) ||
              (edgeList[k].fromVertex === 0 && edgeList[k].toVertex === 4)
            )
              expect(
                directedGraph.isTwoWayEdgeBetweenVertices(
                  edgeList[k].fromVertex,
                  edgeList[k].toVertex
                )
              ).toBeTruthy();
            else
              expect(
                directedGraph.isTwoWayEdgeBetweenVertices(
                  edgeList[k].fromVertex,
                  edgeList[k].toVertex
                )
              ).toBeFalsy();
          }
        }
      }
    });

    test("Test Function: isEdgeInEdgeList", () => {
      for (let i = 0; i < directedGraph.noOfVertices; ++i) {
        for (let j = 0; j < directedGraph.adjList.get(i).length; ++j) {
          let edgeList = directedGraph.adjList.get(i);
          for (let k = 0; k < edgeList.length; ++k) {
            expect(
              directedGraph.isEdgeInEdgeList(edgeList[k], edgeList)
            ).toBeTruthy();
          }
        }
      }
      expect(
        directedGraph.isEdgeInEdgeList(
          { fromVertex: 1, toVertex: 2, weight: 5 },
          directedGraph.adjList.get(0)
        )
      ).toBeFalsy();
      expect(
        directedGraph.isEdgeInEdgeList(
          { fromVertex: 0, toVertex: 10, weight: 1 },
          directedGraph.adjList.get(0)
        )
      ).toBeFalsy();
    });

    test("Test Function: changeWeight", () => {
      expect(directedGraph.adjList.get(0)[1]).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 4,
        weight: 1,
      });
      directedGraph.changeWeight(0, 4, 5);
      expect(directedGraph.getEdge(0, 4)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 4,
        weight: 5,
      });
      expect(directedGraph.getEdge(4, 0)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 4,
        toVertex: 0,
        weight: 1,
      });
      directedGraph.changeWeight(0, 4, 1);
      expect(directedGraph.getEdge(0, 4)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 4,
        weight: 1,
      });
      expect(directedGraph.getEdge(4, 0)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 4,
        toVertex: 0,
        weight: 1,
      });
      expect(directedGraph.adjList.get(0)[0]).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 2,
        weight: 1,
      });
    });

    test("Test Function: removeEdgeBetweenVertices", () => {
      expect(directedGraph.getEdge(0, 4)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 4,
        weight: 1,
      });
      expect(directedGraph.getEdge(4, 0)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 4,
        toVertex: 0,
        weight: 1,
      });
      directedGraph.removeEdgeBetweenVertices(4, 0);
      expect(directedGraph.getEdge(0, 4)).toEqual({
        color: "rgb(0,0,0)",
        fromVertex: 0,
        toVertex: 4,
        weight: 1,
      });
      expect(directedGraph.getEdge(4, 0)).toBe(null);
    });

    test("Test Function: removeVertex (remove edges)", () => {
      expect(directedGraph.noOfVertices).toBe(6);
      expect(directedGraph.adjList.size).toBe(6);
      for (let i = 0; i < 6; ++i) directedGraph.removeVertex(0);
      expect(directedGraph.noOfVertices).toBe(0);
      expect(directedGraph.adjList.size).toBe(0);
    });
  });
});
