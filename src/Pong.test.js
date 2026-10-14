import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Pong from './Pong';

let ctx;

beforeEach(() => {
  jest.useFakeTimers();
  ctx = {
    fillRect: jest.fn(),
    fillText: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    fillStyle: '',
  };
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx);
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

test('renders, runs frames, and cleans up the loop and mouse listeners', () => {
  let view;
  expect(() => { view = render(<Pong />); }).not.toThrow();
  const canvas = view.container.querySelector('#gameCanvas');
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveAttribute('width', '800');
  expect(canvas).toHaveAttribute('height', '600');
  const removeListener = jest.spyOn(canvas, 'removeEventListener');
  canvas.getBoundingClientRect = () => ({ left: 0, top: 10, width: 400, height: 300 });
  fireEvent.mouseMove(canvas, { clientY: 110 });
  expect(() => act(() => jest.advanceTimersByTime(100))).not.toThrow();
  expect(ctx.fillRect).toHaveBeenCalledWith(0, 150, 10, 100);
  expect(ctx.arc).toHaveBeenCalled();
  expect(() => view.unmount()).not.toThrow();
  expect(removeListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
  expect(removeListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
  expect(jest.getTimerCount()).toBe(0);
  ctx.fillRect.mockClear();
  act(() => jest.advanceTimersByTime(100));
  expect(ctx.fillRect).not.toHaveBeenCalled();
});

test('skips the loop when a drawing context is unavailable', () => {
  HTMLCanvasElement.prototype.getContext.mockReturnValue(null);
  const view = render(<Pong />);
  expect(view.container.querySelector('#gameCanvas')).toBeInTheDocument();
  expect(jest.getTimerCount()).toBe(0);
  expect(() => view.unmount()).not.toThrow();
});
