import Auth from '../utils/auth';

const retrieveUsers = async () => {
   Auth.isTokenExpired()
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveUsers };
