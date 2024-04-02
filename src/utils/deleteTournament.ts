export async function deleteTournament({id}: {id: string}) {
    const response = await fetch(`/api/tournament?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

      const data = await response.json();
      return data
}