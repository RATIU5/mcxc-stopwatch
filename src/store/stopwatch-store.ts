import { StopwatchProps } from './../Types/stopwatch';
import { RecordProps } from './../Types/record';
import { randomId } from "./../util/functions";
import { StoreActionsObj } from "../Types/store";
import { initStore } from "./store";

const configureStore = () => {
	// console.log("CONFIGURING STORE");
	
	const actions: StoreActionsObj = {
		RECORD_MARK: (state, {id, mark}) => {
			const newStopwatchesArray = state.stopwatches.slice();
			const stopwatch = newStopwatchesArray.find((s: StopwatchProps) => s.id === id);
			if (stopwatch)
				stopwatch.marks.push(mark);
			return {
				...state,
				stopwatches: newStopwatchesArray,
			}
		},
		CLEAR_MARKS: (state, stopwatchId) => {
			const newStopwatchesArray = state.stopwatches.slice();
			newStopwatchesArray.find((s: StopwatchProps) => s.id === stopwatchId).marks = [];
			return {
				...state,
				stopwatches: newStopwatchesArray
			}
		},
		CLEAR_MARK: (state, {stopwatchId, markId}) => {
			const newStopwatchesArray = state.stopwatches.slice();
			const stopwatch = newStopwatchesArray.find((s: StopwatchProps) => s.id === stopwatchId);
			stopwatch.marks = stopwatch.marks.filter((m: RecordProps) => m.id !== markId);
			return {
				...state,
				stopwatches: newStopwatchesArray
			}
		},
		RECORD_MARK_AT: (state, {stopwatchId, index, mark}) => {
			const newStopwatchesArray = state.stopwatches.slice();
			newStopwatchesArray.find((s: StopwatchProps) => s.id === stopwatchId).marks.splice(index, 0, mark);
			return {
				...state,
				stopwatches: newStopwatchesArray
			}
		},
		UPDATE_TIME: (state, {stopwatchId, time}) => {
			const newStopwatchesArray = state.stopwatches.slice();
			newStopwatchesArray.find((s: StopwatchProps) => s.id === stopwatchId).time = time;
			return {
				...state,
				newStopwatchesArray
			}
		},
		CLEAR_TIME: (state, stopwatchId) => {
			const newStopwatchesArray = state.stopwatches.slice();
			newStopwatchesArray.find((s: StopwatchProps) => s.id === stopwatchId).time = null;
			return {
				...state,
				newStopwatchesArray
			}
		},
		ADD_STOPWATCH: (state) => {		
			return {
				stopwatches: [
					...state.stopwatches,
					{
						id: randomId(),
						time: null,
						offset: null,
						isRunning: false,
						marks: [],
					},
				],
			};
		},
		REMOVE_STOPWATCH: (state, id) => {
			return {
				...state,
				stopwatches: state.stopwatches.filter((sw: StopwatchProps) => sw.id !== id),
			}
		},
	};
	
	initStore(actions, {
		stopwatches: []
	});
};

export default configureStore;
