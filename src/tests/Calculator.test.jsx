import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculator from '../components/Calculator';

test('renders calculator buttons', () => {
  const { getByRole } = render(<Calculator />);
  ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', '/', 'C'].forEach(button => {
      expect(getByRole('button', { name: button })).toBeInTheDocument();
  });
});

test('performs addition', () => {
  const { getByRole, getByText } = render(<Calculator />);
  fireEvent.click(getByRole('button', { name: '1' }));
  fireEvent.click(getByRole('button', { name: '+' }));
  fireEvent.click(getByRole('button', { name: '1' }));
  fireEvent.click(getByRole('button', { name: '=' }));
  expect(getByText('2', { selector: '.result' })).toBeInTheDocument();
});

test('performs division', () => {
  const { getByRole, getByText } = render(<Calculator />);
  fireEvent.click(getByRole('button', { name: '8' }));
  fireEvent.click(getByRole('button', { name: '/' }));
  fireEvent.click(getByRole('button', { name: '4' }));
  fireEvent.click(getByRole('button', { name: '=' }));
  expect(getByText('2', { selector: '.result' })).toBeInTheDocument();
});

test('clears input', () => {
  const { getByRole, queryByText } = render(<Calculator />);
  fireEvent.click(getByRole('button', { name: '1' }));
  fireEvent.click(getByRole('button', { name: 'C' }));
  expect(queryByText('1', { selector: '.input' })).not.toBeInTheDocument();
});

test('handles decimal point', () => {
  const { getByRole, getByText } = render(<Calculator />);
  fireEvent.click(getByRole('button', { name: '1' }));
  fireEvent.click(getByRole('button', { name: '.' }));
  fireEvent.click(getByRole('button', { name: '1' }));
  fireEvent.click(getByRole('button', { name: '=' }));
  expect(getByText('1.1', { selector: '.result' })).toBeInTheDocument();
});



test('handles negative numbers', () => {
  const { getByRole, getByText } = render(<Calculator />);
  fireEvent.click(getByRole('button', { name: '2' }));
  fireEvent.click(getByRole('button', { name: '-' }));
  fireEvent.click(getByRole('button', { name: '8' }));
  fireEvent.click(getByRole('button', { name: '=' }));
  expect(getByText('ERROR', { selector: '.result' })).toBeInTheDocument();
});

test('handles keyboard input', () => {
  const { getByRole, getByText } = render(<Calculator />);
  fireEvent.keyDown(window, { key: '2' });
  fireEvent.keyDown(window, { key: '+' });
  fireEvent.keyDown(window, { key: '3' });
  fireEvent.keyDown(window, { key: 'Enter' });
  expect(getByText('5', { selector: '.result' })).toBeInTheDocument();
});
