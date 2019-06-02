import React, { Component } from 'react'
import './TradeItem.css'

class TradeItem extends Component {
  constructor(props) {
    super(props)

    this.bind()
  }

  bind() {
    this.formatCurrency = this.formatCurrency.bind(this)
  }

  formatCurrency(value) {
    return value > 0 ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 0
  }

  render() {
    let trade = this.props.trade

    return(
      <div className="c-trade-item">
        <h2 className="c-trade-item__title">
          Share name: {this.props.trade.name}
        </h2>

        <ul className="c-trade-item__list">
          <div className="c-trade-item__value -header">
            <span className="c-trade-item__value__item">Type</span>
            <span className="c-trade-item__value__item">Price</span>
            <span className="c-trade-item__value__item">Amount</span>
            <span className="c-trade-item__value__item">Fee</span>
          </div>
          {trade && trade.values.map(value =>
            <li className="c-trade-item__value" key={value.id}>
              <span className="c-trade-item__value__item">{value.type}</span>
              <span className="c-trade-item__value__item">{this.formatCurrency(value.price)}</span>
              <span className="c-trade-item__value__item">{value.amount}</span>
              <span className="c-trade-item__value__item">{this.formatCurrency(value.fee)}</span>
            </li>
          )}
        </ul>

        <div className="c-trade-item__summary">
          <span className="c-trade-item__summary__item">
            <strong>Price average:</strong> {this.formatCurrency(trade.priceAverage)}
          </span>
          <span className="c-trade-item__summary__item">
            <strong>Amount average:</strong> {trade.amountAverage}
          </span>
          <span className="c-trade-item__summary__item">
            <strong>Accumulated loss:</strong> {this.formatCurrency(trade.accumulatedLoss)}
          </span>
          <span className="c-trade-item__summary__item">
            <strong>Income tax:</strong> {this.formatCurrency(trade.taxation)}
          </span>
        </div>
      </div>
    )
  }
}

export default TradeItem
