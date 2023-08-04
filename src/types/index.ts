export type ThemeContextValue = {
	theme: string;
	toggleTheme: (value: string) => void;
};

export type RootStackParamList = {
	Login: { id: number } | undefined;
};
