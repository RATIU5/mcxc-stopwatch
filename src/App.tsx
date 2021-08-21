import { Button, HotkeyConfig, HotkeysTarget2 } from "@blueprintjs/core";
import { useMemo } from "react";
import Layout from "./components/Layout/Layout";
import StopwatchManager from "./components/Stopwatch/StopwatchManager";
import { useStore } from "./store/store";
import configureStore from "./store/stopwatch-store";
import { randomId } from "./util/functions";
import { StopwatchProps } from "./Types/stopwatch";

import { FocusStyleManager } from "@blueprintjs/core";

import "./global.scss";

configureStore();

function App() {
	FocusStyleManager.onlyShowFocusOnTabs();

	const [state, dispatch] = useStore();
	const activeStopwatch = state.stopwatches[state.activeId];

	const hotkeys: HotkeyConfig[] = useMemo(
		() => [
			{
				combo: "Space",
				global: true,
				label: "Record mark",
				onKeyDown: (e) => {
					e.preventDefault();
					if (activeStopwatch?.isRunning)
						dispatch("INSERT_STOPWATCH_MARK", activeStopwatch.time);
				},
			},
		],
		[dispatch, activeStopwatch?.isRunning, activeStopwatch?.time]
	);

	const addStopwatchHandler = () => {
		dispatch("INSERT_STOPWATCH");
	};

	// Use context to pass functions here for keyboard shortcuts
	// https://blueprintjs.com/docs/#core/context/hotkeys-provider

	return (
		<>
			<HotkeysTarget2 hotkeys={hotkeys}>
				<Layout>
					<Button onClick={addStopwatchHandler}>New Stopwatch</Button>
					<StopwatchManager />
				</Layout>
			</HotkeysTarget2>
		</>
	);
}

export default App;
