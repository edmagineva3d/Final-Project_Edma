import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Booking, CartItem, CreateBookingPayload } from '../../types';
import { api } from '../../services/api';

const LOCAL_STORAGE_KEY = 'gatherco_cart_items';

function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse cart from localStorage', e);
  }
  return [];
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  isBookingsDrawerOpen: boolean;
  confirmedBooking: Booking | null;
  bookingsHistory: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: loadInitialCart(),
  isOpen: false,
  isCheckoutOpen: false,
  isBookingsDrawerOpen: false,
  confirmedBooking: null,
  bookingsHistory: [],
  loading: false,
  error: null,
};

export const createBookingThunk = createAsyncThunk<Booking, CreateBookingPayload>(
  'cart/createBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.createBooking(payload);
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to confirm booking';
      return rejectWithValue(message);
    }
  }
);

export const fetchBookingsThunk = createAsyncThunk<Booking[]>(
  'cart/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getBookings();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load bookings';
      return rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        category: 'Room' | 'AddOn' | 'Meal';
        code: string;
        name: string;
        unitPrice: number;
        quantity: number;
        attendeeCount?: number;
        imageUrl?: string;
      }>
    ) => {
      const item = action.payload;
      const itemId = `${item.category}-${item.code}`;
      const existingIndex = state.items.findIndex(
        (i) => i.category === item.category && i.code === item.code
      );

      if (existingIndex >= 0) {
        const existing = state.items[existingIndex];
        let newQty = existing.quantity + item.quantity;
        if (item.category === 'Meal' && item.attendeeCount) {
          newQty = item.attendeeCount;
        }
        const updatedItem: CartItem = {
          ...existing,
          quantity: newQty,
          attendeeCount: item.attendeeCount ?? existing.attendeeCount,
          subtotal: existing.unitPrice * newQty,
        };
        state.items[existingIndex] = updatedItem;
      } else {
        const newItem: CartItem = {
          id: itemId,
          category: item.category,
          code: item.code,
          name: item.name,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          attendeeCount: item.attendeeCount,
          imageUrl: item.imageUrl,
          subtotal: item.unitPrice * item.quantity,
        };
        state.items.push(newItem);
      }
      saveCart(state.items);
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<{ category: string; code: string; quantity: number }>
    ) => {
      const { category, code, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(
          (i) => !(i.category === category && i.code === code)
        );
      } else {
        const item = state.items.find(
          (i) => i.category === category && i.code === code
        );
        if (item) {
          item.quantity = quantity;
          if (item.category === 'Meal') {
            item.attendeeCount = quantity;
          }
          item.subtotal = item.unitPrice * quantity;
        }
      }
      saveCart(state.items);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ category: string; code: string }>
    ) => {
      const { category, code } = action.payload;
      state.items = state.items.filter(
        (i) => !(i.category === category && i.code === code)
      );
      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },

    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },

    openCheckout: (state) => {
      state.isCheckoutOpen = true;
    },
    closeCheckout: (state) => {
      state.isCheckoutOpen = false;
    },

    openBookingsDrawer: (state) => {
      state.isBookingsDrawerOpen = true;
    },
    closeBookingsDrawer: (state) => {
      state.isBookingsDrawerOpen = false;
    },

    setConfirmedBooking: (state, action: PayloadAction<Booking | null>) => {
      state.confirmedBooking = action.payload;
    },

    clearConfirmedBooking: (state) => {
      state.confirmedBooking = null;
    },
  },
  extraReducers: (builder) => {
    // createBookingThunk
    builder.addCase(createBookingThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBookingThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.confirmedBooking = action.payload;
      state.items = [];
      saveCart([]);
      state.isCheckoutOpen = false;
      state.isOpen = false;
      state.bookingsHistory.unshift(action.payload);
    });
    builder.addCase(createBookingThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Failed to submit conference reservation';
    });

    // fetchBookingsThunk
    builder.addCase(fetchBookingsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBookingsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingsHistory = action.payload;
    });
    builder.addCase(fetchBookingsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Failed to fetch bookings';
    });
  },
});

export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  openCart,
  closeCart,
  openCheckout,
  closeCheckout,
  openBookingsDrawer,
  closeBookingsDrawer,
  setConfirmedBooking,
  clearConfirmedBooking,
} = cartSlice.actions;

export default cartSlice.reducer;

