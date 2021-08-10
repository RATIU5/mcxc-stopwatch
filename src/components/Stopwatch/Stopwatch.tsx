import { Button, ButtonGroup, EditableText, H5, Intent } from "@blueprintjs/core";
import PopoverButton from "../UI/PopupButton";
import React from "react";
import { conf } from "../../conf";
import useRecords from "../../hooks/use_record";
import useStopwatch from "../../hooks/use_stopwatch";
import { StopwatchProps } from "../../Types/stopwatch";
import { displayTime, randomId } from "../../util/functions";
import Record from "./Record";
import styles from "./Stopwatch.module.scss";
import { Classes } from "@blueprintjs/popover2";

const Stopwatch: React.FunctionComponent<StopwatchProps> = (props) => {
	// const records = props.initialRecords || [];
	const { records, add: addRecord, remove: removeRecord, clear: clearRecords } = useRecords();

	const {
		time: currentTime,
		start: startStopwatch,
		pause: pauseStopwatch,
		reset: resetStopwatch,
		isRunning,
	} = useStopwatch();

	const startButtonHandler = () => {
		startStopwatch();
	};
	const pauseButtonHandler = () => {
		pauseStopwatch();
	};
	const resetButtonHandler = () => {
		resetStopwatch();
		clearRecords();
	};
	const recordButtonHandler = () => {
		if (isRunning)
			addRecord({
				id: randomId(),
				time: currentTime,
			});
	};
	const copyButtonHandler = () => {
		console.log("COPY");
	};
	const closeButtonHandler = () => {
		console.log("CLOSE");
	};
	const removeRecordHandler = (id: string) => {
		removeRecord(id);
	};
	const addRecordHandler = (place: number) => {
		console.log(`ADD BEFORE ${place}`);
	};

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
					<Button
						onClick={closeButtonHandler}
						icon="cross"
						intent={Intent.DANGER}
						large
						minimal
					/>
				</div>
				<div className={styles.header_timerBar}>
					<h4 className={styles.header_timeBar_counter}>{records.length} Total</h4>
					<span className={styles.space}></span>
					<Button
						onClick={copyButtonHandler}
						rightIcon="clipboard"
						intent={Intent.PRIMARY}
						large
						minimal
					>
						Copy
					</Button>
				</div>
			</header>
			<ul className={styles.record_list}>
				{records.map((r, i) => (
					<Record
						key={r.id}
						id={r.id}
						place={i + 1}
						time={r.time}
						onAdd={addRecordHandler}
						onRemove={removeRecordHandler}
					/>
				))}
			</ul>
			<footer className={styles.footer}>
				<h4 className={styles.footer_display}>
					{displayTime(currentTime, conf.timeFormat)}
				</h4>
				<ButtonGroup className={styles.footer_buttons} fill minimal>
					<Button
						onClick={(isRunning && pauseButtonHandler) || startButtonHandler}
						className={styles.footer_buttons_button}
						intent={(isRunning && Intent.WARNING) || Intent.SUCCESS}
						text={
							<p className={styles.footer_button_text}>
								{(isRunning && "Pause") || "Start"}
							</p>
						}
					/>
					<Button
						onClick={recordButtonHandler}
						className={styles.footer_buttons_button}
						intent={Intent.PRIMARY}
						disabled={!isRunning}
						text={<p className={styles.footer_button_text}>Record</p>}
					/>
					<PopoverButton
						usePopup={records.length !== 0}
						button={
							<Button
								onClick={records.length === 0 ? resetButtonHandler : undefined}
								className={styles.footer_buttons_button}
								intent={Intent.DANGER}
								text={<p className={styles.footer_button_text}>Reset</p>}
							/>
						}
						popover={
							<div key="text">
								<H5>Confirm deletion</H5>
								<p>
									Are you sure you want to delete{" "}
									{records.length === 1 && "this record"}
									{records.length > 1 && `all ${records.length} records`}?
								</p>
								<div
									style={{
										display: "flex",
										justifyContent: "flex-end",
										marginTop: 15,
									}}
								>
									<Button
										className={Classes.POPOVER2_DISMISS}
										style={{ marginRight: 10 }}
										large
									>
										Cancel
									</Button>
									<Button
										onClick={resetButtonHandler}
										intent={Intent.DANGER}
										className={Classes.POPOVER2_DISMISS}
										large
									>
										Delete
									</Button>
								</div>
							</div>
						}
					/>
				</ButtonGroup>
			</footer>
		</div>
	);
};

export default Stopwatch;
