import * as React from "react";
import { render } from '@testing-library/react';
import LoginForm from "../Components/LoginForm/LoginForm";

describe('LoginForm', () => {
  test('renders LoginForm component', () => {
    render(<LoginForm />);
    screen.debug();
  })
})