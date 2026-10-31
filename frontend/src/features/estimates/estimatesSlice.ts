import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpenseEstimate } from '../../types';

export interface EstimatesState {
  isDetailsModalOpen: boolean;
  isSavedQuotesOpen: boolean;
  savedEstimates: ExpenseEstimate[];
  activeEstimate: ExpenseEstimate | null;
  saving: boolean;
  saveError: string | null;
  saveSuccessMessage: string | null;
  clientName: string;
  clientEmail: string;
  eventName: string;
  notes: string;
}

const initialState: EstimatesState = {
  isDetailsModalOpen: false,
  isSavedQuotesOpen: false,
  savedEstimates: [],
  activeEstimate: null,
  saving: false,
  saveError: null,
  saveSuccessMessage: null,
  clientName: '',
  clientEmail: '',
  eventName: 'Gather & Co. Annual Conference',
  notes: '',
};

const estimatesSlice = createSlice({
  name: 'estimates',
  initialState,
  reducers: {
    openDetailsModal(state) {
      state.isDetailsModalOpen = true;
      state.saveSuccessMessage = null;
      state.saveError = null;
    },
    closeDetailsModal(state) {
      state.isDetailsModalOpen = false;
    },
    toggleSavedQuotes(state) {
      state.isSavedQuotesOpen = !state.isSavedQuotesOpen;
    },
    setSavedQuotesOpen(state, action: PayloadAction<boolean>) {
      state.isSavedQuotesOpen = action.payload;
    },
    setSavedEstimates(state, action: PayloadAction<ExpenseEstimate[]>) {
      state.savedEstimates = action.payload;
    },
    addSavedEstimate(state, action: PayloadAction<ExpenseEstimate>) {
      state.savedEstimates.unshift(action.payload);
      state.activeEstimate = action.payload;
    },
    setActiveEstimate(state, action: PayloadAction<ExpenseEstimate | null>) {
      state.activeEstimate = action.payload;
    },
    setSaving(state, action: PayloadAction<boolean>) {
      state.saving = action.payload;
    },
    setSaveError(state, action: PayloadAction<string | null>) {
      state.saveError = action.payload;
      state.saveSuccessMessage = null;
    },
    setSaveSuccessMessage(state, action: PayloadAction<string | null>) {
      state.saveSuccessMessage = action.payload;
      state.saveError = null;
    },
    updateClientDetails(
      state,
      action: PayloadAction<{
        clientName?: string;
        clientEmail?: string;
        eventName?: string;
        notes?: string;
      }>
    ) {
      if (action.payload.clientName !== undefined) state.clientName = action.payload.clientName;
      if (action.payload.clientEmail !== undefined) state.clientEmail = action.payload.clientEmail;
      if (action.payload.eventName !== undefined) state.eventName = action.payload.eventName;
      if (action.payload.notes !== undefined) state.notes = action.payload.notes;
    },
  },
});

export const {
  openDetailsModal,
  closeDetailsModal,
  toggleSavedQuotes,
  setSavedQuotesOpen,
  setSavedEstimates,
  addSavedEstimate,
  setActiveEstimate,
  setSaving,
  setSaveError,
  setSaveSuccessMessage,
  updateClientDetails,
} = estimatesSlice.actions;

export default estimatesSlice.reducer;

