const moment = require('moment')
const uuidv4 = require('uuid/v4')

function random(min, max) {
  const dif = max-min
  const result = min+Math.floor(Math.random() * Math.floor(dif+1))
  // console.log(`Random between ${min} and ${max} is ${result}`)
  return result
}

/**
 * Get a random date
 * @param {}  -
 * @returns {}
 * @link - https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript/46093680
 **/
function randomDate(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
}

/**
 * Generates random transactions
 * @param {}  -
 * @returns {}
 *
 * Transaction: date, amount, merchant account, merchant category, reference note
 * Merchant: account, category, amount range,
 **/
function generate(
    count,
    merchants = [
      {
        account: '12345678',
        category: 'UNKNOWN',
        startAmount: 50,
        endAmount: 500,
        reference() {
          const code = random(500, 1000)
          return `Order code ${code}`
        }
      }
    ],
    startDate = new Date(),
    endDate = new Date(),
    base = {}
  ) {

  const startMoment = moment(startDate)
  const endMoment = moment(endDate)

  // log so that we can see what is going on
  console.log(`Generating ${0} transactions for ${merchants.length} merchants `+
      `between ${startMoment.format('MM-YY')} and `+
      `${startMoment.format('MM-YY')}`)

  // define result container
  const result = []

  // for each transaction
  for (let i = 0; i < count; i++) {

    // select a random merchant
    const merchantCount = merchants.length
    const merchantIndex = random(0, merchantCount-1)
    const merchant = merchants[merchantIndex]

    // select a random date between start and end dates
    const date = randomDate(startDate, endDate)

    // select a random transaction amount
    const amount = random(merchant.startAmount, merchant.endAmount)

    // get a random reference note from merchant
    const referenceNote = merchant.reference()

    const _id = uuidv4()

    // create a transaction
    const transaction = {
      _id,
      date,
      amount,
      merchantAccount: merchant.account,
      merchant: merchant.account,
      merchantCategory: merchant.category,
      category: merchant.category,
      merchantReferenceNote: referenceNote,
      referenceNote
    }

    // extend transaction with base
    const trx = _.extend(transaction, base)

    // push transaction to result
    result.push(trx)
  }

  // return result
  return result
}

const api = {
  random,
  randomDate,
  generate
}

module.exports = api
