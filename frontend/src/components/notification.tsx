import { StyledNotification } from "./styles/styled-notification";

export const Notification = () => {
	return (
		<StyledNotification type="success">
			<div className="top">
				<h1 className="title">Lorem, ipsum dolor.</h1>
				<button className="close">x</button>
			</div>
			<p className="message">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis adipisci ipsa error accusamus magni? Molestias
				sint nemo inventore laboriosam recusandae.
			</p>
		</StyledNotification>
	);
};
