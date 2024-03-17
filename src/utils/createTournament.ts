export async function createTournament(props: any) {
      const response = await fetch('/api/tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...props})
      });

        const data = await response.json();
        console.log({data2: data})
        return data
  }