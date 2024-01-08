import { User } from "../../../src/domain/entities/user";
import { UserRepository } from "../../../src/domain/interfaces/repositories/user-repository";

describe("Create user usecase", () => {
    class MockUserRepository implements UserRepository {
        createUser(user: User): Promise<Boolean> {
            throw new Error("Method not implemented.");
        }
        getUsers(): Promise<User[]> {
            throw new Error("Method not implemented.");
        }
    }

    let mockUserRepository: MockUserRepository;

    beforeEach(() => {
        mockUserRepository = new MockUserRepository()
        jest.clearAllMocks
    })

    test("should return true", async () => {
        const InputData = {id: "1", name: "John Doe", email: "johndoe@gmail.com", password: "asdasd"}

        jest.spyOn(mockUserRepository, "createUser").mockImplementation(() => Promise.resolve(true) )
        let result = await mockUserRepository.createUser(InputData)
        expect(result).toBe(true)
    })
})