import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MarkerState {
	counters: number[];
}

const initialState: MarkerState = {
	counters: [0, 0, 0],
};

const markerSlice = createSlice({
	name: "markers",
	initialState,
	reducers: {
		incrementCounter(state, action: PayloadAction<number>) {
			state.counters[action.payload]++;
		},
		resetAllCounters(state) {
			state.counters = [0, 0, 0];
		},
	},
});

export const { incrementCounter, resetAllCounters } = markerSlice.actions;
const store = configureStore({
	reducer: {
		markers: markerSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
