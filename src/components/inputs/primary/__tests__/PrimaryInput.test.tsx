import { render, fireEvent } from '@testing-library/react';
import PrimaryInput from '../PrimaryInput';

it('renders without crashing', () => {
    const { getByTestId } = render(<PrimaryInput value="" />);
    const input = getByTestId('primary-input');
    
    expect(input).toBeTruthy();
});

describe('input changes value', () => {
    it('onChange', () => {
        const { getByTestId } = render(<PrimaryInput value="testValue" />);
        const input = (getByTestId('primary-input') as HTMLInputElement);
        
        expect(input.value).toBe('testValue');
    });
});

it('shows error message', () => {
    const { getByText } = render(<PrimaryInput value="testValue" errorMessage="Input is invalid" />);
    const errorMessage = (getByText('Input is invalid') as HTMLInputElement);

    expect(errorMessage).toBeTruthy();
});

it('shows button to copy input', () => {
    const { getByText } = render(<PrimaryInput value="testValue" isTextCopyable={true} />);
    const copyButton = getByText('kopiuj do schowka');

    expect(copyButton).toBeTruthy();
})