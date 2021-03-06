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
    this.calculatePurchase = this.calculatePurchase.bind(this)
    this.calculateSale = this.calculateSale.bind(this)
    this.getTradeIndex = this.getTradeIndex.bind(this)
    this.isPurchaseTrade = this.isPurchaseTrade.bind(this)
  }

  handleFormSubmit(tradeSubmited) {
    const trades = this.state.trades
    const tradeIndex = this.getTradeIndex(tradeSubmited.name)

    if (!trades.length || tradeIndex === -1) {
      const { priceAverage, amountAverage } = this.calculatePurchase(tradeSubmited.values)

      trades.push({
        name: tradeSubmited.name,
        values: [tradeSubmited.values],
        result: 0,
        accumulatedLoss: 0,
        taxation: 0,
        priceAverage,
        amountAverage
      })
    }
    else {
      const currentTrade = trades[tradeIndex]

      if (this.isPurchaseTrade(tradeSubmited.values.type)) {
        const calculatedResult = this.calculatePurchase(tradeSubmited.values, currentTrade)

        Object.keys(calculatedResult)
          .forEach(key => currentTrade[key] = calculatedResult[key])
      } else {
        const calculatedResult = this.calculateSale(tradeSubmited.values, currentTrade)

        Object.keys(calculatedResult)
          .forEach(key => currentTrade[key] = calculatedResult[key])
      }

      currentTrade.values.push(tradeSubmited.values)
    }

    this.setState({
      trades: trades
    })
  }

  calculatePurchase(valuesSubmited, trade = {}) {
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

  calculateSale(valuesSubmited, trade = {}) {
    let result = 0, taxation = 0
    let accumulatedLoss = trade.accumulatedLoss || 0
    let priceAverage = trade.priceAverage || 0
    let amountAverage = trade.amountAverage || 0

    result = (valuesSubmited.price - priceAverage) * valuesSubmited.amount - valuesSubmited.fee

    amountAverage = amountAverage - valuesSubmited.amount

    if (result < 0) {
      accumulatedLoss = accumulatedLoss + result
    }
    else {
      taxation = (result - Math.abs(Math.min(result, accumulatedLoss))) * 0.15
      accumulatedLoss = accumulatedLoss - Math.min(result, accumulatedLoss)
    }

    return {
      result,
      taxation,
      accumulatedLoss,
      amountAverage
    }
  }

  getTradeIndex(name) {
    return this.state.trades.findIndex(trade => trade.name === name)
  }

  isPurchaseTrade(type) {
    return type === 'purchase'
  }

  render() {
    let trades = this.state.trades

    return (
      <div>
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
