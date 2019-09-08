import './updateForm.js'

// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import './updateForm.html'

// on created
Template.updateTransactionForm.onCreated(() => {
  const instance = Template.instance()
  Log.log(['debug', 'transactions'], `Update transactions form:`, instance.data)
})

// on rendered
Template.updateTransactionForm.onRendered(() => {
  const instance = Template.instance()
})

// helpers
Template.updateTransactionForm.helpers({
  helper() {
    const instance = Template.instance()
    return 'help'
  }
})

// events
Template.updateTransactionForm.events({

  //on click class
  'click .className'(event, instance) {
  }
})

// on destroyed
Template.updateTransactionForm.onDestroyed(() => {
  const instance = Template.instance()
})
