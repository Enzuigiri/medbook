
export interface LogoutUseCase {
    execute(id: string): Promise<boolean>
}