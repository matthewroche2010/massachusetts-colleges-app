import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {DataFilterControls} from "../src/components/dataFilterControls";

let container;
let onChange;
beforeEach(() => {
  container = document.createElement('div');
  onChange = jest.fn();
});

const render = ({...props}) => {
  ReactDOM.render(<DataFilterControls {...props}/>, container);
}

describe('DataFilterControls compoenent', ()=> {

  it('renders with correct label', () => {
    render({});
    const label = container.querySelector('label');
    expect(label.textContent).toEqual('Search');
  });

  it('renders with provided label', () => {
    const labelText = 'Filter Data'
    render({label: labelText});
    const label = container.querySelector('label');
    expect(label.textContent).toEqual(labelText);
  });

  it('renders with an input of type text', () => {
    render({value: 'test', label: 'label'});
    expect(
      container.querySelector('input[type=text]')
    ).not.toBeNull();
  });

  it('loads filter text input with correct value', () => {
    const filterValue = 'Boston';
    render({value: filterValue});
    expect(
      container.querySelector('input[type=text]').value
    ).toEqual(filterValue);
  });

  it('calls onChange function with input value when changed', () => {
    const value = 'test filter text';
    render({onChange});
    const input = container.querySelector('input[type=text]');
    input.value = value;
    ReactTestUtils.Simulate.change(input);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('loads with a reset button', () => {
    render({onChange});
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
  });

  it('calls onChange function when reset is clicked', () => {
    render({onChange});
    const input = container.querySelector('input[type=text]');
    input.value = 'temp value';
    ReactTestUtils.Simulate.change(input);
    const button = container.querySelector('button');
    ReactTestUtils.Simulate.click(button);
    expect(onChange).toHaveBeenCalledWith('');
  });

});

