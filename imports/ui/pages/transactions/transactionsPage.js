// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import '/imports/ui/components/transactions/updateForm.js'
import moment from 'moment'
import { Random } from 'meteor/random'
import './transactionsPage.html'

AutoForm.hooks({
  editTransaction: {
    onSubmit(insertDoc, updateDoc, currentDoc) {
      Log.log(['debug', 'transactions'], `Update:`, insertDoc)
      this.done()
      return false
    }
  }
})

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
    const result = Transactions.find({ownerId: Meteor.userId()}).fetch()
    return result
  },
  formatDate(date) {
    return moment(date).format('YYYY-MM-DD')
  }
})

// events
Template.transactionsPage.events({

  //on click class
  'click .js-edit-transaction'(event, instance) {
    const el = $(event.target)
    console.log('Edit transaction element:', el)
    const transactionId = el.prop('id')
    console.log('Edit transaction id', transactionId)
    const transaction = Transactions.findOne({_id: transactionId})
    const modalData = {
      id: 'insertExample'+Random.id(),
      collection: 'Transactions',
      title: 'Update Category',
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
