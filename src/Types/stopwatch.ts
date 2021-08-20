import { RecordProps } from "./record";

export type StopwatchProps = {
	id: string;
	dateCreated: number;
	name?: string;
	initialTime?: number;
	initialRecords?: RecordProps[];
};

export type StopwatchActions = {
	RECORD_MARK: () => void;
};
