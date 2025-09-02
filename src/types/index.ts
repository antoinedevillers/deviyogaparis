// Types pour les données de cours
export interface CourseInfo {
  type: string;
  day: string;
  date: string;
  time: string;
  location: string;
  amount: number;
}

// Types pour les données de session Stripe
export interface SessionData {
  id: string;
  payment_status: string;
  status: string;
  customer_email?: string;
  amount_total: number | null;
  metadata?: {
    course_type?: string;
    course_day?: string;
    course_date?: string;
    course_time?: string;
    course_location?: string;
  } | null;
}

// Types pour la réponse API session-details
export interface SessionApiResponse {
  success: boolean;
  session?: SessionData;
  error?: string;
}

// Types pour les erreurs
export interface ApiError extends Error {
  status?: number;
  response?: {
    data?: unknown;
  };
}

// Type pour les erreurs Stripe
export interface StripeError extends Error {
  type?: string;
  code?: string;
  decline_code?: string;
  param?: string;
}