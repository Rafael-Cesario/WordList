import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Title } from '../title';

describe('Title', () => {
	it('Close the form', () => {
		const changeFormState = vi.fn();
		const formName = 'create';
		const title = 'Criar conta';

		render(<Title props={{ changeFormState, formName, title }} />);

		act(() => {
			fireEvent.click(screen.getByRole('close-form'));
		});

		expect(changeFormState).toHaveBeenCalledWith('create');
	});
});
