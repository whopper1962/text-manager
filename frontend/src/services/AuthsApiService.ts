import type { LoginPayload, SignupPayload } from "@/types/auths";
import { ApiService } from "./ApiService";
import { ApiGroupPath } from "@/configs/api.config";
import { User } from "@/types/users";

class AuthsApiServiceService extends ApiService {
  constructor() {
    super();
  }

  async login(payload: LoginPayload): Promise<User> {
    return await this.post<User, LoginPayload>(ApiGroupPath.LOGIN, payload);
  }

  async signup(payload: SignupPayload): Promise<void> {
    return await this.post<void, SignupPayload>(ApiGroupPath.SIGNUP, payload);
  }
}

export const authsApiServiceService: AuthsApiServiceService =
  new AuthsApiServiceService();
