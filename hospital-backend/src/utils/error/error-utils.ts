import { IError, IErrorMessage } from "./error";

export class RequestError extends Error {
    private readonly data: IErrorMessage;

    constructor(data: IErrorMessage) {
        super(data.message)
        Object.setPrototypeOf(this, RequestError.prototype);
        this.data = data;
        this.name = 'RequestError';
    }

    getErrorCode(): number {
        return this.data.code_error;
    }
}

export class ErrorUtils implements IError{
    static error =  new ErrorUtils()

    badRequestException(data: IErrorMessage): void {
        data.code_error = 400
        throw new RequestError(data);
    }

    internalServerErrorException(data?: IErrorMessage): void {
        data.code_error = 500
        throw new RequestError(data);
    }
    forbiddenException(data?: IErrorMessage): void {
        data.code_error = 300
        throw new RequestError(data);
    }
    unauthorizedException(data?: IErrorMessage): void {
        data.code_error = 401
        throw new RequestError(data);
    }

}