import React from 'react';
import { render, fireEvent, waitForElement, cleanup } from 'react-testing-library';
import App from './App';

const response = {
  text: () => '<!DOCTYPE html><html><head><title>Test App</title></head><body></body></html>'
};

const responseWithLink = {
  text: () =>
    '<!DOCTYPE html><html><head><title>Test App</title></head><body><a href="http://wipro.com/about">About us</a></body></html>'
};

const error = {
  message: 'Failed to fetch'
};

afterEach(cleanup);

it('should show downloaded message on fetch', async () => {
  const { container, getByText } = render(<App />);

  global.fetch = jest.fn().mockImplementation(() => Promise.resolve(responseWithLink));
  await fireEvent.click(getByText('Submit'));

  const statusEl = await waitForElement(() => container.querySelector('p'));

  await expect(statusEl.textContent).toBe('Downloaded');
});

it('should show error message on fetch', async () => {
  const { container, getByText } = render(<App />);

  global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
  await fireEvent.click(getByText('Submit'));

  const statusEl = await waitForElement(() => container.querySelector('p'));

  await expect(statusEl.textContent).toBe(error.message);
});

it('should show nothing to crawl message if no link found', async () => {
  const { container, getByText } = render(<App />);

  global.fetch = jest.fn().mockImplementation(() => Promise.resolve(response));
  await fireEvent.click(getByText('Submit'));

  const statusEl = await waitForElement(() => container.querySelector('p'));

  await expect(statusEl.textContent).toBe('Nothing to crawl');
});

