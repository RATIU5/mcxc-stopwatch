import { useState } from "react";
import { RecordProps } from "../Types/record";

const useRecords = (initialArray?: RecordProps[]) => {
	const [records, setRecords] = useState(initialArray || []);

	const add = (record: RecordProps) => {
		setRecords((prevRecords) => [...prevRecords, record]);
	};

	const addAt = (position: number, record: RecordProps) => {
		// console.log(`INSERT AT ${position}`);

		setRecords((prevRecords) => {
			const altArr = prevRecords.slice();
			altArr.splice(position, 0, record);
			return altArr;
		});
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
		addAt,
	};
};

export default useRecords;
