import { findSimilarTransactions } from '/imports/api/transactions/transactions.js'
import { transactionSummary } from '/imports/api/transactions/transactions.js'
import { Jobs } from 'meteor/msavin:sjobs'

// TODO - Do this in a task to make update more responsive so that modal forms close quicker

// after updating a transaction
Transactions.after.update((userId, doc, fieldNames, modifier, options) => {
  Log.log(['debug', 'hooks', 'transaction'], `After update transaction:`,
      doc._id)

  // if update is not regarding internal state
  if (!modifier.$set.similarTo) {

    // schedule a reminder email
    Jobs.run('findAndUpdateSimilarTransactions', userId, {
      in: {seconds: 0}, priority: 1000
    })
  }
})

/**
 * Job that checks each transaction of a user against a reference set
 * and updating those transactions for user display
 **/
Jobs.register({
  'findAndUpdateSimilarTransactions': function(userId) {
    Log.log(['debug', 'message', 'job'],
        'findAndUpdateSimilarTransactions job starting', userId)

    // fetch the message
    // get all reference transactions of this user
    const references = Transactions.find({ownerId: userId,
        isReference: true}).fetch()
    Log.log(['debug', 'hooks', 'transaction'], `References:`, references)

    // extend each reference transaction with string summary
    for( let reference of references) {
      reference.summary = transactionSummary(reference)
      Log.log(['debug', 'hooks', 'transaction'], `Reference summary:`,
          reference.summary)
    }

    // get all non reference transactions of this user
    const nonReferences = Transactions.find({ownerId: userId,
        isReference: {$ne: true}}).fetch()

    // DEBUG: limit volume
    // nonReferences.length = 1

    // for each non reference transaction
    for( let nonReference of nonReferences) {
        Log.log(['debug', 'hooks', 'transaction'], `nonReference:`,
            nonReference)

        // create summary of non reference transaction
        nonReference.summary = transactionSummary(nonReference)

        // match transaction string to reference set string using algoritmia
        // async call to algorimia
        findSimilarTransactions(references, nonReference)
    }

    // mark job as done
    Log.log(['debug', 'message', 'job'],
        'findAndUpdateSimilarTransactions job done for user', userId)
    this.success()
  }
})
