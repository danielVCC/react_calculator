import React, { Component } from "react";
import './Calculator.css';
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: "",
    resultDisplayValue: "",
    displayOpenParentheses: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    clear() {
        this.setState({ ...initialState });
    }

    equal() {
        if(this.state.resultDisplayValue === "")
            return
        const displayValue = this.state.resultDisplayValue;
        const resultDisplayValue = "";
        this.setState({ displayValue, resultDisplayValue})
    }

    evaluateExpression(expression) {
        expression = expression.replace(/x/g, '*')
        // caso o usuario nao tenha fechado ainda os parenteses, feche automaticamente eles para fazer a evaluacao
        for (let i = this.state.displayOpenParentheses; i != 0; i--)
            expression += ')';
        try {
            return String(eval(expression));
          } catch (error) {
            return ""; // erro signfica que a expressao nao esta com sintaxe correta, logo nao precisa de resultado
          }
    }

    getLastNumber(expression) {
        const result = expression.split(/[-+x/]/).reduce((accumulator, currentValue) => currentValue, "");
        return result;
    }

    isOperator(char) {
        const operators = new Set(['+', '-', '*', '/', 'x']);
        return operators.has(char);
    }

    containsOperator(inputString) {
        const operatorPattern = /[+\-x/]/;
        return operatorPattern.test(inputString);
    }

    addParentheses() {
        const lastCharOnDisplay = this.state.displayValue.charAt(this.state.displayValue.length - 1);
        var displayValue = this.state.displayValue;
        var displayOpenParentheses = this.state.displayOpenParentheses;
        // se o ultimo caracter for um operador, ou o display esteja vazio, abre parentese sempre
        if (this.isOperator(lastCharOnDisplay) || displayValue.length === 0) {
            displayValue += '(';
            displayOpenParentheses++;
            return this.setState({ displayValue, displayOpenParentheses })
        }
        // se o ultimo digito nao e um operador, feche o parentese caso tenha algum aberto
        if(this.state.displayOpenParentheses > 0) {
            displayValue += ")";
            displayOpenParentheses--;
            return this.setState({ displayValue, displayOpenParentheses })
        }
        // se nao houver parentese pra fechar, adicione uma multiplicacao seguida da abertura do parentese
        displayValue += "x(";
        displayOpenParentheses++;
        return this.setState({ displayValue, displayOpenParentheses })
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
        const addParentheses = () => this.addParentheses()
        const clear = () => this.clear()
        const equal = () => this.equal()

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} resultValue={this.state.resultDisplayValue}/>
                <Button label="C" click={clear} clear/>
                <Button label="()" click={addParentheses} operation/>
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
                <Button label="=" click={equal} equal/>
            </div>
        )
    }
}