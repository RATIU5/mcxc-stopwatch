import { randomId } from "./../util/functions";
import { StoreActionsObj } from "../Types/store";
import { initStore } from "./store";

const configureStore = () => {
	const actions: StoreActionsObj = {
		SET_ACTIVE_STOPWATCH: (state, stopwatchId) => {
			console.log("SET STOPWATCH ACTIVE");

			return {
				...state,
				activeId: stopwatchId,
			};
		},
		INSERT_STOPWATCH: (state) => {
			console.log("INSERTED STOPWATCH");
			const id = randomId();
			const newState = { ...state };
			newState.stopwatches[id] = {
				time: 0,
				offset: 0,
				isRunning: false,
				marks: [],
			};
			// newState.activeId = id;
			return { ...newState, activeId: id };
		},
		DELETE_STOPWATCH: (state, stopwatchId) => {
			console.log("DELETED STOPWATCH");
			const newState = { ...state };
			if (newState.activeId === stopwatchId) newState.activeId = null;
			newState.stopwatches[stopwatchId] &&
				delete newState.stopwatches[stopwatchId];
			return newState;
		},
		SET_STOPWATCH_TIME: (state, time) => {
			const newState = { ...state };
			if (newState.stopwatches[newState.activeId])
				newState.stopwatches[newState.activeId].time = time;
			return newState;
		},
		SET_STOPWATCH_RUNNING: (state, isRunning) => {
			console.log("SET STOPWATCH RUNNING");
			const newState = { ...state };
			if (newState.stopwatches[newState.activeId])
				newState.stopwatches[newState.activeId].isRunning = isRunning;
			return newState;
		},
		INSERT_STOPWATCH_MARK: (state, time) => {
			console.log("INSERTED STOPWATCH MARK");
			const newState = { ...state };
			const id = randomId();
			if (newState.stopwatches[newState.activeId])
				newState.stopwatches[newState.activeId].marks[id] = time;
			return newState;
		},
		DELETE_STOPWATCH_MARKS: (state) => {
			console.log("DELETED STOPWATCH MARKS");
			const newState = { ...state };
			if (newState.stopwatches[newState.activeId])
				newState.stopwatches[newState.activeId].marks = [];
			return newState;
		},
		DELETE_STOPWATCH_MARK: (state, markId) => {
			console.log("DELETED STOPWATCH MARK");
			const newState = { ...state };
			if (newState.stopwatches[newState.activeId])
				markId in newState.stopwatches[newState.activeId].marks &&
					delete newState.stopwatches[newState.activeId].marks[
						markId
					];
			return newState;
		},
		INSERT_STOPWATCH_MARK_AT: (state, { index, time }) => {
			console.log("INSERTED STOPWATCH MARK AT");
			const newId = randomId();
			const newState = { ...state };
			if (!newState.stopwatches[newState.activeId])
				return { error: "stopwatches not defined" };
			const marks = newState.stopwatches[newState.activeId].marks;
			let i = 0;
			const newMarks: any = {};

			for (const id in marks) {
				if (i === index) {
					newMarks[newId] = time;
				}
				newMarks[id] = marks[id];
				i++;
			}
			newState.stopwatches[newState.activeId].marks = newMarks;
			return newState;
		},
	};

	initStore(actions, {
		stopwatches: {},
		activeId: null,
	});
};

export default configureStore;
