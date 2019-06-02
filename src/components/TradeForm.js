import React, { Component } from 'react'
import './TradeForm.css'

function generateId() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

class TradeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'purchase',
      name: '',
      price: '',
      amount: '',
      fee: ''
    }

    this.bind()
  }

  bind() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    let id = generateId()

    this.props.onFormSubmit({
      name: this.state.name.toLowerCase(),
      values: {
        id: id,
        createdAt: Date.now(),
        type: this.state.type,
        price: parseFloat(this.state.price),
        amount: parseFloat(this.state.amount),
        fee: parseFloat(this.state.fee)
      }
    })
  }

  handleInputChange(event) {
    const target = event.target

    this.setState({
      [target.id]: target.value
    })
  }

  render() {
    return(
      <form className="c-trade-form" onSubmit={this.handleSubmit}>
        <div className="c-trade-form__wrapper">
          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="name">Name:</label>
            <input className="c-trade-form__input -name" type="text" id="name" value={this.state.name} onChange={this.handleInputChange} />
          </div>

          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="type">Type:</label>
            <div className="c-trade-form__select-wrapper">
              <select className="c-trade-form__select" id="type" value={this.state.type} onChange={this.handleInputChange}>
                <option value="purchase">Purchase</option>
                <option value="sale">Sale</option>
              </select>
            </div>
          </div>

          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="price">Price:</label>
            <input className="c-trade-form__input" type="text" id="price" value={this.state.price} onChange={this.handleInputChange} />
          </div>

          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="amount">Amount:</label>
            <input className="c-trade-form__input" type="text" id="amount" value={this.state.amount} onChange={this.handleInputChange} />
          </div>

          <div className="c-trade-form__field">
            <label className="c-trade-form__label" htmlFor="fee">Fee:</label>
            <input className="c-trade-form__input" type="text" id="fee" value={this.state.fee} onChange={this.handleInputChange} />
          </div>

          <div className="c-trade-form__button-wrapper">
            <button type="submit" className="c-trade-form__button">Calculate</button>
          </div>
        </div>
      </form>
    );
  }
}

export default TradeForm
