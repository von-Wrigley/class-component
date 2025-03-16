import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IFormInput } from './ControlledForm';

const initialForm = {
  form: [] as IFormInput[],
  countries: [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'British Virgin Islands',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
  ],
};

const formHookSlice = createSlice({
  name: 'contoledFormation',
  initialState: initialForm,
  reducers: {
    addConrtolForm: (state, action: PayloadAction<IFormInput>) => {
      state.form.push(action.payload);
    },
  },
});
export const { addConrtolForm } = formHookSlice.actions;
export default formHookSlice.reducer;
