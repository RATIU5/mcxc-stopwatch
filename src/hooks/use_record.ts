import { useState } from "react";
import { RecordProps } from "../Types/record";

const useRecords = (initialArray?: RecordProps[]) => {
	const [records, setRecords] = useState(initialArray || []);

	const add = (record: RecordProps) => {
		setRecords((prevRecords) => [...prevRecords, record]);
	};

	const remove = (id: string) => {
		setRecords((prevRecords) => prevRecords.filter((r) => r.id !== id));
	};

	const clear = () => {
		setRecords([]);
	};

	return {
		records,
		add,
		remove,
		clear,
	};
};

export default useRecords;
