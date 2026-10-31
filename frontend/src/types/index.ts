export interface RoomOption {
  id: string;
  code: string;
  name: string;
  capacity: number;
  unitPrice: number;
  description: string;
  iconName: string;
  imageUrl?: string;
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
  imageUrl?: string;
  displayOrder: number;
}

export interface MealOption {
  id: string;
  code: string;
  name: string;
  pricePerPerson: number;
  description: string;
  iconName: string;
  imageUrl?: string;
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

// Shopping Cart & Booking Types
export interface CartItem {
  id: string; // Composite key e.g. "Room-conference-room"
  category: 'Room' | 'AddOn' | 'Meal';
  code: string;
  name: string;
  unitPrice: number;
  quantity: number;
  attendeeCount?: number;
  imageUrl?: string;
  subtotal: number;
}

export interface BookingItem {
  id: string;
  category: 'Room' | 'AddOn' | 'Meal' | string;
  itemCode: string;
  itemName: string;
  unitCost: number;
  quantity: number;
  subtotal: number;
  imageUrl?: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  organization?: string;
  eventName: string;
  eventDate: string;
  numberOfAttendees: number;
  status: string;
  roomsTotal: number;
  addOnsTotal: number;
  mealsTotal: number;
  grandTotal: number;
  specialRequests?: string;
  createdAt: string;
  confirmedAt?: string;
  items: BookingItem[];
}

export interface CreateBookingPayload {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  organization?: string;
  eventName: string;
  eventDate?: string;
  numberOfAttendees: number;
  specialRequests?: string;
  items: Array<{
    category: string;
    itemCode: string;
    quantity: number;
    numberOfPeople?: number;
  }>;
}

export interface CartSummaryResponse {
  items: BookingItem[];
  roomsTotal: number;
  addOnsTotal: number;
  mealsTotal: number;
  grandTotal: number;
  totalItemCount: number;
}
