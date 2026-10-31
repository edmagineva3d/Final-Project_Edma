import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { RootState } from '../store';
import { setRooms, setRoomsError, setRoomsLoading } from './rooms/roomsSlice';
import { setAddOns, setAddOnsError, setAddOnsLoading } from './addons/addonsSlice';
import { setMeals, setMealsError, setMealsLoading } from './meals/mealsSlice';
import {
  addSavedEstimate,
  setSavedEstimates,
  setSaveError,
  setSaveSuccessMessage,
  setSaving,
} from './estimates/estimatesSlice';
import { CreateEstimatePayload } from '../types';

export const loadCatalogThunk = createAsyncThunk(
  'catalog/loadCatalog',
  async (_, { dispatch }) => {
    dispatch(setRoomsLoading(true));
    dispatch(setAddOnsLoading(true));
    dispatch(setMealsLoading(true));
    try {
      const catalog = await api.getCatalog();
      if (catalog.rooms && catalog.rooms.length > 0) {
        dispatch(setRooms(catalog.rooms));
      }
      if (catalog.addOns && catalog.addOns.length > 0) {
        dispatch(setAddOns(catalog.addOns));
      }
      if (catalog.meals && catalog.meals.length > 0) {
        dispatch(setMeals(catalog.meals));
      }
    } catch (err: any) {
      const msg = err.message || 'Failed to load catalog from server';
      dispatch(setRoomsError(msg));
      dispatch(setAddOnsError(msg));
      dispatch(setMealsError(msg));
    } finally {
      dispatch(setRoomsLoading(false));
      dispatch(setAddOnsLoading(false));
      dispatch(setMealsLoading(false));
    }
  }
);

export const saveCurrentEstimateThunk = createAsyncThunk(
  'estimates/saveCurrentEstimate',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { rooms, addons, meals, estimates } = state;

    const roomSelections = Object.entries(rooms.quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([code, quantity]) => ({ code, quantity }));

    const addonSelections = Object.entries(addons.quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([code, quantity]) => ({ code, quantity }));

    const mealSelections = Object.entries(meals.selections)
      .filter(([_, sel]) => sel.selected && sel.numberOfPeople > 0)
      .map(([code, sel]) => ({ code, numberOfPeople: sel.numberOfPeople }));

    if (roomSelections.length === 0 && addonSelections.length === 0 && mealSelections.length === 0) {
      dispatch(setSaveError('Please select at least one room, equipment add-on, or meal before saving.'));
      return;
    }

    const payload: CreateEstimatePayload = {
      clientName: estimates.clientName.trim() || 'Distinguished Host',
      clientEmail: estimates.clientEmail.trim() || 'host@gatherco.events',
      eventName: estimates.eventName.trim() || 'Annual Conference',
      numberOfAttendees: meals.defaultAttendees || 30,
      rooms: roomSelections,
      addOns: addonSelections,
      meals: mealSelections,
      notes: estimates.notes || undefined,
    };

    dispatch(setSaving(true));
    dispatch(setSaveError(null));

    try {
      const saved = await api.saveEstimate(payload);
      dispatch(addSavedEstimate(saved));
      dispatch(setSaveSuccessMessage(`Estimate #${saved.id?.slice(0, 8)} saved successfully to database!`));
      return saved;
    } catch (err: any) {
      const msg = err.message || 'Error persisting estimate to server.';
      dispatch(setSaveError(msg));
      throw err;
    } finally {
      dispatch(setSaving(false));
    }
  }
);

export const loadSavedEstimatesThunk = createAsyncThunk(
  'estimates/loadSavedEstimates',
  async (_, { dispatch }) => {
    try {
      const list = await api.getSavedEstimates();
      dispatch(setSavedEstimates(list));
      return list;
    } catch (err: any) {
      console.warn('Could not fetch saved estimates history', err);
    }
  }
);

