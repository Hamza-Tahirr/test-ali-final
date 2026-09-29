import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from './Chat';

test('adds a typed message to the chat', () => {
  render(<Chat selectedText="" />);
  fireEvent.change(screen.getByPlaceholderText(/type your message/i), {
    target: { value: 'Hello there' },
  });
  fireEvent.click(screen.getByText('Send'));
  expect(screen.getByText('Hello there')).toBeInTheDocument();
});

test('shows the text selected in the PDF', () => {
  render(<Chat selectedText="Some selected passage" />);
  expect(screen.getByText('Some selected passage')).toBeInTheDocument();
});
