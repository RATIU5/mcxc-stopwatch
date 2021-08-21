import { useState } from "react";
import useInterval from "./use_interval";

const useStopwatch = (callback?: (time: number) => void) => {
	const [time, setTime] = useState(0);
	const [offset, setOffset] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	function start() {
		setIsRunning(true);
		setOffset(Date.now());
	}

	function pause() {
		setIsRunning(false);
	}

	function reset() {
		setIsRunning(false);
		setTime(0);
	}

	function delta() {
		var now = Date.now(),
			d = now - offset;
		setOffset(now);
		return d;
	}

	useInterval(
		() => {
			callback && callback(time);
			setTime((prev) => prev + delta());
		},
		isRunning ? 10 : null
	);

	return {
		time,
		start,
		pause,
		reset,
		isRunning,
	};
};

export default useStopwatch;
