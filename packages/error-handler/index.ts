export class AppError extends Error {
    public readOnly statusCode: number;
    public readOnly isOperational: boolean; 
}