export const sendNotification = (setShowNotification: (notificationState: boolean) => void) => {
	setShowNotification(true);

	setTimeout(() => {
		setShowNotification(false);
	}, 5000);
};
