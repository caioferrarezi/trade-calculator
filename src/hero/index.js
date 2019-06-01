import React, { Component } from 'react'
import './index.css'
import TradeForm from '../hero/TradeForm'

class Hero extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trades: []
    }

    this.bind()
  }

  bind() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.hasTrades = this.hasTrades.bind(this)
    this.hasSpecicTrade = this.hasSpecicTrade.bind(this)
  }

  handleFormSubmit(trade) {
    let trades = this.state.trades
    let tradeIndex = this.hasSpecicTrade(trade.name)

    if (!this.hasTrades() || tradeIndex === -1) {
      trades.push({
        name: trade.name,
        values: [trade.values]
      })
    } else {
      trades[tradeIndex].values.push(trade.values)
    }

    this.setState({
      trades: trades
    })

    this.props.onTradesUpdate(this.state.trades)

    console.log(this.state.trades)
  }

  hasTrades() {
    return !!this.state.trades.length
  }

  hasSpecicTrade(name) {
    return this.state.trades.findIndex(trade => trade.name === name)
  }

  render() {
    return(
      <div className="c-hero">
        <h1 className="c-hero__title">Trade Calculator</h1>

        <TradeForm onFormSubmit={this.handleFormSubmit}></TradeForm>
      </div>
    )
  }
}

export default Hero
