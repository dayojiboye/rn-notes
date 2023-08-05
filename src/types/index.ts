export type UserData =
	| {
			displayName: string;
			userAvatar: string;
			email: string | null;
			uid: string;
			createdDate: string;
	  }
	| undefined;

export type AppContextValue = {
	theme: string;
	user: UserData | null;
	isInitializing: boolean;
	isAuth: boolean;
	toggleTheme: (value: string) => void;
	loginUser: (user: UserData) => void;
	logoutUser: () => void;
	setInitApp: (value: boolean) => void;
};

// export type RootStackParamList = {
// 	Login: { id: number } | undefined;
// };

export type RootStackParamList = {
	Initial: undefined;
	Home: undefined;
	Profile: undefined;
	NoteList: undefined;
	Login: undefined;
	Signup: undefined;
};
