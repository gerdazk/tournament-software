export async function createTournament(props: any) {
      const response = await fetch('/api/tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...props})
      });

        const data = await response.json();
        return data
  }