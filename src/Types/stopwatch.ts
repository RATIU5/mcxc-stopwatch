import { RecordProps } from "./record";

export type StopwatchProps = {
	id: string;
	time: number;
	marks: RecordProps;
	name: string;
};

export type StopwatchObject = {
	time: number;
	marks: RecordProps;
	name: string;
};

export type StopwatchActions = {
	RECORD_MARK: () => void;
};
