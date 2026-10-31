import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomOption } from '../../types';

export interface RoomsState {
  items: RoomOption[];
  quantities: Record<string, number>;
  loading: boolean;
  error: string | null;
}

export const initialRooms: RoomOption[] = [
  {
    id: '1',
    code: 'auditorium-hall',
    name: 'Auditorium Hall',
    capacity: 200,
    unitPrice: 5500,
    description: 'Grand tiered hall with theatrical acoustics and stage for plenary sessions.',
    iconName: 'auditorium',
    displayOrder: 1,
  },
  {
    id: '2',
    code: 'conference-room',
    name: 'Conference Room',
    capacity: 15,
    unitPrice: 3500,
    description: 'Executive boardroom suite for roundtables and high-level strategy meetings.',
    iconName: 'conference',
    displayOrder: 2,
  },
  {
    id: '3',
    code: 'presentation-room',
    name: 'Presentation Room',
    capacity: 50,
    unitPrice: 700,
    description: 'Modern seminar space with flexible seating and presentation display.',
    iconName: 'presentation',
    displayOrder: 3,
  },
  {
    id: '4',
    code: 'large-meeting-room',
    name: 'Large Meeting Room',
    capacity: 10,
    unitPrice: 900,
    description: 'Spacious collaborative workspace equipped for dynamic team workshops.',
    iconName: 'large-meeting',
    displayOrder: 4,
  },
  {
    id: '5',
    code: 'small-meeting-room',
    name: 'Small Meeting Room',
    capacity: 5,
    unitPrice: 1100,
    description: 'Intimate breakout room for confidential discussions and private sessions.',
    iconName: 'small-meeting',
    displayOrder: 5,
  },
];

const initialState: RoomsState = {
  items: initialRooms,
  quantities: {
    'auditorium-hall': 0,
    'conference-room': 0,
    'presentation-room': 0,
    'large-meeting-room': 0,
    'small-meeting-room': 0,
  },
  loading: false,
  error: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<RoomOption[]>) {
      state.items = action.payload;
      action.payload.forEach((r) => {
        if (state.quantities[r.code] === undefined) {
          state.quantities[r.code] = 0;
        }
      });
    },
    incrementRoom(state, action: PayloadAction<string>) {
      const code = action.payload;
      state.quantities[code] = (state.quantities[code] || 0) + 1;
    },
    decrementRoom(state, action: PayloadAction<string>) {
      const code = action.payload;
      const current = state.quantities[code] || 0;
      if (current > 0) {
        state.quantities[code] = current - 1;
      }
    },
    setRoomQuantity(state, action: PayloadAction<{ code: string; quantity: number }>) {
      const { code, quantity } = action.payload;
      state.quantities[code] = Math.max(0, quantity);
    },
    resetRooms(state) {
      Object.keys(state.quantities).forEach((k) => {
        state.quantities[k] = 0;
      });
    },
    setRoomsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setRoomsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setRooms,
  incrementRoom,
  decrementRoom,
  setRoomQuantity,
  resetRooms,
  setRoomsLoading,
  setRoomsError,
} = roomsSlice.actions;

export default roomsSlice.reducer;
