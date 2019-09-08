// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import './adminPage.html'

// on created
Template.adminPage.onCreated(() => {
  const instance = Template.instance()
})

// on rendered
Template.adminPage.onRendered(() => {
  const instance = Template.instance()
})

// helpers
Template.adminPage.helpers({
  helper() {
    const instance = Template.instance()
    return 'help'
  }
})

// events
Template.adminPage.events({

  // on click class
  'click .js-generate-users'(event, instance) {
    Meteor.call('generateUsers')
  }
})

// on destroyed
Template.adminPage.onDestroyed(() => {
  const instance = Template.instance()
})
