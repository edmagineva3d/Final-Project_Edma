import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { EstimateItem } from '../types';

// Rooms Total
export const selectRoomsTotal = createSelector(
  [(state: RootState) => state.rooms.items, (state: RootState) => state.rooms.quantities],
  (items, quantities): number => {
    return items.reduce((total, room) => {
      const qty = quantities[room.code] || 0;
      return total + room.unitPrice * qty;
    }, 0);
  }
);

// AddOns Total
export const selectAddOnsTotal = createSelector(
  [(state: RootState) => state.addons.items, (state: RootState) => state.addons.quantities],
  (items, quantities): number => {
    return items.reduce((total, addon) => {
      const qty = quantities[addon.code] || 0;
      return total + addon.unitPrice * qty;
    }, 0);
  }
);

// Meals Total
export const selectMealsTotal = createSelector(
  [(state: RootState) => state.meals.items, (state: RootState) => state.meals.selections],
  (items, selections): number => {
    return items.reduce((total, meal) => {
      const selection = selections[meal.code];
      if (selection && selection.selected && selection.numberOfPeople > 0) {
        return total + meal.pricePerPerson * selection.numberOfPeople;
      }
      return total;
    }, 0);
  }
);

// Grand Total = Rooms + AddOns + Meals
export const selectGrandTotal = createSelector(
  [selectRoomsTotal, selectAddOnsTotal, selectMealsTotal],
  (roomsTotal, addOnsTotal, mealsTotal): number => {
    return roomsTotal + addOnsTotal + mealsTotal;
  }
);

// 4-Column Expense Summary Table items list for the Show Details popup
export const selectSelectedItemsList = createSelector(
  [
    (state: RootState) => state.rooms.items,
    (state: RootState) => state.rooms.quantities,
    (state: RootState) => state.addons.items,
    (state: RootState) => state.addons.quantities,
    (state: RootState) => state.meals.items,
    (state: RootState) => state.meals.selections,
  ],
  (rooms, roomQtys, addons, addonQtys, meals, mealSelections): EstimateItem[] => {
    const list: EstimateItem[] = [];

    // Rooms
    rooms.forEach((r) => {
      const qty = roomQtys[r.code] || 0;
      if (qty > 0) {
        list.push({
          category: 'Room',
          itemCode: r.code,
          itemName: r.name,
          unitCost: r.unitPrice,
          quantity: qty,
          subtotal: r.unitPrice * qty,
        });
      }
    });

    // AddOns
    addons.forEach((a) => {
      const qty = addonQtys[a.code] || 0;
      if (qty > 0) {
        list.push({
          category: 'AddOn',
          itemCode: a.code,
          itemName: a.name,
          unitCost: a.unitPrice,
          quantity: qty,
          subtotal: a.unitPrice * qty,
        });
      }
    });

    // Meals
    meals.forEach((m) => {
      const sel = mealSelections[m.code];
      if (sel && sel.selected && sel.numberOfPeople > 0) {
        list.push({
          category: 'Meal',
          itemCode: m.code,
          itemName: `${m.name} Catering`,
          unitCost: m.pricePerPerson,
          quantity: sel.numberOfPeople,
          subtotal: m.pricePerPerson * sel.numberOfPeople,
        });
      }
    });

    return list;
  }
);

// Total selected items count
export const selectTotalSelectedCount = createSelector(
  [
    (state: RootState) => state.rooms.quantities,
    (state: RootState) => state.addons.quantities,
    (state: RootState) => state.meals.selections,
  ],
  (roomQtys, addonQtys, mealSelections): number => {
    let count = 0;
    Object.values(roomQtys).forEach((q) => (count += q));
    Object.values(addonQtys).forEach((q) => (count += q));
    Object.values(mealSelections).forEach((s) => {
      if (s.selected && s.numberOfPeople > 0) count += 1;
    });
    return count;
  }
);

// Shopping Cart Selectors
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items): number => items.reduce((sum, item) => sum + (item.category === 'Meal' ? 1 : item.quantity), 0)
);

export const selectCartRoomsTotal = createSelector(
  [selectCartItems],
  (items): number =>
    items
      .filter((i) => i.category === 'Room')
      .reduce((sum, i) => sum + i.subtotal, 0)
);

export const selectCartAddOnsTotal = createSelector(
  [selectCartItems],
  (items): number =>
    items
      .filter((i) => i.category === 'AddOn')
      .reduce((sum, i) => sum + i.subtotal, 0)
);

export const selectCartMealsTotal = createSelector(
  [selectCartItems],
  (items): number =>
    items
      .filter((i) => i.category === 'Meal')
      .reduce((sum, i) => sum + i.subtotal, 0)
);

export const selectCartGrandTotal = createSelector(
  [selectCartItems],
  (items): number => items.reduce((sum, i) => sum + i.subtotal, 0)
);

export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;
export const selectIsCheckoutOpen = (state: RootState) => state.cart.isCheckoutOpen;
export const selectIsBookingsDrawerOpen = (state: RootState) => state.cart.isBookingsDrawerOpen;
export const selectConfirmedBooking = (state: RootState) => state.cart.confirmedBooking;
export const selectBookingsHistory = (state: RootState) => state.cart.bookingsHistory;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

