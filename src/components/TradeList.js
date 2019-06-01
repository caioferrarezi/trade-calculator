import React, { Component } from 'react'
import TradeItem from './TradeItem'
import deepEqual from 'deep-equal'

class TradeList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trades: []
    }

    this.bind()
  }

  bind() {
    this.hasSpecicTrade = this.hasSpecicTrade.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.tradeSubmited, prevProps.tradeSubmited)) {
      let trades = this.state.trades
      let tradeIndex = this.hasSpecicTrade(this.props.tradeSubmited.name)

      if (!trades.length || tradeIndex === -1)
        trades.push({
          name: this.props.tradeSubmited.name,
          values: [this.props.tradeSubmited.values]
        })
      else
        trades[tradeIndex].values.push(this.props.tradeSubmited.values)

      this.setState({
        trades: trades
      })
    }
  }

  hasSpecicTrade(name) {
    return this.state.trades.findIndex(trade => trade.name === name)
  }

  render() {
    let trades = this.state.trades

    return(
      <div className="c-trade-list">
        {trades && trades.map(trade =>
          <TradeItem trade={trade} key={trade.name}></TradeItem>
        )}
      </div>
    )
  }
}

export default TradeList
