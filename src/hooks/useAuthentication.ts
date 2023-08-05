import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import useStore from "./useStore";

export default function useAuthentication() {
	const [user, setUser] = React.useState<User>();
	const auth = getAuth();
	const appStore = useStore();

	React.useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in
				setUser(user);
			} else {
				// User is signed out
				setUser(undefined);
				appStore.logoutUser();
			}
		});

		return unsubscribeFromAuthStatusChanged;
	}, []);

	return {
		user,
	};
}
