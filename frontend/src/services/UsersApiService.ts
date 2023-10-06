import { ApiGroupPath } from "@/configs/api.config";
import type { User } from "@/types/users";
import { ApiService } from "./ApiService";

class UsersApiService extends ApiService {
  constructor() {
    super(ApiGroupPath.USERS);
  }

  async fetchAll(): Promise<User[]> {
    return await this.get<User[]>("");
  }
}

export const usersApiService: UsersApiService = new UsersApiService();
