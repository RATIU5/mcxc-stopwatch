import { Classes, Popover2 } from "@blueprintjs/popover2";

// Props: button, popup

const PopoverButton: React.FunctionComponent<{
	button: JSX.Element;
	popover: JSX.Element;
	usePopup: boolean;
}> = (props) => {
	if (!props.usePopup) return props.button;
	return (
		<Popover2
			popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
			canEscapeKeyClose
			content={props.popover}
		>
			{props.button}
		</Popover2>
	);
};

export default PopoverButton;
