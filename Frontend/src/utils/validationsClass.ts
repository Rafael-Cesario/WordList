export class Validations {
	password = (password: string) => {
		if (password.length < 10) return { password: "Sua senha precisa ter ao menos 10 caracteres" };
		if (!password.match(/[A-Z]/)) return { password: "Sua senha precisa ter ao menos 1 letra maiúscula" };
		if (!password.match(/[a-z]/)) return { password: "Sua senha precisa ter ao menos 1 letra minúscula" };
		if (!password.match(/[0-9]/)) return { password: "Sua senha precisa ter ao menos 1 número" };
	};

	email = (email: string) => {
		if (!email.match(/@/)) return { email: "Seu email não parece valido" };

		const [user, domain] = email.split("@");
		if (!user) return { email: "Seu email não parece valido" };
		if (!domain) return { email: "Seu email não parece valido" };
	};
}
