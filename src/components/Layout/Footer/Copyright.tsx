import styles from "./Copyright.module.scss";

const Copyright: React.FunctionComponent<{ [x: string]: any }> = (props) => {
	const { className, ...otherProps } = props;
	return (
		<div {...otherProps} className={`${styles.copyright} ${className || ""}`}>
			<p>2021 &copy; Copyright. All Rights Reserved.</p>
			<p>
				Designed by <a href="https://RATIU5.DEV/">RATIU5DEV</a>
			</p>
		</div>
	);
};

export default Copyright;
