import transactions from './lib.js'

const merchants = [
  {
    account: '12345678',
    category: 'ELECTRONICS',
    startAmount: 50,
    endAmount: 200,
    reference() {
      const code = transactions.random(500, 1000)
      return `Order code ${code}`
    }
  },
  {
    account: '8765432',
    category: 'FOOD',
    startAmount: 20,
    endAmount: 80,
    reference() {
      return `Thank you for ordering food`
    }
  },
  {
    account: '34876512',
    category: 'TRAVEL',
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

  generate(count, startDate, endDate) {
    const result = transactions.generate(count, merchants, startDate, endDate)
    return result
  }
}

export default api
