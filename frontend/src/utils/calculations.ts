/**
 * Expense Calculation Verification Utilities
 * Confirms calculations adhere strictly to the project specifications and PDF requirements.
 */

export interface PricingItem {
  code: string;
  unitPrice: number;
  quantity: number;
}

export function calculateSubtotal(unitPrice: number, quantity: number): number {
  if (quantity < 0 || unitPrice < 0) return 0;
  return unitPrice * quantity;
}

export function calculateCategoryTotal(items: PricingItem[]): number {
  return items.reduce((sum, item) => sum + calculateSubtotal(item.unitPrice, item.quantity), 0);
}

export function calculateGrandTotal(roomsTotal: number, addOnsTotal: number, mealsTotal: number): number {
  return roomsTotal + addOnsTotal + mealsTotal;
}

/**
 * Validates the PDF example from Section 3.F:
 * Auditorium Hall: 2 @ $5,500 = $11,000
 * Speakers: 3 @ $35 = $105
 * Breakfast: 50 @ $50 = $2,500
 * Grand Total: $13,605
 */
export function verifyPdfExampleCalculation(): boolean {
  const roomsTotal = calculateSubtotal(5500, 2); // 11000
  const addOnsTotal = calculateSubtotal(35, 3);   // 105
  const mealsTotal = calculateSubtotal(50, 50);   // 2500
  const grandTotal = calculateGrandTotal(roomsTotal, addOnsTotal, mealsTotal);

  return roomsTotal === 11000 && addOnsTotal === 105 && mealsTotal === 2500 && grandTotal === 13605;
}
