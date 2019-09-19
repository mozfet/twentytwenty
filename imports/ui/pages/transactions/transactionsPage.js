// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import '/imports/ui/components/transactions/updateForm.js'
import moment from 'moment'
import { Random } from 'meteor/random'
import { schema } from '/imports/startup/both/collections.js'
import './transactionsPage.html'

// on created
Template.transactionsPage.onCreated(() => {
  const instance = Template.instance()
  instance.subscribe('transactions', Meteor.userId())
})

// on rendered
Template.transactionsPage.onRendered(() => {
  const instance = Template.instance()
})

// helpers
Template.transactionsPage.helpers({
  transactions() {
    const instance = Template.instance()
    const result = Transactions.find(
        {ownerId: Meteor.userId()}, {sort: {date: -1, merchantAccount: 1}})
        .fetch()
    return result
  }
})

// events
Template.transactionsPage.events({

  // on click class
  'click .js-edit-transaction'(event, instance) {
    const el = $(event.target)
    const transactionId = el.prop('id')
    Log.log(['debug', 'transactions'], `Edit transaction ${transactionId}`)
    const transaction = Transactions.findOne({_id: transactionId})
    const modalData = {
      id: 'transactionUpdate'+Random.id(),
      collection: 'Transactions',
      title: 'Update Transaction',
      type: 'update',
      doc: transaction,
      customForm: {
        template: 'updateTransactionForm',
        data: {transaction}
      },
      modalParentId: 'js-dynaview'
    }

    const modalParentNode = instance.$('.container').get(0)

    // launch change category update modal
    Blaze.renderWithData(Template.autoformMaterializeModal, modalData,
        modalParentNode)

  }
})

// on destroyed
Template.transactionsPage.onDestroyed(() => {
  const instance = Template.instance()
})
