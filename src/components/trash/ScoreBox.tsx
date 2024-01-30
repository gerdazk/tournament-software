export const ScoreBox = ({statistics}) => {

    // {"game":{"scoreTeam1":"30","scoreTeam2":"30"},"match":{"scoreTeam1":"0","scoreTeam2":"0"},"sets":{"1":{"scoreTeam1":"1","scoreTeam2":"0"},"2":{"scoreTeam1":"0","scoreTeam2":"0"},"3":{"scoreTeam1":"0","scoreTeam2":"0"}}}

    console.log({statistics})

    return statistics && (
    <div style={{display: 'flex', gap: '20px'}}>
        <div className="">
            <div>
            Mike White
            </div>
            <div>
            Kate Lane
            </div>
        </div>
        <div className="">
            <div>
                {statistics.game.scoreTeam1}
            </div>
            <div>
                {statistics.game.scoreTeam2}
            </div>
        </div>
        <div style={{}}>
            <div className="text-lg">
                {statistics.sets['1'].scoreTeam1}
            </div>
            <div>
                {statistics.sets['1'].scoreTeam2}
            </div>
        </div>
        <div className="">
            <div>
                {statistics.sets['2'].scoreTeam1}
            </div>
            <div>
                {statistics.sets['2'].scoreTeam2}
            </div>
        </div>
    </div>
    )
    
}