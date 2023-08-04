import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export function useAuthentication() {
	const [user, setUser] = React.useState<User>();
	const auth = getAuth();

	React.useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
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
