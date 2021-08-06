import { Button, ButtonGroup, EditableText, Intent } from "@blueprintjs/core";
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
	const currentTime = props.initialTime;
	const records = props.initialRecords || [];
	const stopwatchIsOn = false;

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.header_titleBar}>
					<EditableText
						className={styles.header_titleBar_title}
						placeholder={props.id}
						selectAllOnFocus
					/>
					<span className={styles.space}></span>
					<Button icon="cross" intent={Intent.DANGER} large minimal />
				</div>
				<div className={styles.header_timerBar}>
					<h4 className={styles.header_timeBar_counter}>{records.length} Total</h4>
					<span className={styles.space}></span>
					<Button rightIcon="clipboard" intent={Intent.PRIMARY} large minimal>
						Copy
					</Button>
				</div>
			</header>
			<ul className={styles.record_list}>
				{records.map((r, i) => (
					<li key={r.id} className={styles.record_list_item}>
						<p className={styles.record_list_item_p}>{i + 1}</p>
						<span className={styles.space}></span>
						<p className={styles.record_list_item_p}>{r.time}</p>
						<span className={styles.space}></span>
						<div className={styles.button_add_trigger_area}>
							<Button
								className={`${styles.record_item_button} ${styles.button_add}`}
								icon="plus"
								intent={Intent.PRIMARY}
								minimal
							/>
						</div>
						<Button
							className={`${styles.record_item_button} ${styles.button_remove}`}
							icon="cross"
							intent={Intent.DANGER}
							minimal
						/>
					</li>
				))}
			</ul>
			<footer className={styles.footer}>
				<h4 className={styles.footer_display}>{currentTime}</h4>
				<ButtonGroup className={styles.footer_buttons} fill minimal>
					<Button
						className={styles.footer_buttons_button}
						intent={(stopwatchIsOn && Intent.WARNING) || Intent.SUCCESS}
						text={
							<p className={styles.footer_button_text}>
								{(stopwatchIsOn && "Pause") || "Start"}
							</p>
						}
					/>
					<Button
						className={styles.footer_buttons_button}
						intent={Intent.PRIMARY}
						text={<p className={styles.footer_button_text}>Record</p>}
					/>
					<Button
						className={styles.footer_buttons_button}
						intent={Intent.DANGER}
						text={<p className={styles.footer_button_text}>Reset</p>}
					/>
				</ButtonGroup>
			</footer>
		</div>
	);
};

export default Stopwatch;
