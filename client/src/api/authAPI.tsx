import { UserLogin } from "../interfaces/UserLogin";
const apiEndPoint = process.env.NODE_ENV === "development" ? "http://localhost:3001": ""

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route



  
    try {
      const response = await fetch(`${apiEndPoint}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',      
        },
        body: JSON.stringify(userInfo),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      return data
      } catch (error) {
        console.error('Error:', error);
        return {
          error
        }
      }
  };





export { login };


