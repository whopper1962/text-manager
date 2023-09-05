import { ApiGroupPath } from "@/configs/api.config";
import type { User } from "@/types/users";
import { ApiService } from "./ApiService";

interface IUsersApiService {
  fetchAll(): Promise<User[]>;
}

class UsersApiService extends ApiService implements IUsersApiService {
  constructor() {
    super(ApiGroupPath.USERS);
  }

  async fetchAll(): Promise<User[]> {
    return await this.get<User[]>("");
  }
}

export const usersApiService: UsersApiService = new UsersApiService();
