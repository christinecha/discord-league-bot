const matches = require('../data/matches')
const ERRORS = require('./constants/ERRORS')
const { generateMatchId } = require('../data/matchId')
const { getLeagueStats } = require('../getLeagueStats')
const { getGuildUser } = require('../getGuildUser')

const MATCH_MODE = {
  RANDOM: 'random',
  AUTO: 'auto'
}

const BALANCE = {
  2: { 0: 1, 1: 2, 2: 2, 3: 1 },
  3: { 0: 1, 1: 2, 2: 1, 3: 2, 4: 2, 5: 1 },
}

const createMatch = async ({ leagueId, playerIds, mode = MATCH_MODE.AUTO, teamSize }) => {
  const queue = playerIds.slice()
  const players = {}
  const guildId = leagueId.split('-')[0]

  try {
    if (mode === MATCH_MODE.RANDOM) {
      for (let i = 0; i < teamSize * 2; i++) {
        const rand = Math.floor(Math.random() * queue.length)
        const player = queue.splice(rand, 1)
        const team = i % 2 === 0 ? 1 : 2
        players[player] = { team }
      }
    }

    if (mode === MATCH_MODE.AUTO) {
      const stats = await getLeagueStats(leagueId)
      const users = await Promise.all(
        queue.map((id) => getGuildUser({ userId: id, guildId }))
      )

      const score = user => {
        const ratio = stats[user.id] ? stats[user.id].ratio : 0.5
        if (!user.rank) return ratio
        return (user.rank + ratio) / (13 + 1)
      }

      const ordered = users.sort((a, b) => score(a) > score(b) ? 1 : -1)
      ordered.forEach((user, i) => {
        players[user.id] = { team: BALANCE[teamSize][i] }
      })
    }

    const matchId = await generateMatchId({ leagueId })

    return await matches.create({
      id: matchId,
      league: leagueId,
      teamSize,
      players,
      mode
    })
  } catch (err) {
    console.log('[ERROR]', err)
    throw ERRORS.MATCH_CREATION_ERROR
  }
}

module.exports = createMatch