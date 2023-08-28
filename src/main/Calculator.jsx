import React, { Component } from "react";
import './Calculator.css';
import Button from "../components/Button";
import Display from "../components/Display";
import Toolbar from "../components/Toolbar";

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
            return;
        const displayValue = this.state.resultDisplayValue;
        const resultDisplayValue = "";
        this.setState({ displayValue, resultDisplayValue});
    }

    backSpace() {
        const displayValue = this.state.displayValue.slice(0, -1);
        var resultDisplayValue = ""
        if(this.containsOperator(displayValue))
            resultDisplayValue = this.evaluateExpression(displayValue);
        this.setState({ displayValue, resultDisplayValue });
    }

    evaluateExpression(expression) {
        // x === * % === /100 para evaluacao
        expression = expression.replace(/[x%]/g, function(match) {
            if (match === 'x')
                return '*';
            else if (match === '%') 
                return '/100';
          });
        // caso o usuario nao tenha fechado ainda os parenteses, feche automaticamente eles para fazer a evaluacao
        for (let i = this.state.displayOpenParentheses; i !== 0; i--)
            expression += ')';
        try {
            return String(eval(expression));
          } catch (error) {
            return ""; // erro signfica que a expressao nao esta com sintaxe correta, logo nao precisa de resultado
          }
    }

    getLastCharOnDisplay(){
        return this.state.displayValue.charAt(this.state.displayValue.length - 1);
    }

    getLastNumber() {
        const expression = this.state.displayValue
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

    addPercentage() {
        if(this.getLastNumber().length === 0 || this.getLastCharOnDisplay() === '(' || this.getLastCharOnDisplay() === '%') 
            return;
        const displayValue = this.state.displayValue + '%';
        const resultDisplayValue = this.evaluateExpression(displayValue);
        this.setState({ displayValue, resultDisplayValue });
    }

    addParentheses() {
        var displayValue = this.state.displayValue;
        var displayOpenParentheses = this.state.displayOpenParentheses;
        // se o ultimo caracter for um operador, parentese sendo aberto, ou o display esteja vazio, abre parentese sempre
        if (this.isOperator(this.getLastCharOnDisplay()) || displayValue.length === 0 || this.getLastCharOnDisplay() === '(') {
            displayValue += '(';
            displayOpenParentheses++;
            return this.setState({ displayValue, displayOpenParentheses });
        }
        // se o ultimo digito nao e um operador, feche o parentese caso tenha algum aberto
        if(this.state.displayOpenParentheses > 0) {
            displayValue += ")";
            displayOpenParentheses--;
            return this.setState({ displayValue, displayOpenParentheses })
        }
        // se nao houver parentese pra fechar, adiciona automaticamente uma multiplicação e abre parentese
        displayValue += "x(";
        displayOpenParentheses++;
        this.setState({ displayValue, displayOpenParentheses });
    }

    addOperator(n) {
        if(this.getLastNumber().length === 0)
            return;
        if((n === "x" || n === "/") && this.getLastCharOnDisplay() === "(")
            return;
        const displayValue = this.state.displayValue + n;
        const resultDisplayValue = "";
        this.setState({ displayValue, resultDisplayValue });
    }

    addDigit(n) {
        // um numero so pode ter um .
        if(n === "."){
            if(this.getLastNumber().includes("."))
                return;
            if(this.getLastNumber().length === 0)
                n = "0.";
        }
        // um numero nao pode iniciar com uma sequencia de zeros
        if(n === "0" && this.getLastNumber() === "0")
            return;
        // insere automaticamente uma multiplicao se um digito for colocado apos ) ou %
        if(this.getLastCharOnDisplay() === ")" || this.getLastCharOnDisplay() === "%")
            n = "x" + n;

        // add digit
        const displayValue = this.state.displayValue + n;
        var resultDisplayValue = "";
        if(this.containsOperator(displayValue))
            resultDisplayValue = this.evaluateExpression(displayValue);
        this.setState({ displayValue, resultDisplayValue });
    }

    render() {
        const addDigit = n => this.addDigit(n);
        const addOperator = n => this.addOperator(n);
        const addParentheses = () => this.addParentheses();
        const addPercentage = () => this.addPercentage();
        const clear = () => this.clear();
        const equal = () => this.equal();
        const backSpace = () => this.backSpace();

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} resultValue={this.state.resultDisplayValue}/>
                <Toolbar backSpaceClick={backSpace}/>
                <Button label="C" click={clear} clear/>
                <Button label="()" click={addParentheses} operation/>
                <Button label="%" click={addPercentage} operation/>
                <Button label="/" click={addOperator} operation/>
                <Button label="7" click={addDigit}/>
                <Button label="8" click={addDigit}/>
                <Button label="9" click={addDigit}/>
                <Button label="x" click={addOperator} operation/>
                <Button label="4" click={addDigit}/>
                <Button label="5" click={addDigit}/>
                <Button label="6" click={addDigit}/>
                <Button label="-" click={addOperator} operation/>
                <Button label="1" click={addDigit}/>
                <Button label="2" click={addDigit}/>
                <Button label="3" click={addDigit}/>
                <Button label="+" click={addOperator} operation/>
                <Button label="+/-" />
                <Button label="0" click={addDigit}/>
                <Button label="." click={addDigit}/>
                <Button label="=" click={equal} equal/>
            </div>
        )
    }
}
