import React from 'react';
import ReactDOM from 'react-dom';
import PrimaryButton from '../PrimaryButton';

import { fireEvent, render } from '@testing-library/react';
// import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<PrimaryButton title="click" onClick={() => {}} />, div);
});

it('renders button correctly', () => {
    const { getByTestId } = render(<PrimaryButton title="click" onClick={() => {}} />);

    expect(getByTestId('primary-button')).toHaveTextContent('click');
});

// it('matches snapshop', () => {
//     const tree = renderer.create(<PrimaryButton title="click" onClick={() => {}}></PrimaryButton>).toJSON();
//     expect(tree).toMatchSnapshot();
// });

describe('click button', () => {
    it('onClick', () => {
        let result: number;

        const multiple = (a: number, b: number) => {
            result =  a*b;
        }

        const { getByTestId } = render(<PrimaryButton title="click" onClick={() => multiple(3, 4)} />);
        const button = getByTestId('primary-button');

        fireEvent.click(button);

        expect(result).toBe(12);
    });
});