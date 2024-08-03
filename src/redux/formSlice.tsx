import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  firstName: string;
  lastName: string;
  status: string;
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  status: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    updateForm(state, action: PayloadAction<Partial<FormState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setFirstName, setLastName, setStatus, updateForm } = formSlice.actions;
export default formSlice.reducer;
