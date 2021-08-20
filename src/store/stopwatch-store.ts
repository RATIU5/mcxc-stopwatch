import { randomId } from "./../util/functions";
import { StoreActionsObj } from "../Types/store";
import { initStore } from "./store";
import {StopwatchProps} from "../Types/stopwatch";

const configureStore = () => {
	// console.log("CONFIGURING STORE");
	
	const actions: StoreActionsObj = {
		RECORD_MARK: (state, stopwatchId) => {
			console.log("RECORD MARK:", stopwatchId);

			return {};
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
		}
	};
	initStore(actions, {
		stopwatches: []
	});
};

export default configureStore;
