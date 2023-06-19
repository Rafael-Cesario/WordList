export interface IErrorsCode {
	default: string;

	user: {
		duplicated: string;
		"Invalid credentials": string;
	};

	list: {
		duplicated: string;
	};
}

export const errorsCode: IErrorsCode = {
	default: "Ops, um erro inesperado ocorreu, por favor recarregue a página e tente novamente.",

	user: {
		duplicated: "Desculpe, este email não esta disponível ou já foi registrado.",
		"Invalid credentials": "Parece que seu email ou sua senha não estão certos.",
	},

	list: {
		duplicated: "Uma lista com o mesmo nome já existe.",
	},
};
