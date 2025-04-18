
export type LuggageStatus = "checked-in" | "in-transit" | "delivered" | "lost" | "recovered";

export interface Luggage {
  id: string;
  ownerId: string;
  ownerName: string;
  color: string;
  weight: number; // in kg
  status: LuggageStatus;
  description?: string;
  tags: string[];
  imageUrl?: string;
  qrCode?: string;
  checkInDate: string;
  lastUpdated: string;
  location?: string;
  flight?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  profileImage?: string;
}

export interface DashboardStats {
  total: number;
  active: number;
  lost: number;
  recovered: number;
}
