declare module "react-js-banner" {
	export interface BannerProps {
		backgroundColor?: string;
		color?: string;
		description?: string;
		descriptionColor?: string;
		descriptionSize?: string;
		icon?: string;
		iconColor?: string;
		iconSize?: string;
		onClick?: () => void;
		onClose?: () => void;
		position?: string;
		style?: object;
		title: string;
		titleColor?: string;
		titleSize?: string;
		visibleTime?: number;
	}

	export default function Banner(props: BannerProps): JSX.Element;
}