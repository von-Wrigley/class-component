import { createSlice } from '@reduxjs/toolkit';
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

const formSlice = createSlice({
  name: 'uncontoledFormation',
  initialState: initialForm,
  reducers: {
    addForm: (state, action) => {
      state.form.push(action.payload);
    },
  },
});
export const { addForm } = formSlice.actions;
export default formSlice.reducer;
