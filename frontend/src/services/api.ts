import {
  ConferenceCatalog,
  CreateEstimatePayload,
  ExpenseEstimate,
  RoomOption,
  AddOnOption,
  MealOption,
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMessage = `Server error: ${res.status} ${res.statusText}`;
    try {
      const errorJson = await res.json();
      if (errorJson.detail) {
        errorMessage = errorJson.detail;
      } else if (errorJson.title) {
        errorMessage = errorJson.title;
      } else if (errorJson.error) {
        errorMessage = errorJson.error;
      } else if (typeof errorJson === 'string') {
        errorMessage = errorJson;
      }
    } catch {
      // Ignore json parse error and keep statusText
    }
    throw new ApiError(errorMessage, res.status);
  }
  return res.json() as Promise<T>;
}

export const api = {
  // Fetch full catalog (consolidated endpoint or parallel fetches)
  async getCatalog(): Promise<ConferenceCatalog> {
    try {
      const res = await fetch(`${API_BASE}/catalog`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Consolidated /catalog failed, falling back to individual endpoints', e);
    }

    // Fallback: parallel fetches
    const [roomsRes, addonsRes, mealsRes] = await Promise.all([
      fetch(`${API_BASE}/rooms`),
      fetch(`${API_BASE}/addons`),
      fetch(`${API_BASE}/meals`),
    ]);

    const rooms: RoomOption[] = await handleResponse(roomsRes);
    const addOns: AddOnOption[] = await handleResponse(addonsRes);
    const meals: MealOption[] = await handleResponse(mealsRes);

    return { rooms, addOns, meals };
  },

  // Authoritative server-side calculation preview
  async calculateEstimate(payload: CreateEstimatePayload): Promise<ExpenseEstimate> {
    const res = await fetch(`${API_BASE}/estimates/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<ExpenseEstimate>(res);
  },

  // Persist estimate to SQLite database
  async saveEstimate(payload: CreateEstimatePayload): Promise<ExpenseEstimate> {
    const res = await fetch(`${API_BASE}/estimates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<ExpenseEstimate>(res);
  },

  // Retrieve saved estimates list
  async getSavedEstimates(): Promise<ExpenseEstimate[]> {
    const res = await fetch(`${API_BASE}/estimates`);
    return handleResponse<ExpenseEstimate[]>(res);
  },

  // Retrieve single estimate by ID
  async getEstimateById(id: string): Promise<ExpenseEstimate> {
    const res = await fetch(`${API_BASE}/estimates/${id}`);
    return handleResponse<ExpenseEstimate>(res);
  },
};
