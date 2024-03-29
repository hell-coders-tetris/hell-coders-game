import AuthAPI from '../api/AuthApi/AuthApi'
import { SignInRequest } from '../store/auth/types'

class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = new AuthAPI()
  }

  async signin(data: SignInRequest) {
    try {
      await this.api.signin(data)
      localStorage.setItem('auth', 'userAuthorized')
    } catch (e: any) {
      if (e.reason === 'User already in system') {
        localStorage.setItem('auth', 'userAuthorized')
      } else {
        localStorage.removeItem('auth')
        alert('Неверный логин или пароль')
      }
    }
  }

  async logout() {
    try {
      await this.api.logout()
      localStorage.removeItem('auth')
    } catch (e: unknown) {
      console.log(e)
    }
  }
}

export default new AuthController()
