import styles from "./Stopwatch.module.scss";

export type RecordProps = {
	id: string;
	time: number;
};

export type StopwatchProps = {
	id: string;
	dateCreated: number;
	name?: string;
	initialTime?: number;
	initialRecords?: RecordProps[];
};

const Stopwatch: React.FunctionComponent<StopwatchProps> = (props) => {
	return (
		<div className={styles.container}>
			<header>Header</header>
			<div>Body</div>
			<footer>Footer</footer>
		</div>
	);
};

export default Stopwatch;
