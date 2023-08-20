import React, { Component } from "react";
import './Calculator.css';
import Button from "../components/Button";
import Display from "../components/Display";

export default class Calculator extends Component {

    state = {
        displayValue: "",
        resultDisplayValue: ""
    }

    clear() {
        const displayValue = "";
        const resultDisplayValue = "";
        this.setState({ displayValue, resultDisplayValue });
    }

    equal() {
        if(this.state.resultDisplayValue === ""){
            return
        }
        const displayValue = this.state.resultDisplayValue;
        const resultDisplayValue = "";
        this.setState({ displayValue, resultDisplayValue})
    }

    evaluateExpression(expression) {
        expression = expression.replace(/x/g, '*')
        try {
            return String(eval(expression));
          } catch (error) {
            return ""; // Retorna uma string vazia em caso de erro
          }
    }

    getLastNumber(expression) {
        const result = expression.split(/[-+x/]/).reduce((accumulator, currentValue) => currentValue, "");
        return result;
    }

    isOperator(char) {
        const operators = new Set(['+', '-', '*', '/']);
        return operators.has(char);
    }

    containsOperator(inputString) {
        const operatorPattern = /[+\-x/]/;
        return operatorPattern.test(inputString);
    }

    addDigit(n) {
        // um numero não pode começar com operadores
        if(this.isOperator(n) && this.getLastNumber(this.state.displayValue).length === 0)
            return
        // um numero so pode ter um .
        if(n === "." && this.getLastNumber(this.state.displayValue).includes(".")) 
            return
        // um numero nao pode iniciar com uma sequencia de zeros
        if(n === "0" && this.getLastNumber(this.state.displayValue) === "0")
            return
        // add digit
        const displayValue = this.state.displayValue + n;
        var resultDisplayValue = "";
        if(this.containsOperator(displayValue))
            resultDisplayValue = this.evaluateExpression(displayValue);
        this.setState({ displayValue, resultDisplayValue });
    }

    render() {
        const addDigit = n => this.addDigit(n)

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} resultValue={this.state.resultDisplayValue}/>
                <Button label="C" click={() => this.clear()} clear/>
                <Button label="()" operation/>
                <Button label="%" click={addDigit} operation/>
                <Button label="/" click={addDigit} operation/>
                <Button label="7" click={addDigit}/>
                <Button label="8" click={addDigit}/>
                <Button label="9" click={addDigit}/>
                <Button label="x" click={addDigit} operation/>
                <Button label="4" click={addDigit}/>
                <Button label="5" click={addDigit}/>
                <Button label="6" click={addDigit}/>
                <Button label="-" click={addDigit} operation/>
                <Button label="1" click={addDigit}/>
                <Button label="2" click={addDigit}/>
                <Button label="3" click={addDigit}/>
                <Button label="+" click={addDigit} operation/>
                <Button label="+/-" />
                <Button label="0" click={addDigit}/>
                <Button label="." click={addDigit}/>
                <Button label="=" click={() => this.equal()} equal/>
            </div>
        )
    }
}