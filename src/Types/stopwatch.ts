import { RecordProps } from "./record";

export type StopwatchProps = {
	id: string;
	dateCreated: number;
	name?: string;
	initialTime?: number;
	initialRecords?: RecordProps[];
};
