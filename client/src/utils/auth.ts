import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
  }

  async loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    // const savedAuth = localStorage.getItem("auth")
    // return savedAuth
    try {
      const response = await fetch(
        `http://localhost:3001/auth/checkAuth`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.getToken()}`
          },
         
        }
      )
      const data = await response.json();
  
      if(!response.ok) {
        throw new Error('invalid API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.error('Error checking user auth', err);
      
    }
  }
  
  isTokenExpired() {
    // TODO: return a value that indicates if the token is expired
    const savedAuth = localStorage.getItem("auth")
    let tokenExpired=true
    if (savedAuth) {
      const tokenPayload = JSON.parse(window.atob(savedAuth.split(".")[1]))
      console.log(tokenPayload)
      console.log(Math.floor(Date.now()/1000))
      tokenExpired=Math.floor(Date.now()/1000) > tokenPayload.exp
    }
    if (tokenExpired) {
      localStorage.removeItem("auth")
      location.href="/login"
    }
  }

  getToken(): string {
    // TODO: return the token
    const savedAuth = localStorage.getItem("auth")
    return savedAuth || ""
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem("auth", idToken)
    location.href="/"
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem("auth")
    location.href="/login"
  }
}

export default new AuthService();
