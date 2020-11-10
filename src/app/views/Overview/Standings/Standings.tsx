import React from 'react'
import StandingsTable from '../../../components/StandingsTable'

const makeStanding = (
  username: string,
  pts: number,
  mp: number,
  mw: number,
  ml: number,
  md: number,
  gp: number,
  gw: number,
  gl: number,
  gd: number,
) => ({
  username,
  points: pts,
  matchesPlayed: mp,
  matchesWon: mw,
  matchesLost: ml,
  matchesDraw: md,
  gamesPlayed: gp,
  gamesWon: gw,
  gamesLost: gl,
  gamesDraw: gd,
})

const Standings: React.FC = () => {
  // const overallStandings = useSelector(selectOverallStandings)
  const overallStandings = [
    makeStanding('Alvin', 10, 6, 3, 2, 1, 13, 7, 5, 1),
    makeStanding('Amedeo', 7, 6, 2, 3, 1, 14, 5, 8, 1),
    makeStanding('Camo',   7, 6, 2, 3, 1, 14, 6, 7, 1),
    makeStanding('Galli',  5, 6, 3, 2, 1, 14, 7, 6, 1),
  ]
  return (
    <div>
      <h2>{'Players\' Standings'}</h2>
      <StandingsTable standings={overallStandings} />
    </div>
  )
}

export default Standings
