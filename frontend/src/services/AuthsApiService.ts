import type { LoginPayload, SignupPayload } from "@/types/auths";
import { ApiService } from "./ApiService";
import { ApiGroupPath } from "@/configs/api.config";
import { User } from "@/types/users";

interface IAuthsApiServiceService {
  login(payload: LoginPayload): Promise<User>;
  signup(payload: SignupPayload): Promise<void>;
}

class AuthsApiServiceService
  extends ApiService
  implements IAuthsApiServiceService
{
  constructor() {
    super();
  }

  async login(payload: LoginPayload): Promise<User> {
    return await this.post<LoginPayload, User>(ApiGroupPath.LOGIN, payload);
  }

  async signup(payload: SignupPayload): Promise<void> {
    return await this.post<SignupPayload, void>(ApiGroupPath.SIGNUP, payload);
  }
}

export const authsApiServiceService: AuthsApiServiceService =
  new AuthsApiServiceService();
