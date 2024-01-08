interface IFields {
	email: string;
	name: string;
	password: string;
	passwordCheck: string;
}

class Validations {
	email({ email }: IFields): string {
		if (!email) return "Este campo não pode ficar vazio";

		const [user, domain] = email.split("@");
		if (!user || !domain) return "Email invalido!";

		return "";
	}

	name({ name }: IFields): string {
		if (!name) return "Este campo não pode ficar vazio";
		if (name.length > 30) return "Seu nome é muito grande: Máximo 30 caracteres.";
		if (name.length < 3) return "Seu nome é muito curto: Mínimo 3 caracteres.";
		return "";
	}

	password({ password }: IFields): string {
		if (!password) return "Este campo não pode ficar vazio";
		if (!password.match(/[A-Z]/)) return "Sua senha precisa conter ao menos uma letra maiúscula";
		if (!password.match(/[a-z]/)) return "Sua senha precisa conter ao menos uma letra minúscula";
		if (!password.match(/[0-9]/)) return "Sua senha precisa conter ao menos um número";
		if (password.length < 10) return "Sua senha precisa conter ao menos 10 caracteres";
		return "";
	}

	passwordCheck({ passwordCheck, password }: IFields): string {
		if (!passwordCheck) return "Este campo não pode ficar vazio";
		if (passwordCheck !== password) return "Suas senhas não são iguais";
		return "";
	}
}

export const validations = new Validations();
