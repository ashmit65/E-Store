export class AppError extends Error {
    public readOnly statusCode: number;
    public readOnly isOperational: boolean; 
    public readOnly details? : any;

    constructor(
        message: string,
        statusCode: number,
        isOperational = true,
        details?: any
    )
}