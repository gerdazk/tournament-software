export async function createTournament(props) {
    try {
      const response = await fetch('/api/tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...props})
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Tournament created successfully:', data.user);
        return data
      } else {
        const error = await response.json();
        console.error('Tournament creation failed:', error);
        return
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
      return
    }
  }