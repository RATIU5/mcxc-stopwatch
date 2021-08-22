import { Button, HotkeyConfig, HotkeysTarget2 } from "@blueprintjs/core";
import { useMemo } from "react";
import Layout from "./components/Layout/Layout";
import StopwatchManager from "./components/Stopwatch/StopwatchManager";
import { useStore } from "./store/store";
import configureStore from "./store/stopwatch-store";

import { FocusStyleManager } from "@blueprintjs/core";

import "./global.scss";
import { useRef } from "react";

configureStore();

function App() {
	FocusStyleManager.onlyShowFocusOnTabs();

	const [state, dispatch] = useStore();
	const activeStopwatch = state.stopwatches[state.activeId];
	const newStopwatchBtnRef = useRef<Button>(null);

	const hotkeys: HotkeyConfig[] = useMemo(
		() => [
			{
				combo: "Space",
				global: true,
				label: "Record mark",
				onKeyDown: (e) => {
					e.preventDefault();
					if (activeStopwatch?.isRunning)
						dispatch(
							"INSERT_STOPWATCH_MARK",
							activeStopwatch?.time
						);
				},
			},
		],
		[dispatch, activeStopwatch?.isRunning, activeStopwatch?.time]
	);

	const addStopwatchHandler = () => {
		dispatch("INSERT_STOPWATCH");

		newStopwatchBtnRef.current?.buttonRef?.blur();
	};

	// Use context to pass functions here for keyboard shortcuts
	// https://blueprintjs.com/docs/#core/context/hotkeys-provider

	return (
		<>
			<HotkeysTarget2 hotkeys={hotkeys}>
				<Layout>
					<Button
						ref={newStopwatchBtnRef}
						onClick={addStopwatchHandler}
					>
						New Stopwatch
					</Button>
					<StopwatchManager />
				</Layout>
			</HotkeysTarget2>
		</>
	);
}

export default App;
