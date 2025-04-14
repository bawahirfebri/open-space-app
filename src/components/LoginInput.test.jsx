import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import LoginInput from './LoginInput';
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle username typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Username');

    await userEvent.type(usernameInput, 'usernametest');

    expect(usernameInput).toHaveValue('usernametest');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'usernamepassword');

    expect(passwordInput).toHaveValue('usernamepassword');
  });

  it('should call login function when login button is cliecked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const usernameInput = await screen.getByPlaceholderText('Username');
    await userEvent.type(usernameInput, 'usernametest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({ id: 'usernametest', password: 'passwordtest' });
  });
});