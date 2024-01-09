export interface IErrorMessage {
    message: string,
    code_error?: number
}

export interface IError {
    badRequestException(data: IErrorMessage): void;
    internalServerErrorException(data?: IErrorMessage): void;
    forbiddenException(data?: IErrorMessage): void;
    unauthorizedException(data?: IErrorMessage): void;
}