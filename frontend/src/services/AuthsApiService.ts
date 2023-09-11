import { ApiGroupPath } from "@/configs/api.config";
import type { LoginPayload, SignupPayload } from "@/types/auths";
import { ApiService } from "./ApiService";

interface IAuthsApiServiceService {
  login(payload: LoginPayload): Promise<void>;
  signup(payload: SignupPayload): Promise<void>;
}

class AuthsApiServiceService
  extends ApiService
  implements IAuthsApiServiceService
{
  constructor() {
    super(ApiGroupPath.LOGIN);
  }

  async login(payload: LoginPayload): Promise<void> {
    return await this.post<LoginPayload, void>("", payload);
  }

  async signup(payload: SignupPayload): Promise<void> {
    return await this.post<SignupPayload, void>("", payload);
  }
}

export const authsApiServiceService: AuthsApiServiceService =
  new AuthsApiServiceService();
