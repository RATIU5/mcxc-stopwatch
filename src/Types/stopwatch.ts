import { RecordProps } from "./record";

export type StopwatchProps = {
	id: string;
	dateCreated: number;
	name?: string;
	time?: number;
	marks?: RecordProps[];
};

export type StopwatchActions = {
	RECORD_MARK: () => void;
};
