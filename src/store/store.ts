import { ActionPayload, StoreActionsObj, StoreListener, StoreStateObj } from "./../Types/store";
import { useEffect, useState } from "react";

let globalState: StoreStateObj = {};
let listeners: StoreListener[] = [];
let actions: StoreActionsObj = {};

export const useStore = (
	shouldListen: boolean = true
): [
	state: StoreStateObj,
	dispatch: (actionIdentifier: string, payload?: ActionPayload) => void
] => {
	const setState = useState(globalState)[1];

	const dispatch = (actionIdentifier: string, payload?: ActionPayload) => {
		// Retrieve new state from calling the specified action function
		const newState = actions[actionIdentifier](globalState, payload);
		// Update the global state
		globalState = { ...globalState, ...newState };

		// Call each listener
		for (const listener of listeners) {
			listener(globalState);
		}
	};

	useEffect(() => {
		if (shouldListen)
			// Add new listener each time useStore is called
			listeners.push(setState);
		return () => {
			if (shouldListen)
				// Delete current listener from array
				listeners = listeners.filter((li: any) => li !== setState);
		};
	}, [setState, shouldListen]);

	// Return the global state and the dispatch method
	return [globalState, dispatch];
};

export const initStore = (userActions: StoreActionsObj, initialState: StoreStateObj) => {
	// Initialize the state if defined
	if (initialState) {
		globalState = { ...globalState, ...initialState };
	}
	// Initialize the store with additional actions
	actions = { ...actions, ...userActions };
};
