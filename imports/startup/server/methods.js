import moment from 'moment'
import Moniker from 'moniker'
import { Access } from 'meteor/mozfet:access'
import { Log } from 'meteor/mozfet:meteor-logs'
import { createUser } from '/imports/api/account/api.js'
import transactions from '/imports/api/trxgen/trxgen.js'
import { people } from '/imports/api/people/people.js'
import { findSimilarTransactions } from '/imports/api/transactions/transactions.js'

Meteor.methods({

  generateUsers() {
    if (Meteor.isServer) {

      if (!Access.isAdmin()) {
        Log.log(['warning', 'Only admin are allowed to call method generateUsers.'], ``)
      }

      Log.log(['debug', 'admin'], `Generate users.`)
      const trxLimit = 200
      const userCount = 100
      const startDate = moment('2017-07-07', 'YYYY-MM-DD').toDate()
      const endDate = moment('2019-07-07', 'YYYY-MM-DD').toDate()

      // for each user
      let i = 0
      for (let person of people) {
        i++

        // generate user
        const username = Moniker.choose()
        const email = `user${i}@expertbox.com`
        const password = '1234554321'
        const firstName = person.firstName
        const lastName =  person.lastName
        const ownerId = createUser.call({
          username, email, firstName, lastName,
          password, passwordConfirmation: password
        })
        Log.log(['debug', 'admin'], `Generated user ${ownerId}`)

        // generate random number of transactions
        const trxCount = transactions.random(0,trxLimit)
        const trxList = transactions.generate(trxCount, startDate, endDate, {ownerId})
        Log.log(['debug', 'admin'], `Generated ${trxCount} trx for ${ownerId}`)

        // assign owners

        // insert transactions in database
        _.each(trxList, trx => {
          trx.ownerId = ownerId
          Transactions.insert(trx)
        })
      }
    }
  }
})
