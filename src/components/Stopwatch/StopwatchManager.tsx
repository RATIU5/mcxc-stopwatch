import { useStore } from "../../store/store";
// import { StopwatchObject } from "../../Types/stopwatch";
import Stopwatch from "./Stopwatch";

import styles from "./StopwatchManager.module.scss";

const StopwatchManager: React.FunctionComponent = (props) => {
	const [state] = useStore();

	return (
		<ul className={styles.manager_list}>
			{Object.entries(state.stopwatches).map(
				// Needs to be [string, StopwatchObject]
				([id, sw]: [string, any]) => (
					<li key={id}>
						<Stopwatch
							id={id}
							name={sw.name}
							time={sw.time}
							marks={sw.records}
						/>
					</li>
				)
			)}
		</ul>
	);
};

export default StopwatchManager;
