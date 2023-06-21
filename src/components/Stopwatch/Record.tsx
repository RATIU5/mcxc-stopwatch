import { Button, Intent } from "@blueprintjs/core";
import React from "react";
import { conf } from "../../conf";
import { RecordComponentProps } from "../../Types/record";
import { displayTime } from "../../util/functions";
import styles from "./Stopwatch.module.scss";

const Record: React.FunctionComponent<RecordComponentProps> = React.memo((props) => {
	const removeRecordHandler = () => {
		props.onRemove(props.id);
	};
	const addRecordHandler = () => {
		props.onAdd(props.place - 1); //? Or the previous place? (-2)
	};

	return (
		<li className={styles.record_list_item}>
			<p className={styles.record_list_item_p}>{props.place}</p>
			<span className={styles.space}></span>
			<p className={styles.record_list_item_p}>{displayTime(props.time, conf.timeFormat)}</p>
			<span className={styles.space}></span>
			<div className={styles.button_add_trigger_area}>
				<Button
					onClick={addRecordHandler}
					className={`${styles.record_item_button} ${styles.button_add}`}
					icon="plus"
					intent={Intent.PRIMARY}
					minimal
				/>
			</div>
			<Button
				onClick={removeRecordHandler}
				className={`${styles.record_item_button} ${styles.button_remove}`}
				icon="cross"
				intent={Intent.DANGER}
				minimal
			/>
		</li>
	);
});

export default Record;
