const ws = new WebSocket('ws://192.168.1.107:8080')

const useWebSocket = ({setData}: any) => {
    ws.onerror = (e: any) => {
        console.log({ e: e.message })
      }

      ws.onopen = e => {
        console.log({ mes: e })
      }

      ws.onmessage = async e => {
        const stringData = await e.data.text();
        setData(stringData)
      }
};

export default useWebSocket;