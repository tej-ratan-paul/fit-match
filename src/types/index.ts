// Type definitions for Fitmatch app

export type UserRole = 'user' | 'trainer' | 'admin';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type WorkoutType = 
  | 'strength_training'
  | 'bodybuilding'
  | 'fat_loss'
  | 'powerlifting'
  | 'crossfit'
  | 'cardio'
  | 'yoga'
  | 'hiit'
  | 'flexibility'
  | 'sports_specific';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  photo?: string;
  role: UserRole;
  fitnessGoals: string[];
  experienceLevel: ExperienceLevel;
  preferredWorkoutTypes: WorkoutType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Trainer {
  id: string;
  userId: string;
  name: string;
  photo: string;
  bio: string;
  certifications: string[];
  specializations: WorkoutType[];
  pricePerSession: number;
  currency: string;
  gymName: string;
  gymAddress: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  availableSlots: TimeSlot[];
  isAvailable: boolean;
  yearsOfExperience: number;
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  trainerId: string;
  trainer: Trainer;
  date: string;
  timeSlot: TimeSlot;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  currency: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  trainerId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface FilterOptions {
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  minPrice?: number;
  maxPrice?: number;
  specializations?: WorkoutType[];
  minRating?: number;
  availableDate?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'booking_confirmation' | 'session_reminder' | 'trainer_available' | 'payment' | 'general';
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  trainers: Trainer[];
  bookings: Booking[];
  notifications: Notification[];
  filters: FilterOptions;
}
