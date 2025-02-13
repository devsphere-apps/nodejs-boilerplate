export class ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;

  private constructor(success: boolean, statusCode: number, data?: T, error?: string) {
    this.success = success;
    this.statusCode = statusCode;
    if (data) this.data = data;
    if (error) this.error = error;
  }

  static success<T>(statusCode: number, data: T): ApiResponse<T> {
    return new ApiResponse(true, statusCode, data);
  }

  static error<T>(statusCode: number, error: string): ApiResponse<T> {
    return new ApiResponse<T>(false, statusCode, undefined, error);
  }
} 