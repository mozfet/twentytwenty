import transactions from './lib.js'

const merchants = [
  {
    account: '12345678',
    category: 'RESTAURANTS',
    startAmount: 50,
    endAmount: 200,
    reference() {
      const code = transactions.random(500, 1000)
      return `Dominoes Pizza - invoice ${code}`
    }
  },
  {
    account: '8765432',
    category: 'CLOTHING',
    startAmount: 20,
    endAmount: 200,
    reference() {
      return `CNA Leiden`
    }
  },
  {
    account: '34876512',
    category: 'ATM',
    startAmount: 500,
    endAmount: 2000,
    reference() {
      const code = transactions.random(50000, 100000)
      return `Thank you ${code}`
    }
  },
  {
    account: '4557765988',
    category: 'PETROL',
    startAmount: 50,
    endAmount: 120,
    reference() {
      const code = transactions.random(50000, 100000)
      return `Unleaded 95 - ${code}`
    }
  },
  {
    account: '7856233222566',
    category: 'AIRLINES',
    startAmount: 500,
    endAmount: 2000,
    reference() {
      const code = transactions.random(50000, 100000)
      return `KLM Electronic Ticket ${code}`
    }
  }
]

export const api = {

  random(min, max) {
    return transactions.random(min, max)
  },

  generate(count, startDate, endDate, base) {
    return transactions.generate(count, merchants, startDate, endDate, base)
  }
}

export default api
