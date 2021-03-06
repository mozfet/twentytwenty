// imports
import { Template } from 'meteor/templating'
import { Log } from 'meteor/mozfet:meteor-logs'
import { people } from '/imports/api/people/people.js'
import './homePage.html'
import '/imports/ui/components/flatCard/flatCard.js'
Log.log(['debug', 'load'], `Loading module ${module.id}.`)

// on created
Template.homePage.onCreated(() => {
  const instance = Template.instance()
  instance.state = {}
})

// on rendered
Template.homePage.onRendered(() => {
  const instance = Template.instance()
  const tabQuery = instance.$('.tabs')
  instance.state.tabsInstance = M.Tabs.init(tabQuery, {});
})

// helpers
Template.homePage.helpers({
  testUserCount() {
    return people.length
  }
})

// events
Template.homePage.events({

  //on click class
  'click .className'(event, instance) {
  }
})

// on destroyed
Template.homePage.onDestroyed(() => {
  const instance = Template.instance()
})
