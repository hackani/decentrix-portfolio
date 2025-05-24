export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormStatus {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
} 