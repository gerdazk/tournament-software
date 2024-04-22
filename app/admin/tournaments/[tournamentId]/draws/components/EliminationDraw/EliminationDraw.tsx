import React from 'react'

export const EliminationDraw = () => {
  const participants = [
    'Participant 1',
    'Participant 2',
    'Participant 3',
    'Participant 4',
    'Participant 5',
    'Participant 6',
    'Participant 7',
    'Participant 8'
  ]

  const renderMatch = (matchIndex, participant1, participant2) => {
    return (
      <div
        key={matchIndex}
        className="flex items-center justify-between px-4 py-2 border-t border-gray-400"
      >
        <div className="flex-1">{participant1}</div>
        <div className="mx-4">vs</div>
        <div className="flex-1">{participant2}</div>
      </div>
    )
  }

  const renderRound = roundIndex => {
    const matches = []
    for (let i = 0; i < participants.length / 2; i++) {
      const participant1 = participants[i * 2]
      const participant2 = participants[i * 2 + 1]
      matches.push(renderMatch(i, participant1, participant2))
    }
    return (
      <div key={roundIndex} className="flex flex-col">
        {matches}
      </div>
    )
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Single Elimination Draw</h2>
      <div className="flex items-center justify-center">
        {renderRound(1)}
        {renderRound(2)}
        {renderRound(3)}
        {renderRound(4)}
      </div>
    </div>
  )
}
