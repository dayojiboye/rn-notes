import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import useStore from "./useStore";

export default function useAuthentication() {
	const [user, setUser] = React.useState<User>();
	const auth = getAuth();
	const appStore = useStore();

	const setInit = () => {
		setTimeout(() => {
			appStore.setInitApp(true);
		}, 500);
	};

	React.useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
			setInit();
			if (user) {
				// User is signed in
				setUser(user);
			} else {
				// User is signed out
				setUser(undefined);
			}
		});

		return unsubscribeFromAuthStatusChanged;
	}, []);

	return {
		user,
	};
}
