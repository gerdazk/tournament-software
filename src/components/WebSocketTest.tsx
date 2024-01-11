import { useState } from "react";
import useWebSocket from "../utils/useWebSocket";

function MyComponent() {
const [data, setData] = useState('')
  useWebSocket({setData});

  return (
    <div>{data}</div>
  );
}

export default MyComponent;