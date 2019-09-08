import { Mongo } from 'meteor/mongo'
import { Access } from 'meteor/mozfet:access'
import SimpleSchema from 'simpl-schema'

SimpleSchema.extendOptions(['autoform'])

// define global collection
Transactions = new Mongo.Collection('transactions')

// set permissions
Transactions.allow(Access.anyCreateAdminOwnersUpdateRemove)

const schema = new SimpleSchema({
  date: {
    type: Date
  },
  merchantAccount: {
    type: String
  },
  merchantCategory: {
    type: String
  },
  category: {
    type: String
  },
  referenceNote: {
    type: String
  },
  amount: {
    type: Number
  }
}, { tracker: Tracker })

Transactions.attachSchema(schema)
