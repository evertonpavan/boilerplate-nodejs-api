import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "User Test 1",
      email: "user1@user.com",
      password: "pass",
    };

    const result = await createUserUseCase.execute(user);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("email");
  });

  it("Should not be able to create an user with existent email", async () => {
    const user: ICreateUserDTO = {
      name: "User Test 1",
      email: "user1@user.com",
      password: "pass",
    };

    await createUserUseCase.execute(user);

    await expect(
      createUserUseCase.execute({
        name: "User Test 1",
        email: "user1@user.com",
        password: "pass",
      })
    ).rejects.toEqual(new AppError("User already exists!"));
  });
});
