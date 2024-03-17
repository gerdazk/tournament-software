export async function registerUser({name, email, password}) {
    try {
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User registered successfully:', data.user);
        return data
      } else {
        const error = await response.json();
        console.error('Registration failed:', error);
        return
      }
    } catch (error) {
      console.error('Error registering user:', error);
      return
    }
  }