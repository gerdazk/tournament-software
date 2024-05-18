export const findPlayerByDrawOrderNo = ({ players, orderNo }) => {
  return players.find(({ drawOrderNo }) => drawOrderNo === orderNo)
}
