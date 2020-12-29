const { balanceTeams } = require('./balanceTeams')
const RL_RANKS = require('../constants/RL_RANKS')

test('balanceTeams - by rank', () => {
  const users = [
    { id: 'dirt', rank: RL_RANKS['Bronze'], ratio: 0.5 },
    { id: 'hoody', rank: RL_RANKS['GC'], ratio: 0.5 },
    { id: 'cha', rank: RL_RANKS['Plat'], ratio: 0.5 },
    { id: 'flips', rank: RL_RANKS['Diamond'], ratio: 0.5 },
  ]
  const teams = balanceTeams(users)
  expect(teams[1].map((t) => t.id)).toMatchInlineSnapshot(`
    Array [
      "hoody",
      "dirt",
    ]
  `)
  expect(teams[2].map((t) => t.id)).toMatchInlineSnapshot(`
    Array [
      "flips",
      "cha",
    ]
  `)
})

test('balanceTeams - by ratio', () => {
  const users = [
    { id: 'cheese', rank: RL_RANKS['Plat'], ratio: 0.8 },
    { id: 'booger', rank: RL_RANKS['Plat'], ratio: 0.6 },
    { id: 'cha', rank: RL_RANKS['Plat'], ratio: 0.2 },
    { id: 'space', rank: RL_RANKS['Plat'], ratio: 0.7 },
  ]
  const teams = balanceTeams(users)
  expect(teams[1].map((t) => t.id)).toMatchInlineSnapshot(`
    Array [
      "cheese",
      "cha",
    ]
  `)
  expect(teams[2].map((t) => t.id)).toMatchInlineSnapshot(`
    Array [
      "space",
      "booger",
    ]
  `)
})

test('balanceTeams - by rank & ratio', () => {
  let users = [
    { id: 'space', rank: RL_RANKS['Diamond'], ratio: 0.2 },
    { id: 'steeler', rank: RL_RANKS['Champ'], ratio: 0.9 },
    { id: 'hoody', rank: RL_RANKS['GC'], ratio: 0.1 },
    { id: 'flips', rank: RL_RANKS['Diamond'], ratio: 0.9 },
    { id: 'cha', rank: RL_RANKS['Plat'], ratio: 0.4 },
    { id: 'cheese', rank: RL_RANKS['Diamond'], ratio: 0.7 },
  ]
  let teams = balanceTeams(users)

  expect(teams[1].map((t) => t.id)).toMatchInlineSnapshot(`
    Array [
      "steeler",
      "hoody",
      "cha",
    ]
  `)
  expect(teams[2].map((t) => t.id)).toMatchInlineSnapshot(`
    Array [
      "flips",
      "cheese",
      "space",
    ]
  `)

  users = [
    { id: 'space', rank: RL_RANKS['Diamond'], ratio: 0.7 },
    { id: 'steeler', rank: RL_RANKS['Champ'], ratio: 0.9 },
    { id: 'cha', rank: RL_RANKS['Gold'], ratio: 0.2 },
    { id: 'flips', rank: RL_RANKS['Diamond'], ratio: 0.7 },
    { id: 'racoon', rank: RL_RANKS['Champ'], ratio: 0.3 },
    { id: 'cheese', rank: RL_RANKS['Diamond'], ratio: 0.2 },
  ]
  teams = balanceTeams(users)

  expect(teams[1].map((t) => t.id)).toMatchInlineSnapshot(`
    Array [
      "steeler",
      "racoon",
      "cha",
    ]
  `)
  expect(teams[2].map((t) => t.id)).toMatchInlineSnapshot(`
    Array [
      "space",
      "flips",
      "cheese",
    ]
  `)
})