import authService from "./AuthService";
import { Graph } from "../view/graph_algorithms/utils/Graph";

async function runAlgorithm(algorithmType, graph, selectedVertex) {
  let response = await fetch(
    "http://localhost:3500/run-algorithm/" + algorithmType,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3500/",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedVertex: selectedVertex,
        graph: {
          directed: graph.directed,
          noOfVertices: graph.noOfVertices,
          adjList: Array.from(graph.adjList),
        },
      }),
    }
  );
  return JSON.parse(await response.json());
}

async function saveGraph(normalGraph, directedGraph, vertices, graphName) {
  let response = await fetch("http://localhost:3500/graphs/save/", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3500/",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: authService.getCurrentUser().id,
      graphName: graphName,
      vertices: vertices,
      normalGraph: {
        directed: normalGraph.directed,
        noOfVertices: normalGraph.noOfVertices,
        adjList: Array.from(normalGraph.adjList),
      },
      directedGraph: {
        directed: directedGraph.directed,
        noOfVertices: directedGraph.noOfVertices,
        adjList: Array.from(directedGraph.adjList),
      },
    }),
  });
  return JSON.parse(await response.json());
}

async function getGraph(graphName) {
  const response = await fetch("http://localhost:3500/graphs/get/", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3500/",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId:
        authService.getCurrentUser() !== null
          ? authService.getCurrentUser().id
          : "guest",
      graphName: graphName,
    }),
  });
  const responseJSON = await response.json();
  if (responseJSON.success) {
    console.log(responseJSON);
    const normalGraphFromJSON = JSON.parse(responseJSON.normalGraph);
    const normalGraph = new Graph(normalGraphFromJSON.directed);
    normalGraph.noOfVertices = normalGraphFromJSON.noOfVertices;
    normalGraph.adjList = new Map(normalGraphFromJSON.adjList);
    const directedGraphFromJSON = JSON.parse(responseJSON.directedGraph);
    const directedGraph = new Graph(directedGraphFromJSON.directed);
    directedGraph.noOfVertices = directedGraphFromJSON.noOfVertices;
    directedGraph.adjList = new Map(directedGraphFromJSON.adjList);
    return {
      normalGraph: normalGraph,
      directedGraph: directedGraph,
      vertices: JSON.parse(responseJSON.vertices),
    };
  } else return null;
}

async function getLoadableGraphNames() {
  let response = await fetch("http://localhost:3500/graphs/get-all-names/", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3500/",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId:
        authService.getCurrentUser() !== null
          ? authService.getCurrentUser().id
          : "guest",
    }),
  });
  return JSON.parse(await response.json());
}

const GraphService = {
  runAlgorithm: runAlgorithm,
  getGraph: getGraph,
  getLoadableGraphNames: getLoadableGraphNames,
  saveGraph: saveGraph,
};

export { GraphService as default };
