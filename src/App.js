import React, { Component } from 'react';
import './App.css';

class Calulator extends Component {
  state = {
    displayValue: "0",
    waitingNumber: false,
    operator: null,
    keepNumber: undefined
  };

  inputNumber(number) {
    const { displayValue, waitingNumber, keepNumber } = this.state;
    if (waitingNumber) {
      this.setState({
        keepNumber: keepNumber === undefined ? parseFloat(displayValue) : this.doOperation(),
        displayValue: String(number), 
        waitingNumber: false
      });
    } else {
      this.setState({
        displayValue: displayValue === "0" ? String(number) : displayValue + String(number)
      });
    }
  }

  changeSign() {
    const { displayValue } = this.state;
    this.setState({
      displayValue: displayValue === '0' ? displayValue :
                    displayValue.charAt(0) === '-' ? displayValue.substr(1) :
                    '-' + displayValue
    });
  }

  calculPercent() {
    const { displayValue } = this.state;
    this.setState({
      displayValue: String(displayValue / 100)
    });
  }

  clearResults() {
    this.setState({
      displayValue: "0"
    })
  }

  doOperation() {
    const { operator, keepNumber, displayValue } = this.state;
    let result = undefined;
    switch(operator) {
        case '/':
            result = parseFloat(keepNumber) / parseFloat(displayValue);
            break;
        case 'x':
            result = parseFloat(keepNumber) * parseFloat(displayValue);
            break;
        case '+':
            result = parseFloat(keepNumber) + parseFloat(displayValue);
            break;
        default:
            result = parseFloat(keepNumber) - parseFloat(displayValue);
            break;
    }
    return result;
  }

  setOperation(operator) {
    this.setState({
      waitingNumber: true,
      operator: operator
    });
  }

  deleteLast() {
    const { displayValue } = this.state;
    const len = String(displayValue).length;
    this.setState({
      displayValue: len === 1 || len === 0 ? "0" : String(displayValue).substr(0, len - 1)
    })
  }

  addDot() {
    const { displayValue, waitingNumber } = this.state;
    if (waitingNumber) {
      this.setState({
        displayValue: '0.',
        waitingNumber: false
      })
    } else {
      this.setState({ 
        displayValue: displayValue.includes('.') ? displayValue : displayValue + '.',
        waitingNumber: false
      });
    }
  }

  performEqual() {
    const { keepNumber, displayValue } = this.state;
    this.setState({
      displayValue: keepNumber === undefined ? displayValue : String(keepNumber)
    })
  }

  render() {
    const { displayValue } = this.state;
    return (
      <div className="calculator">
        <div className="calculator-results">
          <span className="result-value">{displayValue}</span>
        </div>
        <div className="container-keys clearfix">
          <div className="more-keys">
            <button className="calculator-key key-percent" onClick={() => this.calculPercent()}>%</button>
            <button className="calculator-key key-sign" onClick={() => this.changeSign()}>±</button>
            <button className="calculator-key key-clear" onClick={() => this.clearResults()}>AC</button>
            <button className="calculator-key key-del" onClick={() => this.deleteLast()}>DEL</button>
          </div>
          <div className="key-numbers">
            <button className="calculator-key key-9" onClick={() => this.inputNumber(9)}>9</button>
            <button className="calculator-key key-8" onClick={() => this.inputNumber(8)}>8</button>
            <button className="calculator-key key-7" onClick={() => this.inputNumber(7)}>7</button>
            <button className="calculator-key key-6" onClick={() => this.inputNumber(6)}>6</button>
            <button className="calculator-key key-5" onClick={() => this.inputNumber(5)}>5</button>
            <button className="calculator-key key-4" onClick={() => this.inputNumber(4)}>4</button>
            <button className="calculator-key key-3" onClick={() => this.inputNumber(3)}>3</button>
            <button className="calculator-key key-2" onClick={() => this.inputNumber(2)}>2</button>
            <button className="calculator-key key-1" onClick={() => this.inputNumber(1)}>1</button>
            <button className="calculator-key key-dot" onClick={() => this.addDot()}>,</button>
            <button className="calculator-key key-0" onClick={() => this.inputNumber(0)}>0</button>
            <button className="calculator-key key-equal" onClick={() => this.performEqual()}>=</button>
          </div>
          <div className="key-options">
            <button className="calculator-key key-div" onClick={() => this.setOperation('/')}>/</button>
            <button className="calculator-key key-mul" onClick={() => this.setOperation('x')}>x</button>
            <button className="calculator-key key-minus" onClick={() => this.setOperation('-')}>-</button>
            <button className="calculator-key key-plus" onClick={() => this.setOperation('+')}>+</button>
          </div>
        </div> 
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Calulator/>
        </div>
      </div>
    );
  }
}

export default App;
