import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import './index.css'
import { apiUrl } from './env'

class FormRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      publicKey: '',
      value: ''
    };
  }

  handleChange(event) {
    this.setState({ publicKey: event.target.value, value: event.target.value })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}/>
        <input type="button" value="+" onClick={() => {
          this.props.handleClick(this.state.publicKey)
          this.setState({ value: '' })
        }}/>
      </div>
    )
  }
}

class EdgesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      instructions: "Enter the names of all the animals you discovered",
      error: '',
      private: '',
      public: '',
      discoveredKeys: []
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit')
    if (this.state.hasError) { alert('Cannot submit with errors!') }
    else { 
      const data = { edges: this.state.discoveredKeys, private: this.state.private }
      return fetch(`${apiUrl}edges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        console.log(response)
        this.setState({
          error: '',
          private: '',
          public: '',
          discoveredKeys: []
        })
        return alert('Success! Your discovered animals were submitted')
      })
    }
  }

  handleAuth(privateKey) {
    return fetch(`${apiUrl}nodes/${privateKey}?private=true`, {
     method: "GET",
     headers: {
     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
   }})
    .then(response => {
     return response.json()
    })
    .then(data => {
      if (data.error) return this.setState({
        hasError: true,
        error: `Secret food ${privateKey} not found, did you spell it correctly?`
      })
      this.setState({
        hasError: false,
        private: privateKey,
        public: data.node.public
      })
    });
  }

  handleClick(publicKey) {
    return fetch(`${apiUrl}nodes/${publicKey}`, {
     method: "GET",
     headers: {
     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
   }})
    .then(response => {
     return response.json()
    })
    .then(data => {
      if (data.error) return this.setState({
        hasError: true,
        error: `Animal ${publicKey} not found, did you spell it correctly?`
      })
      const discoveredKeys = this.state.discoveredKeys
      discoveredKeys.push(data.node.public);
      this.setState({
        hasError: false,
        discoveredKeys: discoveredKeys
      })
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.state.hasError ? <p style={{color:'red'}}>{this.state.error}</p> : null}
        <br />
        {this.state.public ? `You are: ${JSON.stringify(this.state.public)}` : null}
        <br />
        {this.state.discoveredKeys.length ? `You have discovered: ${JSON.stringify(this.state.discoveredKeys)}` : null}
        <br />
        <p style={{color:'black'}}>Enter your secret food here:</p>
        <FormRow handleClick={this.handleAuth.bind(this)}/>
        <p style={{color:'black'}}>{this.state.instructions}</p>
        <FormRow handleClick={this.handleClick.bind(this)}/>
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class Graph extends Component {
  render() {
    return (
	  <h1>TEST</h1>
    )
  }
}

class Home extends Component {
  render() {
    return (
    <div>
      <h1>HOME</h1>
      <EdgesForm />
    </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/graph" component={Graph}/>
        </Switch>
      </div>
    )
  }
}

export default App;