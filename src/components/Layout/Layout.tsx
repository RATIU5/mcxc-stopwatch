import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import styles from "./Layout.module.scss";

const Layout: React.FunctionComponent<{ className?: string; [x: string]: any }> = (props) => {
	const { className, ...otherProps } = props;
	return (
		<>
			<Header className={styles.header}>
				<h1 className={styles.header_title}>MCXC Stopwatch</h1>
			</Header>

			<main {...otherProps} className={`${styles.main} ${className}`}>
				{props.children}
			</main>

			<Footer className={styles.footer}></Footer>
		</>
	);
};

export default Layout;
