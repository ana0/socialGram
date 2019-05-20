import React, { Component } from 'react'
import { Graph } from '@vx/network';
//import { genRandomNormalPoints } from '@vx/mock-data';
import './index.css'
import { apiUrl } from './env'

//const points = genRandomNormalPoints();

let nodes = [
  { x: 50, y: 20 },
  { x: 200, y: 300 },
  { x: 300, y: 40 }
];

let links = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1], target: nodes[2] },
  { source: nodes[2], target: nodes[0] }
];

const graph = {
  nodes,
  links
};

class GraphDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      nodes: []
    };
  }

  componentDidMount() {
    return fetch(`${apiUrl}edges`, {
    method: "GET",
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }})
      .then(response => {
        return response.json()
      })
      .then(data => {
        links = data.edges
      })
      .then(() => {
        return fetch(`${apiUrl}nodes`, {
        method: "GET",
        headers: {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        }})
      })
      .then(response => response.json())
      .then(data => {
        nodes = data.nodes
      })

  }

  render() {
    return (
      <svg width={window.innerWidth} height={window.innerHeight}>
        <rect width={window.innerWidth} height={window.innerHeight} rx={14} fill="#272b4d" />
        <Graph graph={graph} />
      </svg>
    );
  }
}

export default GraphDisplay;