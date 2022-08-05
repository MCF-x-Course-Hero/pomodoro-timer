import * as React from "react";
import { render } from '@testing-library/react';
import AppContainer from "../Components/App/App";

describe('App', () => {
  test('renders App Container component', () => {
    render(<AppContainer />);
    screen.debug();
  })
})