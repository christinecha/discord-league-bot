const leagues = require('./data/leagues')
const matches = require('./data/matches')
const { admin } = require('./data/util/firebase')
const FieldValue = admin.firestore.FieldValue

const createMatch = async (leagueId) => {
  const league = await leagues.get(leagueId)
  const { queue, teamSize } = league

  const allPlayers = Object.keys(queue).sort((a, b) => queue[a] - queue[b])
  const queuedPlayers = allPlayers.slice(0, teamSize * 2)

  // Remove match players from queue.
  const queueUpdates = {}
  queuedPlayers.forEach(id => queueUpdates[`queue.${id}`] = FieldValue.delete())
  await leagues.update({ id: league.id, ...queueUpdates })

  const players = {}

  for (let i = 0; i < teamSize * 2; i++) {
    const rand = Math.floor(Math.random() * queuedPlayers.length)
    const player = queuedPlayers.splice(rand, 1)
    const team = i % 2 === 0 ? 1 : 2
    players[player] = { team }
  }

  return await matches.create({
    teamSize,
    players
  })
}

module.exports = createMatch