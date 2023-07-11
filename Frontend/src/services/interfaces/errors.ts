export interface IErrorsCode {
	default: string;

	user: {
		duplicated: string;
		invalidCredentials: string;
	};

	list: {
		duplicated: string;
	};

	word: {
		duplicated: string;
	};
}

export const errorsCode: IErrorsCode = {
	default: "Ops, um erro inesperado ocorreu, por favor recarregue a página e tente novamente.",

	user: {
		duplicated: "Desculpe, este email não esta disponível ou já foi registrado.",
		invalidCredentials: "Parece que seu email ou sua senha não estão certos. Talvez você ainda não tenha uma conta criada.",
	},

	list: {
		duplicated: "Uma lista com o mesmo nome já existe.",
	},

	word: {
		duplicated:
			"O mesmo termo já foi adicionado antes.\nDica: Você pode clicar duas vezes no termo mostrado na notifição e apertar CTRL + F para ativar a busca do navegador.",
	},
};
