import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Title } from '../title';

describe('Title component', () => {
	test('Close Button', () => {
		const changeFormState = vi.fn();
		render(<Title props={{ changeFormState, formName: 'create' }} />);

		const closeB = screen.getByRole('button', { name: 'x' });
		fireEvent.click(closeB);

		expect(changeFormState).toHaveBeenCalledWith('create');
	});
});
