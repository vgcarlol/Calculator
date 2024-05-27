import './Calculator.css'; // Importa el archivo CSS aquí


import React, { useState, useEffect } from 'react';
import Button from './Button';
import Display from './Display';




const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
      const handleKeyDown = (event) => {
          const key = event.key;
          if (!isNaN(key) || ['+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape'].includes(key)) {
              handleClick(key === 'Enter' ? '=' : key);
          }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
  }, [input]);

  const handleClick = (value) => {
      if (input.length >= 9 && !['=', 'C', 'Backspace'].includes(value)) {
          return;
      }

      if (value === '=') {
          try {
              const evalResult = eval(input);

              if (evalResult < 0 || evalResult > 999999999) {
                  setResult('ERROR');
              } else {
                  setResult(evalResult.toString().slice(0, 9));
              }
          } catch {
              setResult('ERROR');
          }
      } else if (value === 'C') {
          setInput('');
          setResult('');
      } else if (value === '.') {
          if (!input.includes('.')) {
              setInput(input + value);
          }
      } else if (value === 'Backspace') {
          setInput(input.slice(0, -1));
      } else {
          setInput(input + value);
      }
  };

  return (
      <div className="calculator">
          <Display input={input} result={result} />
          <div className="buttons">
              {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((button, index) => (
                  <Button key={index} className="button" onClick={() => handleClick(button)}>
                      {button}
                  </Button>
              ))}
          </div>
      </div>
  );
};

export default Calculator;