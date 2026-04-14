export * from './error-middleware'; 

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean; 
    public readonly details? : any;

    constructor(
        message: string,
        statusCode: number,
        isOperational = true,
        details?: any
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        Error.captureStackTrace(this);
    }
}

// Not found error
export class NotFoundError extends AppError {
    constructor(message = 'Resources not found') {
        super(message, 404);
    }
}

// validation Error (use for Joi/ zod/ react-hook-form validation error)
export class ValidationError extends AppError {
    constructor(message = 'Invalid Request data', details?: any){
        super(message, 400, true, details)
    }
}

// Authentication Error
export class AuthError extends AppError {
    constructor(message = 'Unauthorizes'){
        super(message, 401)
    }
}

// Forbidden Error (for Insufficient Permissions)
export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden Access'){
        super(message, 403)
    }
}

// Database Error (For MongoDB/Postgres Errors)
export class DatabaseError extends AppError {
    constructor(message = 'Database error', details?:any){
        super(message, 500, true, details);
    }
}

// Rate limiting Error (If user exceeds API Limits) 
export class RateLimitError extends AppError {
    constructor(message = 'Too many requests, Please try again later'){
        super(message, 429)
    }
}