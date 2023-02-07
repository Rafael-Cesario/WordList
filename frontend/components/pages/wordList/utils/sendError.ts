export const sendError = (inputName: string, errorMessage: string) => {
	const div = document.querySelector('.' + inputName) as HTMLDivElement;
	const label = div.childNodes[0] as HTMLLabelElement;
	const labelText = label.textContent;

	label.classList.toggle('error');
	label.textContent = errorMessage;

	setTimeout(() => {
		label.classList.toggle('error');
		label.textContent = labelText;
	}, 5000);
};
