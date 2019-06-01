import React, { Component } from 'react'
import './App.css'
import TradeForm from './components/TradeForm'
import TradeList from './components/TradeList'

class App extends Component {
  constructor() {
    super()

    this.state = {
      tradeSubmited: {}
    }

    this.bind()
  }

  bind() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(trade) {
    this.setState({
      tradeSubmited: trade
    })
  }

  render() {
    return (
      <div className="App">
        <div className="c-hero">
          <h1 className="c-hero__title">Trade Calculator</h1>

          <TradeForm onFormSubmit={this.handleFormSubmit}></TradeForm>
        </div>

        <TradeList tradeSubmited={this.state.tradeSubmited}></TradeList>
      </div>
    )
  }
}

export default App;
