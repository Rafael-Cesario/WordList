class Validations {
	email(email: string) {
		if (!email) return 'email: Este campo não pode ficar vazio';
		if (!email.includes('@')) return 'email: @ não encontrado.';

		const [user, domain] = email.split('@');
		if (!user || !domain) return 'email: Email invalido, usuario ou dominio não preenchido.';
	}

	name(name: string) {
		if (!name) return 'name: Este campo não pode ficar vazio';
		if (name.length > 20) return 'name: Seu nome é muito longo';
	}

	password(password: string) {
		if (!password) return 'password: Este campo não pode ficar vazio';
		if (!password.match(/[A-Z]/)) return 'password: Ao menos uma letra maiuscula deve existir';
		if (!password.match(/[a-z]/)) return 'password: Ao menos uma letra minuscula deve existir';
		if (password.length < 10) return 'password: Sua senha deve conter ao menos 10 letras';
	}

	confirmPassword(password: string, confirmPassword: string) {
		if (!confirmPassword) return 'confirmPassword: Este campo não pode ficar vazio';
		if (confirmPassword !== password) return 'confirmPassword: Suas senhas devem ser iguais';
	}

	emptyFields(fields: { [key: string]: string | undefined }) {
		const empties: { [key: string]: string } = {};
		const entries = Object.entries(fields);

		entries.forEach(([key, value]) => {
			if (!value) empties[key] = 'Este campo não pode ficar vazio';
		});

		return empties;
	}
}

export const validations = new Validations();
