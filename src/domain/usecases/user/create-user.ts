export type createUserDto = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserResultDto = {
  accessToken: string;
};

export interface CreateUser {
  execute(dto: createUserDto): Promise<CreateUserResultDto>;
}
