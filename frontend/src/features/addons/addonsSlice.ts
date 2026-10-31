import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddOnOption } from '../../types';

export interface AddOnsState {
  items: AddOnOption[];
  quantities: Record<string, number>;
  loading: boolean;
  error: string | null;
}

export const initialAddOns: AddOnOption[] = [
  {
    id: '1',
    code: 'speakers',
    name: 'Speakers',
    unitPrice: 35,
    category: 'Audio',
    description: 'Acoustic PA speakers with high clarity and tripods.',
    iconName: 'speakers',
    displayOrder: 1,
  },
  {
    id: '2',
    code: 'microphones',
    name: 'Microphones',
    unitPrice: 45,
    category: 'Audio',
    description: 'Wireless handheld and lapel condenser microphones.',
    iconName: 'microphones',
    displayOrder: 2,
  },
  {
    id: '3',
    code: 'whiteboards',
    name: 'Whiteboards',
    unitPrice: 80,
    category: 'Interactive',
    description: 'Double-sided magnetic mobile whiteboards with markers.',
    iconName: 'whiteboards',
    displayOrder: 3,
  },
  {
    id: '4',
    code: 'projectors',
    name: 'Projectors',
    unitPrice: 200,
    category: 'Visual',
    description: 'Ultra 4K HD laser projectors with high lumens and screen.',
    iconName: 'projectors',
    displayOrder: 4,
  },
  {
    id: '5',
    code: 'signage',
    name: 'Signage',
    unitPrice: 80,
    category: 'Signage',
    description: 'Custom illuminated directional displays and entryway stands.',
    iconName: 'signage',
    displayOrder: 5,
  },
];

const initialState: AddOnsState = {
  items: initialAddOns,
  quantities: {
    speakers: 0,
    microphones: 0,
    whiteboards: 0,
    projectors: 0,
    signage: 0,
  },
  loading: false,
  error: null,
};

const addonsSlice = createSlice({
  name: 'addons',
  initialState,
  reducers: {
    setAddOns(state, action: PayloadAction<AddOnOption[]>) {
      state.items = action.payload;
      action.payload.forEach((a) => {
        if (state.quantities[a.code] === undefined) {
          state.quantities[a.code] = 0;
        }
      });
    },
    incrementAddOn(state, action: PayloadAction<string>) {
      const code = action.payload;
      state.quantities[code] = (state.quantities[code] || 0) + 1;
    },
    decrementAddOn(state, action: PayloadAction<string>) {
      const code = action.payload;
      const current = state.quantities[code] || 0;
      if (current > 0) {
        state.quantities[code] = current - 1;
      }
    },
    setAddOnQuantity(state, action: PayloadAction<{ code: string; quantity: number }>) {
      const { code, quantity } = action.payload;
      state.quantities[code] = Math.max(0, quantity);
    },
    resetAddOns(state) {
      Object.keys(state.quantities).forEach((k) => {
        state.quantities[k] = 0;
      });
    },
    setAddOnsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAddOnsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setAddOns,
  incrementAddOn,
  decrementAddOn,
  setAddOnQuantity,
  resetAddOns,
  setAddOnsLoading,
  setAddOnsError,
} = addonsSlice.actions;

export default addonsSlice.reducer;
