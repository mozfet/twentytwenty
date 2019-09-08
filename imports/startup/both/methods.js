import moment from 'moment'
import Moniker from 'moniker'
import { createUser } from '/imports/api/account/api.js'
import transactions from '/imports/api/trxgen/trxgen.js'

Meteor.methods({
  generateUsers() {
    if (Meteor.isServer) {
      Log.log(['debug', 'admin'], `Generate users.`)
      const trxLimit = 200
      const userCount = 100
      const startDate = moment('2017-07-07', 'YYYY-MM-DD').toDate()
      const endDate = moment('2019-07-07', 'YYYY-MM-DD').toDate()

      // for each user
      for (let i=0; i<userCount; i++) {

        // generate user
        const username = Moniker.choose()
        const email = `user${i}@expertbox.com`
        const password = '1234554321'
        const firstName = Moniker.choose()
        const lastName =  Moniker.choose()
        const userId = createUser.call({
          username, email, firstName, lastName,
          password, passwordConfirmation: password
        })
        Log.log(['debug', 'admin'], `Generated user ${userId}`)

        // generate random number of transactions
        const trxCount = transactions.random(0,trxLimit)
        const trxList = transactions.generate(trxCount, startDate, endDate)
        Log.log(['debug', 'admin'], `Generated trx for ${userId}:`, trxList)

        // insert transactions in database
        _.each(trxList, trx => {
          trx.ownerId = userId
          Transactions.insert(trx)
        })
      }
    }
  }
})
