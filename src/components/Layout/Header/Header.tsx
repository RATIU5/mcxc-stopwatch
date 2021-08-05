import styles from "./Header.module.scss";

const Header: React.FunctionComponent<{ [x: string]: any }> = (props) => {
	const { className, children, ...otherProps } = props;
	return (
		<header {...otherProps} className={`${styles.header} ${className || ""}`}>
			{children}
		</header>
	);
};

export default Header;
