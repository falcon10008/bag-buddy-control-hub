
import { Luggage, User, DashboardStats } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Utility for random date in the last 30 days
const getRandomDate = (daysBack = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    profileImage: "/placeholder.svg",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    profileImage: "/placeholder.svg",
  },
  {
    id: "user3",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
    profileImage: "/placeholder.svg",
  },
];

// Mock Luggage Items
export const mockLuggage: Luggage[] = [
  {
    id: uuidv4(),
    ownerId: "user1",
    ownerName: "John Doe",
    color: "Black",
    weight: 12.5,
    status: "in-transit",
    description: "Large hardshell suitcase with wheels",
    tags: ["fragile", "electronics", "clothing"],
    imageUrl: "/placeholder.svg",
    qrCode: "QR12345",
    checkInDate: getRandomDate(5),
    lastUpdated: getRandomDate(2),
    location: "Terminal B",
    flight: "KL1235",
  },
  {
    id: uuidv4(),
    ownerId: "user1",
    ownerName: "John Doe",
    color: "Blue",
    weight: 8.2,
    status: "delivered",
    description: "Medium fabric suitcase with TSA lock",
    tags: ["business", "clothing"],
    imageUrl: "/placeholder.svg",
    qrCode: "QR23456",
    checkInDate: getRandomDate(10),
    lastUpdated: getRandomDate(1),
    location: "Baggage Claim 3",
    flight: "BA789",
  },
  {
    id: uuidv4(),
    ownerId: "user2",
    ownerName: "Jane Smith",
    color: "Red",
    weight: 15.8,
    status: "lost",
    description: "Large fabric suitcase with stickers",
    tags: ["vacation", "personal", "clothing"],
    imageUrl: "/placeholder.svg",
    qrCode: "QR34567",
    checkInDate: getRandomDate(15),
    lastUpdated: getRandomDate(3),
    location: "Unknown",
    flight: "DL456",
  },
  {
    id: uuidv4(),
    ownerId: "user3",
    ownerName: "Alice Johnson",
    color: "Green",
    weight: 9.3,
    status: "checked-in",
    description: "Backpack with laptop compartment",
    tags: ["electronics", "personal"],
    imageUrl: "/placeholder.svg",
    qrCode: "QR45678",
    checkInDate: getRandomDate(2),
    lastUpdated: getRandomDate(0),
    location: "Terminal A",
    flight: "AA123",
  },
  {
    id: uuidv4(),
    ownerId: "user3",
    ownerName: "Alice Johnson",
    color: "Purple",
    weight: 11.7,
    status: "recovered",
    description: "Medium hardshell suitcase with combination lock",
    tags: ["fragile", "clothing", "personal"],
    imageUrl: "/placeholder.svg",
    qrCode: "QR56789",
    checkInDate: getRandomDate(25),
    lastUpdated: getRandomDate(5),
    location: "Lost & Found Office",
    flight: "UA789",
  },
];

// Mock Dashboard Stats
export const getDashboardStats = (): DashboardStats => {
  const activeCount = mockLuggage.filter(
    (l) => l.status === "checked-in" || l.status === "in-transit"
  ).length;
  const lostCount = mockLuggage.filter((l) => l.status === "lost").length;
  const recoveredCount = mockLuggage.filter((l) => l.status === "recovered").length;

  return {
    total: mockLuggage.length,
    active: activeCount,
    lost: lostCount,
    recovered: recoveredCount,
  };
};

// Current logged in mock user
export const currentUser: User = mockUsers[0];
