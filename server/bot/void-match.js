const { getEmoteReactions } = require('../util/getEmoteReactions')
const { formMatchId } = require('../data/matchId')
const matches = require('../data/matches')
const ERRORS = require('../constants/ERRORS')

const onVoidMatch = async (matchKey, context) => {
  try {
    const matchId = formMatchId({ guildId: context.guild.id, matchKey })

    const match = await matches.get(matchId)

    if (!match) {
      throw ERRORS.MATCH_INVALID
    }

    const reactions = await getEmoteReactions({
      validate: (_, user) => user.id === context.author.id,
      channel: context.channel,
      message: `Are you sure you want to erase match ${matchKey} from history? React with any emote to confirm. This action cannot be undone.`,
      initialEmotes: ['✅'],
    })

    console.log(reactions)

    if (!reactions.length) {
      await context.channel.send(`Match ${matchKey} has not been voided.`)
      return
    }

    await matches.delete(matchId)
    await context.channel.send(`Match ${matchKey} has been voided.`)
  } catch (err) {
    context.channel.send(err)
  }
}

module.exports = { onVoidMatch }
