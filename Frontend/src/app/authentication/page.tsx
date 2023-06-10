import { Login } from "./login";
import { StyledAuthentication } from "./styles/authenticationStyle";

const Authentication = () => {
	return (
		<StyledAuthentication>
			<Login />

			<div className="wordList">
				<h1 className="title">WordList</h1>
			</div>
		</StyledAuthentication>
	);
};

export default Authentication;
