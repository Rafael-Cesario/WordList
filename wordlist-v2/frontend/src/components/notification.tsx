import { useDispatch, useSelector } from "react-redux";
import { StyledNotification } from "./styles/styled-notification";
import { Store } from "@/context/store";
import { setNotificationClose } from "@/context/slices/notification-slice";

export const Notification = () => {
	const { isOpen, message, title, type } = useSelector((state: Store) => state.notification);
	const dispatch = useDispatch();

	if (!isOpen) return;

	return (
		<StyledNotification type={type} data-cy="notification">
			<div className="top">
				<h1 className="title">{title}</h1>
				<button className="close" onClick={() => dispatch(setNotificationClose())}>x</button>
			</div>
			<p className="message">{message}</p>
		</StyledNotification>
	);
};
