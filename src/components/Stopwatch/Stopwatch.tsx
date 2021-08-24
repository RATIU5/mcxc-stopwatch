import {
	Button,
	ButtonGroup,
	EditableText,
	H5,
	Intent,
	useHotkeys,
} from "@blueprintjs/core";
import PopoverButton from "../UI/PopupButton";
import React, { useCallback, useRef, useState } from "react";
import { conf } from "../../conf";
import useStopwatch from "../../hooks/use_stopwatch";
import { StopwatchProps } from "../../Types/stopwatch";
import { displayTime } from "../../util/functions";
import Record from "./Record";
import styles from "./Stopwatch.module.scss";
import { Classes } from "@blueprintjs/popover2";
import useCopyToClipboard from "../../hooks/use_copyToClipboard";
import useTimeout from "../../hooks/use_timeout";
import { useStore } from "../../store/store";
import { useMemo } from "react";

const Stopwatch: React.FunctionComponent<StopwatchProps> = React.memo(
	(props) => {
		const [state, dispatch] = useStore(false);
		const stopwatchState = state.stopwatches[props.id];
		const { start: startStopwatch, reset: resetStopwatch } = useStopwatch(
			(currentTime) => {
				dispatch("SET_STOPWATCH_TIME", currentTime);
			}
		);
		const copyToClipboard = useCopyToClipboard()[1];
		const [copied, setCopied] = useState(false);

		const stopwatchRef = useRef<HTMLDivElement>(null);
		const bottomScrollItemRef = useRef<HTMLLIElement>(null);

		// Timeout for copy text
		useTimeout(() => setCopied(false), copied ? 3000 : null);

		const marksCount = () => {
			return Object.entries(stopwatchState.marks).length;
		};

		const closeButtonHandler = () => {
			dispatch("DELETE_STOPWATCH", props.id);
		};

		const startButtonHandler = useCallback(() => {
			startStopwatch();
			dispatch("SET_STOPWATCH_RUNNING", true);
			stopwatchRef.current?.focus();
		}, [dispatch, startStopwatch]);
		const recordButtonHandler = () => {
			if (stopwatchState.isRunning)
				dispatch("INSERT_STOPWATCH_MARK", stopwatchState.time);
			stopwatchRef.current?.focus();
			scrollToBottom();
		};
		const resetButtonHandler = () => {
			resetStopwatch();
			dispatch("SET_STOPWATCH_RUNNING", false);
			dispatch("DELETE_STOPWATCH_MARKS");
			dispatch("SET_STOPWATCH_TIME", 0);
			setCopied(false);
			stopwatchRef.current?.focus();
		};

		const copyButtonHandler = () => {
			const copyDataToClipboard = async () => {
				let recordsStr = "";

				Object.entries(stopwatchState.marks).forEach(
					([id, time]: [string, any]) => {
						// @ts-ignore
						recordsStr += displayTime(time, conf.timeFormat) + "\n";
					}
				);

				if (await copyToClipboard(recordsStr)) {
					setCopied(true);
				}
			};
			copyDataToClipboard();
			stopwatchRef.current?.focus();
		};

		const addMarkHandler = (index: number) => {
			dispatch("INSERT_STOPWATCH_MARK_AT", {
				index,
				time: 0,
			});
		};
		const removeMarkHandler = (id: string) => {
			dispatch("DELETE_STOPWATCH_MARK", id);
		};

		const scrollToBottom = () => {
			bottomScrollItemRef.current?.scrollIntoView({ behavior: "smooth" });
		};

		useHotkeys(
			useMemo(
				() => [
					{
						combo: "Space",
						global: true,
						label: "Scroll to bottom",
						onKeyDown: () => {
							if (
								!stopwatchState?.isRunning &&
								state.activeId === props.id
							)
								startButtonHandler();
							scrollToBottom();
						},
					},
				],
				[
					props.id,
					startButtonHandler,
					stopwatchState?.isRunning,
					state.activeId,
				]
			)
		);

		return (
			<div className={styles.container} ref={stopwatchRef} tabIndex={1}>
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
							usePopup={
								stopwatchState.isRunning || marksCount() !== 0
							}
							button={
								<Button
									onClick={
										!stopwatchState.isRunning &&
										marksCount() === 0
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
											marksCount() > 1
												? ` and all ${marksCount()} marks`
												: marksCount() > 0
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
							{marksCount()} Total
						</h4>
						<span className={styles.space}></span>
						<Button
							onClick={copyButtonHandler}
							rightIcon="clipboard"
							intent={Intent.PRIMARY}
							disabled={marksCount() === 0}
							large
							minimal
						>
							{(copied && "Copied!") || "Copy"}
						</Button>
					</div>
				</header>
				<ul className={styles.record_list}>
					{/* Marks re-rendering too much */}
					{Object.entries(stopwatchState.marks).map(
						([id, time]: [string, any], i) => (
							<Record
								key={id}
								id={id}
								place={i + 1}
								time={time}
								onAdd={addMarkHandler}
								onRemove={removeMarkHandler}
							/>
						)
					)}
					<li
						className={styles.record_list_item_last}
						ref={bottomScrollItemRef}
					></li>
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
							disabled={stopwatchState.isRunning}
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
							disabled={!stopwatchState.isRunning}
							text={
								<p className={styles.footer_button_text}>
									Record
								</p>
							}
						/>
						<PopoverButton
							usePopup={
								stopwatchState.isRunning || marksCount() !== 0
							}
							button={
								<Button
									onClick={
										!stopwatchState.isRunning &&
										marksCount() === 0
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
											marksCount() > 1
												? ` and delete all ${marksCount()} marks`
												: marksCount() > 0
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
