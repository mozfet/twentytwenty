import { findSimilarTransactions } from '/imports/api/transactions/transactions.js'
import { transactionSummary } from '/imports/api/transactions/transactions.js'

// after updating a transaction
Transactions.after.update((userId, doc, fieldNames, modifier, options) => {
  Log.log(['debug', 'hooks', 'transaction'], `Updated doc:`, doc._id)

  // if update is not regarding internal state
  if (!modifier.$set.similarTo) {

    // get all reference transactions of this user
    const references = Transactions.find({ownerId: Meteor.userId(),
        isReference: true}).fetch()
    Log.log(['debug', 'hooks', 'transaction'], `References:`, references)

    // extend each reference transaction with string summary
    for( let reference of references) {
      reference.summary = transactionSummary(reference)
      Log.log(['debug', 'hooks', 'transaction'], `Reference summary:`, reference.summary)
    }

    // get all non reference transactions of this user
    const nonReferences = Transactions.find({ownerId: Meteor.userId(),
        isReference: {$ne: true}}).fetch()

    // DEBUG: limit volume
    // nonReferences.length = 1

    // for each non reference transaction
    for( let nonReference of nonReferences) {
        Log.log(['debug', 'hooks', 'transaction'], `nonReference:`, nonReference)

        // create summary of non reference transaction
        nonReference.summary = transactionSummary(nonReference)

        // match transaction string to reference set string using algoritmia
        // async call to algorimia
        findSimilarTransactions(references, nonReference)
    }
  }


})
