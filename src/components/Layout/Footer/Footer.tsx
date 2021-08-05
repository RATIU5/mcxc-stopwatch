import Copyright from "./Copyright";
import styles from "./Footer.module.scss";

const Footer: React.FunctionComponent<{ [x: string]: any }> = (props) => {
	const { className, children, ...otherProps } = props;
	return (
		<footer {...otherProps} className={`${styles.footer} ${className || ""}`}>
			{children}
			<Copyright />
		</footer>
	);
};

export default Footer;
