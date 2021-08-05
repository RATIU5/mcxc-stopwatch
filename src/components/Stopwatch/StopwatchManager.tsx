import Stopwatch from "./Stopwatch";

import styles from "./StopwatchManager.module.scss";

const StopwatchManager: React.FunctionComponent = (props) => {
	const DUMMY_STOPWATCH_ARRAY = [
		{
			id: "test123",
			name: "My Stopwatch",
			time: 1543244224,
			dateCreated: 32434234,
			records: [
				{ id: "test321", time: 2423523452 },
				{ id: "test432", time: 2423523453 },
				{ id: "test543", time: 2423523454 },
			],
		},
	];

	return (
		<ul className={styles.manager_list}>
			{DUMMY_STOPWATCH_ARRAY.map((sw) => (
				<li key={sw.id}>
					<Stopwatch
						id={sw.id}
						name={sw.name}
						dateCreated={sw.dateCreated}
						initialTime={sw.time}
						initialRecords={sw.records}
					/>
				</li>
			))}
		</ul>
	);
};

export default StopwatchManager;
