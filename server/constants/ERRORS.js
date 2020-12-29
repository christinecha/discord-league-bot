const ERRORS = {
  INVALID_TEAM_SIZE: `Team size is invalid. Choose 1, 2, or 3.`,
  NO_SUCH_LEAGUE: `The requested league does not exist in this server.`,

  MATCH_INVALID: 'Invalid match id.',
  MATCH_NO_SUCH_USER: 'User was not in the specified match.',
  MATCH_DUPLICATE_REPORT: 'This match has already been reported.',
  MATCH_CREATION_ERROR: 'Error generating new match.',
  MATCH_UNCANCELABLE: 'Cannot cancel a match that has already been reported.',

  QUEUE_NO_SUCH_USER: 'User is not in the queue.',
  QUEUE_DUPLICATE_USER: 'User is already in the queue.',
}

module.exports = ERRORS