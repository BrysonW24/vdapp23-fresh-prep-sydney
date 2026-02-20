// Shared Types for Next.js Application

/**
 * Generic API Response Wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
  path: string;
}

/**
 * Pagination Types
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Authentication Types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthSession {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  expires?: string;
}

/**
 * Notification Types
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Form Types
 */
export interface FormError {
  field: string;
  message: string;
}

export interface FormState {
  isLoading: boolean;
  error?: FormError;
  success?: string;
}

/**
 * Dialog Types
 */
export interface DialogState {
  isOpen: boolean;
  data?: any;
}

/**
 * Table Types
 */
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface TableState {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Common Error Types
 */
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public fields?: Record<string, string>
  ) {
    super('VALIDATION_ERROR', message, 400);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super('AUTH_REQUIRED', message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super('FORBIDDEN', message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super(
      'RATE_LIMIT',
      `Too many requests${retryAfter ? `. Retry after ${retryAfter} seconds` : ''}`,
      429
    );
    this.name = 'RateLimitError';
  }
}

// ---------------------------------------------------------------------------
// Meal Types
// ---------------------------------------------------------------------------

export interface MacroSummary {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface MealSummary {
  id: string
  name: string
  slug: string
  price: number
  image: string
  category: string
  shortDescription: string | null
  tags: string[]
  nutrition: MacroSummary | null
}

export interface MealDetail extends MealSummary {
  description: string
  images: string[]
  ingredients: string
  allergens: string[]
  reheatingInstructions: string | null
  servingSize: string | null
  shelfLife: string | null
  nutrition: MacroSummary & {
    fibre?: number | null
    sodium?: number | null
    sugar?: number | null
  } | null
}

// ---------------------------------------------------------------------------
// Cart Types
// ---------------------------------------------------------------------------

export interface CartItemClient {
  mealId: string
  name: string
  slug: string
  price: number
  image: string
  quantity: number
}

// ---------------------------------------------------------------------------
// Order Types
// ---------------------------------------------------------------------------

export interface OrderSummary {
  id: string
  orderNumber: string
  status: string
  total: number
  deliveryDate: string
  itemCount: number
  createdAt: string
}

export interface OrderDetail extends OrderSummary {
  items: { mealId: string; name: string; quantity: number; unitPrice: number; totalPrice: number }[]
  address: { street: string; suburb: string; postcode: string }
  deliverySlot: string | null
  notes: string | null
}

// ---------------------------------------------------------------------------
// Delivery Types
// ---------------------------------------------------------------------------

export interface DeliveryZoneInfo {
  id: string
  name: string
  postcode: string
  suburb: string
  deliveryDays: string[]
  deliveryFee: number
  cutoffHour: number
}

// ---------------------------------------------------------------------------
// Blog Types
// ---------------------------------------------------------------------------

export interface BlogPostSummary {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  category: string
  readTime: number | null
  publishedAt: string | null
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string
  metaDescription: string | null
  featuredImageAlt: string | null
  tags: string[]
  recipe: RecipeDetail | null
}

export interface RecipeDetail {
  prepTime: number
  cookTime: number
  servings: number
  difficulty: string
  ingredients: { amount: string; item: string }[]
  instructions: { step: number; text: string }[]
  nutrition: MacroSummary | null
  storageInstructions: string | null
  makeAheadTips: string | null
  mealPrepNotes: string | null
  cuisine: string | null
  recipeCategory: string | null
}
