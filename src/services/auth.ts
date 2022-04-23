import api from "./api";
import TokenService from "@/services/token";

class AuthService {
  login({ username, password }: { username: string; password: string }) {
    const response: any = api.post("/token/login/", { username, password });
    if (response.data.access) {
      TokenService.setUser(response.data);
      return true;
    }
    return false;
  }

  register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    return api.post("/auth/signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
