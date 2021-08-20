import { useStore } from "../../store/store";
import Stopwatch from "./Stopwatch";

import styles from "./StopwatchManager.module.scss";

const StopwatchManager: React.FunctionComponent = (props) => {
	// console.log("RENDERING STOPWATCHMANAGER COMPONENT");
	const [state] = useStore();
	// console.log(state);
	

	return (
		<ul className={styles.manager_list}>
			{state.stopwatches.map((sw: any) => (
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
