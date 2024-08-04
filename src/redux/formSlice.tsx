import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Record {
  firstName: string;
  lastName: string;
  status: string;
}

interface FormState {
  records: Record[];
}

const initialState: FormState = {
  records: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addRecord(state, action: PayloadAction<Record>) {
      state.records.push(action.payload);
    },
    updateRecord(
      state,
      action: PayloadAction<{ index: number; record: Partial<Record> }>
    ) {
      const { index, record } = action.payload;
      if (index >= 0 && index < state.records.length) {
        state.records[index] = { ...state.records[index], ...record };
      }
    },
    removeRecord(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.records.length) {
        state.records.splice(index, 1);
      }
    },
  },
});

export const { addRecord, updateRecord, removeRecord } = formSlice.actions;
export default formSlice.reducer;
