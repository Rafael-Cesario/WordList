export const sendError = (error: string) => {
	const [fieldName, message] = error.split(': ');

	const input = document.querySelector('#' + fieldName) as HTMLInputElement;
	const label = input.previousSibling as HTMLLabelElement;
	const div = input.parentElement as HTMLDivElement;

	div.classList.add('error');
	label.textContent = message;
};

export const removeError = (inputId: string) => {
	const input = document.querySelector('#' + inputId) as HTMLInputElement;
	const div = input.parentElement as HTMLDivElement;
	const label = input.previousSibling as HTMLLabelElement;

	div.classList.remove('error');
	label.textContent = label.getAttribute('data-name');
};
