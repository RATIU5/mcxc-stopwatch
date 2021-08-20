import { Button, HotkeyConfig, HotkeysTarget2 } from "@blueprintjs/core";
import { useMemo } from "react";
import Layout from "./components/Layout/Layout";
import StopwatchManager from "./components/Stopwatch/StopwatchManager";
import { useStore } from "./store/store";
import configureStore from "./store/stopwatch-store";

import "./global.scss";

configureStore();

function App() {

	const [state, dispatch] = useStore();

	const hotkeys: HotkeyConfig[] = useMemo(
		() => [
			{
				combo: "Space",
				global: true,
				label: "Record mark",
				onKeyDown: () => {
					console.log("PRESS");
				},
			},
		],
		[]
	);

	const addStopwatchHandler = () => {
		dispatch("ADD_STOPWATCH");
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
