declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";
declare module "@env" {
	export const FIREBASE_API_KEY: string;
	export const FIREBASE_AUTH_DOMAIN: string;
	export const FIREBASE_PROJECT_ID: string;
	export const FIREBASE_STORAGE_BUCKET: string;
	export const FIREBASE_MESSAGING_SENDER_ID: string;
	export const FIREBASE_APP_ID: string;
}
declare module "*.svg" {
	import React from "react";
	import { SvgProps } from "react-native-svg";
	const content: React.FC<SvgProps>;
	export default content;
}
