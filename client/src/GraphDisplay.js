import React, { Component } from 'react'
import './index.css'
import { apiUrl } from './env'

class GraphDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edges: []
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

      });
  }

  render() {
    return (

    )
  }
}

export default GraphDisplay;