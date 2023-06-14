export interface IErrorsCode {
	default: string;

	user: {
		duplicated: string;
	};
}

export const errorsCode: IErrorsCode = {
	default: "Ops, um erro inesperado ocorreu, por favor recarregue a página e tente novamente.",

	user: {
		duplicated: "Desculpe, este email não esta disponível",
	},
};
