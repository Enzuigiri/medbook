import { User } from "../src/domain/entities/user";
import { GetAllUsersUseCase } from "../src/domain/interfaces/use-cases/user/get-all-users";
import { CreateUserUseCase } from "../src/domain/interfaces/use-cases/user/create-user";
import UserRouter from "../src/presentation/routers/user-router"
import server from "../src/server";
import request from "supertest";

class MockGetAllUsersUseCase implements GetAllUsersUseCase {
    execute(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}

class MockCreatedUserUseCase implements CreateUserUseCase {
    execute(user: User): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}

describe("User Router", () => {
    let mockGetAllUsersUseCase: MockGetAllUsersUseCase
    let mockCreatedUserUseCase: MockCreatedUserUseCase

    beforeAll(() => {
        mockGetAllUsersUseCase = new MockGetAllUsersUseCase()
        mockCreatedUserUseCase = new MockCreatedUserUseCase()
        server.use("/user", UserRouter(mockCreatedUserUseCase, mockGetAllUsersUseCase))
    })

    beforeEach(() => {
        jest.clearAllMocks
    })

    describe("GET /user", () => {
        test("should return 200 with data", async () => {
            const ExpectedData = [{name: "John Doe", email: "johndoe@gmail.com"}]
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/user")

            expect(response.status).toBe(200)
            expect(mockGetAllUsersUseCase.execute).toHaveBeenCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)
        })

        test("Get /user returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/user")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        })
    })

    describe("POST /user", () => {
        const InputData = [{id: "1", name: "John Doe", email: "johndoe@gmail.com", password: "asdasd"}]

        test("should return with response 201", async () => {
            jest.spyOn(mockCreatedUserUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).post("/user").send(InputData)
            expect(response.status).toBe(201)
        })

        test("POST /user return 500 on use case error", async () => {
            jest.spyOn(mockCreatedUserUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/user").send(InputData)
            expect(response.status).toBe(500)
        })
    })
})