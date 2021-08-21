import {
	Button,
	ButtonGroup,
	EditableText,
	H5,
	Intent,
} from "@blueprintjs/core";
import PopoverButton from "../UI/PopupButton";
import React, { useState } from "react";
import { conf } from "../../conf";
import useStopwatch from "../../hooks/use_stopwatch";
import { StopwatchProps } from "../../Types/stopwatch";
import { displayTime, randomId } from "../../util/functions";
import Record from "./Record";
import styles from "./Stopwatch.module.scss";
import { Classes } from "@blueprintjs/popover2";
import useCopyToClipboard from "../../hooks/use_copyToClipboard";
import useTimeout from "../../hooks/use_timeout";
import { useStore } from "../../store/store";
import { RecordProps } from "../../Types/record";

const Stopwatch: React.FunctionComponent<StopwatchProps> = React.memo(
	(props) => {
		const [state, dispatch] = useStore(false);
		const stopwatchState = state.stopwatches.find(
			(s: StopwatchProps) => s.id === props.id
		);
		const {
			start: startStopwatch,
			// pause: pauseStopwatch,
			reset: resetStopwatch,
			isRunning,
		} = useStopwatch((currentTime) => {
			dispatch("UPDATE_TIME", {stopwatchId: props.id, time: currentTime})
		});
		const copyToClipboard = useCopyToClipboard()[1];
		const [copied, setCopied] = useState(false);

		const startButtonHandler = () => {
			startStopwatch();
		};

		const resetCopyText = () => {
			setCopied(false);
		};

		// Timeout for copy text
		useTimeout(resetCopyText, copied ? 3000 : null);

		// const pauseButtonHandler = () => {
		// 	pauseStopwatch();
		// };

		const resetButtonHandler = () => {
			resetStopwatch();
			dispatch("CLEAR_MARKS", props.id);
			dispatch("CLEAR_TIME", props.id);
			setCopied(false);

		};
		const recordButtonHandler = () => {
			if (isRunning)
				dispatch("RECORD_MARK", {
					id: props.id,
					mark: { id: randomId(), time: stopwatchState.time },
				});
			// addRecord({
			// 	id: randomId(),
			// 	time: currentTime,
			// });
		};
		const copyButtonHandler = () => {
			const copyDataToClipboard = async () => {
				let recordsStr = "";
				stopwatchState.marks.forEach((e: RecordProps) => {
					recordsStr += displayTime(e.time, conf.timeFormat) + "\n";
				});

				if (await copyToClipboard(recordsStr)) {
					setCopied(true);
				}
			};

			copyDataToClipboard();
		};
		const closeButtonHandler = () => {
			dispatch("REMOVE_STOPWATCH", props.id);
		};
		const removeRecordHandler = (id: string) => {
			dispatch("CLEAR_MARK", { stopwatchId: props.id, markId: id });
		};
		const addRecordHandler = (index: number) => {
			dispatch("RECORD_MARK_AT", {
				stopwatchId: props.id,
				index,
				mark: {
					id: randomId(),
					time: 0,
				},
			});
		};

		return (
			
			<div className={styles.container}>
				{/* TODO: Rerendering too much */}
				<header className={styles.header}>
					<div className={styles.header_titleBar}>
						<EditableText
							className={styles.header_titleBar_title}
							placeholder={props.id}
							selectAllOnFocus
						/>
						<span className={styles.space}></span>
						<PopoverButton
							usePopup={isRunning || stopwatchState.marks.length !== 0}
							button={
								<Button
									onClick={
										!isRunning && stopwatchState.marks.length === 0
											? closeButtonHandler
											: undefined
									}
									icon="cross"
									intent={Intent.DANGER}
									large
									minimal
									// disabled
								/>
							}
							popover={
								<div key="text">
									<H5>Confirm Delete</H5>
									<p>
										{`Are you sure you want to delete this stopwatch${
											stopwatchState.marks.length > 1
												? ` and all ${stopwatchState.marks.length} marks`
												: stopwatchState.marks.length > 0
												? " the contained mark"
												: ""
										}?`}
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
											onClick={closeButtonHandler}
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
					</div>
					<div className={styles.header_timerBar}>
						<h4 className={styles.header_timeBar_counter}>
							{stopwatchState.marks.length} Total
						</h4>
						<span className={styles.space}></span>
						<Button
							onClick={copyButtonHandler}
							rightIcon="clipboard"
							intent={Intent.PRIMARY}
							disabled={stopwatchState.marks.length === 0}
							large
							minimal
						>
							{(copied && "Copied!") || "Copy"}
						</Button>
					</div>
				</header>
				<ul className={styles.record_list}>
					{stopwatchState.marks.map((r: RecordProps, i: number) => (
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
						{displayTime(stopwatchState.time, conf.timeFormat)}
					</h4>
					<ButtonGroup className={styles.footer_buttons} fill minimal>
						<Button
							onClick={startButtonHandler}
							className={styles.footer_buttons_button}
							intent={Intent.SUCCESS}
							disabled={isRunning}
							text={
								<p className={styles.footer_button_text}>
									{"Start"}
								</p>
							}
						/>
						<Button
							onClick={recordButtonHandler}
							className={styles.footer_buttons_button}
							intent={Intent.PRIMARY}
							disabled={!isRunning}
							text={
								<p className={styles.footer_button_text}>
									Record
								</p>
							}
						/>
						<PopoverButton
							usePopup={isRunning || stopwatchState.marks.length !== 0}
							button={
								<Button
									onClick={
										!isRunning && stopwatchState.marks.length === 0
											? resetButtonHandler
											: undefined
									}
									className={styles.footer_buttons_button}
									intent={Intent.DANGER}
									text={
										<p
											className={
												styles.footer_button_text
											}
										>
											Reset
										</p>
									}
								/>
							}
							popover={
								<div key="text">
									<H5>Confirm Reset</H5>
									<p>
										{`Are you sure you want to reset the stopwatch${
											stopwatchState.marks.length > 1
												? ` and delete all ${stopwatchState.marks.length} marks`
												: stopwatchState.marks.length > 0
												? " and delete the contained mark"
												: ""
										}?`}
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
											Reset
										</Button>
									</div>
								</div>
							}
						/>
					</ButtonGroup>
				</footer>
			</div>
		);
	}
);

export default Stopwatch;
