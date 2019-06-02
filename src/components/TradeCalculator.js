import React, { Component } from 'react'
import './TradeCalculator.css'
import TradeForm from './TradeForm'
import TradeItem from './TradeItem'

class TradeCalculator extends Component {
  constructor() {
    super()

    this.state = {
      trades: []
    }

    this.bind()
  }

  bind() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.calcultePurchase = this.calcultePurchase.bind(this)
    this.getTradeIndex = this.getTradeIndex.bind(this)
  }

  handleFormSubmit(tradeSubmited) {
    const trades = this.state.trades
    const tradeIndex = this.getTradeIndex(tradeSubmited.name)

    if (!trades.length || tradeIndex === -1) {
      const { priceAverage, amountAverage } = this.calcultePurchase(tradeSubmited)

      trades.push({
        name: tradeSubmited.name,
        values: [tradeSubmited.values],
        priceAverage,
        amountAverage
      })
    }
    else {
      const currentTrade = trades[tradeIndex]
      const { priceAverage, amountAverage } = this.calcultePurchase(currentTrade)

      currentTrade.values.push(tradeSubmited.values)
      currentTrade.priceAverage = priceAverage
      currentTrade.amountAverage = amountAverage
    }

    this.setState({
      trades: trades
    })
  }

  calcultePurchase(trade) {
    const valuesSubmited = Array.isArray(trade.values) ?
      trade.values[trade.values.length - 1] :
      trade.values
    let priceAverage = trade.priceAverage || 0
    let amountAverage = trade.amountAverage || 0

    priceAverage =
      (priceAverage * amountAverage + valuesSubmited.price * valuesSubmited.amount + valuesSubmited.fee) / (amountAverage + valuesSubmited.amount)

    amountAverage = amountAverage + valuesSubmited.amount

    return {
      priceAverage,
      amountAverage
    }
  }

  getTradeIndex(name) {
    return this.state.trades.findIndex(trade => trade.name === name)
  }

  render() {
    let trades = this.state.trades

    return (
      <div className="App">
        <div className="l-hero">
          <h1 className="l-hero__title">Trade Calculator</h1>

          <TradeForm onFormSubmit={this.handleFormSubmit}></TradeForm>
        </div>

        <div className="l-trade-list">
          {trades && trades.map(trade =>
            <TradeItem trade={trade} key={trade.name}></TradeItem>
          )}
        </div>
      </div>
    )
  }
}

export default TradeCalculator;
