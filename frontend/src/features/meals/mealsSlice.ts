import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealOption } from '../../types';

export interface MealItemState {
  selected: boolean;
  numberOfPeople: number;
}

export interface MealsState {
  items: MealOption[];
  selections: Record<string, MealItemState>;
  defaultAttendees: number;
  loading: boolean;
  error: string | null;
}

export const initialMeals: MealOption[] = [
  {
    id: '1',
    code: 'breakfast',
    name: 'Breakfast',
    pricePerPerson: 50,
    description: 'Fresh pastries, cinnamon rolls, organic berries, juices, and espresso.',
    iconName: 'breakfast',
    imageUrl: '/assets/images/meal-breakfast.jpg',
    displayOrder: 1,
  },
  {
    id: '2',
    code: 'lunch',
    name: 'Lunch',
    pricePerPerson: 60,
    description: 'Hot farm-to-table buffet, artisan bread, fresh salads, and desserts.',
    iconName: 'lunch',
    imageUrl: '/assets/images/meal-lunch.jpg',
    displayOrder: 2,
  },
  {
    id: '3',
    code: 'high-tea',
    name: 'High Tea',
    pricePerPerson: 25,
    description: 'Afternoon tea service with warm scones, clotted cream, and finger sandwiches.',
    iconName: 'high-tea',
    imageUrl: '/assets/images/meal-hightea.jpg',
    displayOrder: 3,
  },
  {
    id: '4',
    code: 'dinner',
    name: 'Dinner',
    pricePerPerson: 70,
    description: 'Three-course plated gala dinner banquet with curated culinary pairings.',
    iconName: 'dinner',
    imageUrl: '/assets/images/meal-dinner.jpg',
    displayOrder: 4,
  },
];

const initialState: MealsState = {
  items: initialMeals,
  selections: {
    breakfast: { selected: false, numberOfPeople: 30 },
    lunch: { selected: false, numberOfPeople: 30 },
    'high-tea': { selected: false, numberOfPeople: 30 },
    dinner: { selected: false, numberOfPeople: 30 },
  },
  defaultAttendees: 30,
  loading: false,
  error: null,
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMeals(state, action: PayloadAction<MealOption[]>) {
      state.items = action.payload;
      action.payload.forEach((m) => {
        if (!state.selections[m.code]) {
          state.selections[m.code] = { selected: false, numberOfPeople: state.defaultAttendees };
        }
      });
    },
    toggleMeal(state, action: PayloadAction<string>) {
      const code = action.payload;
      const current = state.selections[code] || { selected: false, numberOfPeople: state.defaultAttendees };
      state.selections[code] = {
        ...current,
        selected: !current.selected,
      };
    },
    setMealSelected(state, action: PayloadAction<{ code: string; selected: boolean }>) {
      const { code, selected } = action.payload;
      const current = state.selections[code] || { selected: false, numberOfPeople: state.defaultAttendees };
      state.selections[code] = {
        ...current,
        selected,
      };
    },
    setMealPeople(state, action: PayloadAction<{ code: string; numberOfPeople: number }>) {
      const { code, numberOfPeople } = action.payload;
      const current = state.selections[code] || { selected: false, numberOfPeople: state.defaultAttendees };
      state.selections[code] = {
        ...current,
        numberOfPeople: Math.max(0, numberOfPeople),
      };
    },
    setDefaultAttendees(state, action: PayloadAction<number>) {
      const attendees = Math.max(1, action.payload);
      state.defaultAttendees = attendees;
      // Also update any selected meals if desired or keep individual
      Object.keys(state.selections).forEach((code) => {
        state.selections[code].numberOfPeople = attendees;
      });
    },
    resetMeals(state) {
      Object.keys(state.selections).forEach((k) => {
        state.selections[k] = { selected: false, numberOfPeople: state.defaultAttendees };
      });
    },
    setMealsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setMealsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setMeals,
  toggleMeal,
  setMealSelected,
  setMealPeople,
  setDefaultAttendees,
  resetMeals,
  setMealsLoading,
  setMealsError,
} = mealsSlice.actions;

export default mealsSlice.reducer;

