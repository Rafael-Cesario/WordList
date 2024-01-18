import { useDispatch, useSelector } from "react-redux";
import { StyledNotification } from "./styles/styled-notification";
import { Store } from "@/context/store";

export const Notification = () => {
	const { isOpen, message, title, type } = useSelector((state: Store) => state.notification);

	if (!isOpen) return;

	return (
		<StyledNotification type={type} data-cy="notification">
			<div className="top">
				<h1 className="title">{title}</h1>
				<button className="close">x</button>
			</div>
			<p className="message">{message}</p>
		</StyledNotification>
	);
};
