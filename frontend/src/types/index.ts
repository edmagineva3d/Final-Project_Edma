export interface RoomOption {
  id: string;
  code: string;
  name: string;
  capacity: number;
  unitPrice: number;
  description: string;
  iconName: string;
  displayOrder: number;
}

export interface AddOnOption {
  id: string;
  code: string;
  name: string;
  unitPrice: number;
  category: string;
  description: string;
  iconName: string;
  displayOrder: number;
}

export interface MealOption {
  id: string;
  code: string;
  name: string;
  pricePerPerson: number;
  description: string;
  iconName: string;
  displayOrder: number;
}

export interface ConferenceCatalog {
  rooms: RoomOption[];
  addOns: AddOnOption[];
  meals: MealOption[];
}

export interface EstimateItem {
  category: 'Room' | 'AddOn' | 'Meal' | string;
  itemCode: string;
  itemName: string;
  unitCost: number;
  quantity: number;
  subtotal: number;
}

export interface ExpenseEstimate {
  id?: string;
  eventId?: string;
  clientName: string;
  clientEmail: string;
  eventName: string;
  numberOfAttendees: number;
  roomsTotal: number;
  addOnsTotal: number;
  mealsTotal: number;
  grandTotal: number;
  notes?: string;
  createdAt?: string;
  items: EstimateItem[];
}

export interface CreateEstimatePayload {
  eventId?: string;
  clientName: string;
  clientEmail: string;
  eventName: string;
  numberOfAttendees: number;
  rooms: Array<{ code: string; quantity: number }>;
  addOns: Array<{ code: string; quantity: number }>;
  meals: Array<{ code: string; numberOfPeople: number }>;
  notes?: string;
}
