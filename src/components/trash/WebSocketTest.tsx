import { useState } from 'react'

import useWebSocket from '../../utils/useWebSocket'

import { ScoreBox } from './ScoreBox'

function MyComponent() {
  const [data, setData] = useState('')
  useWebSocket({ setData })

  return (
    <div>
      <ScoreBox statistics={data && JSON.parse(data)} />
    </div>
  )
}

export default MyComponent
