import { randomId } from "./../util/functions";
import { StoreActionsObj } from "../Types/store";
import { initStore } from "./store";

const configureStore = () => {
	// console.log("CONFIGURING STORE");
	
	const actions: StoreActionsObj = {
		RECORD_MARK: (curState, stopwatchId) => {
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
	};
	initStore(actions, {
		stopwatches: []
	});
};

export default configureStore;
