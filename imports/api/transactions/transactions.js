import { Log } from 'meteor/mozfet:meteor-logs'
import Algorithmia from '/imports/api/algorithmia'
import { _ } from 'meteor/underscore'

/**
 * Async find similar transactions using algorthmia
 * @see https://algorithmia.com/algorithms/PetiteProgrammer/TextSimilarity
 * @param {}  -
 * @returns {}
 **/
export function findSimilarTransactions(transactionReferences,
      targetTransaction) {
  Log.log(['debug', 'transaction', 'algorithmia'], `findSimilarTransactions:`,
      transactionReferences.length)

  // structure list of docs according to
  const files = transactionReferences.map(
        referenceTransaction => {
          return [referenceTransaction._id, referenceTransaction.summary]
        })
  files.push([targetTransaction._id, targetTransaction.summary])

  const input = {files}
  Log.log(['debug', 'transaction', 'algorithmia'], `Input to Algorithmia:`,
      input)

  // promise to find similarities
  Algorithmia.algorithmPromise(
      Meteor.settings.algorithmia.simpleKey,
      'PetiteProgrammer/TextSimilarity/1.0.0',
      input
  )

  // then
  .then(response => {
    // Log.log(['debug', 'transaction', 'algorithmia'], `Response from Algorithmia`,
    //     response)

    if (response.error) {
      Log.log(['warning', 'api', 'transaction'], `Failed call to Algorithmia:`,
          result);
      return
    }

    // chain
    const match = _.chain(response.result)

        // find all matches of target in result
        .filter(match => {

          const doc1 = match.document1 === targetTransaction._id
          const doc2 = match.document2 === targetTransaction._id
          return doc1 || doc2
        })

        // find highest similarity
        .max(match => {
          return match.similarity
        })

        // get value of chain
        .value()

    // if similarity is above 0.8
    if (match && match.similarity > 0.7) {
      Log.log(['debug', 'api', 'transaction'], `Found a strong match:`, match)

      // get the match reference
      let reference = match.document1
      if (reference === targetTransaction._id) {
        reference = match.document2
      }
      Log.log(['debug', 'api', 'transaction'],
          `${targetTransaction._id} is similar to ${reference}`)

      // get the reference transaction
      const referenceTransaction = Transactions.findOne({_id: reference})

      // mark target as similar to reference
      Transactions.update({_id: targetTransaction._id},
          {
            $set: {
              similarTo: referenceTransaction._id,
              merchant:  referenceTransaction.merchant,
              referenceNote: referenceTransaction.referenceNote,
              category: referenceTransaction.category
            }
          })
    }
    else {
      // Log.log(['debug', 'api', 'transaction'], `Too low match:`, match)
    }
  })

  // catch errors
  .catch(ex => {
    Log.log(['warning', 'transaction', 'algorithmia'], `Algorithmia error:`, ex)
  })
}

export function transactionSummary( transaction ){
  return `${transaction.merchantAccount} ${transaction.merchantCategory} `+
      `${transaction.merchantReferenceNote} ${transaction.amount}`
}
