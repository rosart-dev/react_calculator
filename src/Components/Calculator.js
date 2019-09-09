import React from 'react';
import {
  Button,
  Table,
  Input,
  Label
} from 'reactstrap';

import {
  evaluate
} from 'mathjs';


const operators = ["+", "-", "*", "/"];

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression : ''
    }
  }

  handleChange = event => {
      if(this.state.expression === '0') {
        this.setState({
          expression: event.target.value
        })
      } else {
        this.setState({
          expression: this.state.expression + event.target.value
        });
      }
  };


  doesExpressionIncludesOperator = () => {
    let doesIncludesOp = false;
    operators.forEach( op => {
      if(this.state.expression.indexOf(op) !== -1){
        doesIncludesOp = true;
      }
    })
    return doesIncludesOp;
  }

  getIndexOfLastOperator = () => {
    let expression = this.state.expression;
    let arrayOfIndexes = [];
    operators.forEach(op => {
      let idx = expression.lastIndexOf(op);
      arrayOfIndexes.push(idx);
    });

    arrayOfIndexes = arrayOfIndexes.sort();
    return arrayOfIndexes[arrayOfIndexes.length-1];
  }

  getLastNumber = () => {
    let expression = this.state.expression;
    if(this.doesExpressionIncludesOperator()) {
      let idxOfLastOp = this.getIndexOfLastOperator();
      return expression.substring(idxOfLastOp);
    } else {
      return expression.substring(0);
    }
  };

  handleDecimal = () => {
    let lastNumber = this.getLastNumber();
    if(!lastNumber.includes('.')){
      this.setState({
        expression: this.state.expression + '.'
      });
    } else {
      this.setState({
        expression: this.state.expression
      })
    }
  }

  handleDisplayChange = () => {
    //do nothing - as of now this is on purpose 
  }

  handleClear = () => {
    this.setState({
      expression: '0'
    });
  };

  handleOperator = event => {
    let operator = event.target.value;
    let expression = this.state.expression;
    let lastCharOfExp = expression.charAt(expression.length-1);
    if(operators.includes(lastCharOfExp)) {
      //replace the old operator with the new one 
      let newExpression = expression.substring(0, expression.length - 1);
      this.setState({
          expression: newExpression + operator
      });
    } else {
      //append the operator at the end
      this.setState({
        expression: this.state.expression + operator   }); 
    }
    
  };


  checkForNumberOfDigitsAfterDecimal = value => {
    return (value.toString().split('.')[1] || []).length;
  }

  handleEqual = () => {
    let expression = this.state.expression;
    let value = evaluate(expression);
    if(isNaN(value)){
      value = '0' //to avoid calculator crashing 
    }
    if(this.checkForNumberOfDigitsAfterDecimal(value) > 4){
     value = value.toFixed(4);
    }
    this.setState({
      expression: value.toString()
    });
  }

  
  render() {
    return (
      <div className="Calculator" id="flex-container">
          <Table dark>
            <tbody>
            <tr>
                <td colSpan="12">
                  <Label for="display">
                    <Input type="text" name="display" id="display" bsSize="lg"
                      value={this.state.expression} onChange={this.handleDisplayChange}/>
                  </Label>
                </td>
              </tr>
              <tr>
                <td colSpan="3"><Button color="danger" type="button" value="clear" id="clear"
                 onClick={this.handleClear} block>Clear</Button></td>
                <td><Button color="warning" type="button" value="*" id="multiply" onClick={this.handleOperator} block>*</Button></td>
              </tr>
              <tr>
                <td><Button type="button" value="7" id="seven" onClick={this.handleChange} block>7</Button></td>
                <td><Button type="button" value="8" id="eight" onClick={this.handleChange} block>8</Button></td>
                <td><Button type="button" value="9" id="nine" onClick={this.handleChange} block>9</Button></td>
                <td><Button color="warning" type="button" value="/" id="divide" onClick={this.handleOperator} block>/</Button></td>
              </tr>
              <tr>
                <td><Button type="button" value="4" id="four" onClick={this.handleChange} block>4</Button></td>
                <td><Button type="button" value="5" id="five" onClick={this.handleChange} block>5</Button></td>
                <td><Button type="button" value="6" id="six" onClick={this.handleChange} block>6</Button></td>
                <td><Button color="warning" type="button" value="+" id="add" onClick={this.handleOperator} block>+</Button></td>  
              </tr>
              <tr>
                <td><Button type="button" value="1" id="one" onClick={this.handleChange} block>1</Button></td>
                <td><Button type="button" value="2" id="two" onClick={this.handleChange} block>2</Button></td>
                <td><Button type="button" value="3" id="three" onClick={this.handleChange} block>3</Button></td>
                <td><Button color="warning" type="button" value="-" id="subtract" onClick={this.handleOperator} block>-</Button></td>
              </tr>
              <tr>
                <td colSpan="2"><Button type="button" value="0" id="zero" onClick={this.handleChange} block>0</Button></td>
                <td><Button type="button" id="decimal" value="." onClick={this.handleDecimal} block>.</Button></td>
                <td><Button color="primary" id="equals" value="=" onClick={this.handleEqual} block>=</Button></td>
              </tr>
            </tbody>
          </Table>
      </div>
    );
  }
}