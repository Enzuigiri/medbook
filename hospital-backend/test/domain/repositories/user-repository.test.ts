import { UserDataSource } from "../../../src/data/interfaces/user-data-source";
import { User } from "../../../src/domain/entities/user";
import { UserRepository } from "../../../src/domain/interfaces/repositories/user-repository";
import { UserRepositoryImpl } from "../../../src/domain/repositories/user-repository";

class MockUserDataSource implements UserDataSource {
  createUser(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}

describe("User Repository", () => {
  let mockUserDataSource: UserDataSource;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserDataSource = new MockUserDataSource();
    mockUserRepository = new UserRepositoryImpl(mockUserDataSource);
  });

  describe("getAllUsers", () => {
    test("should return data", async () => {
        const expectedData = [{name: "John Doe", email: "johndoe@gmail.com"}]
        jest.spyOn(mockUserRepository, "getUsers").mockImplementation(() => Promise.resolve(expectedData))
        const result = await mockUserRepository.getUsers()
        expect(result).toBe(expectedData)
    })
  })

  describe("createUSer",() => {
    test("should return true", async () => {
        const inputData = {name: "John Doe", email: "johndoe@gmail.com"}
        jest.spyOn(mockUserRepository, "createUser").mockImplementation(() => Promise.resolve(true))
        const result = await mockUserRepository.createUser(inputData)
        expect(result).toBe(true)
    })
  })
});
