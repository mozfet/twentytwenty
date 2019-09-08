import { Mongo } from 'meteor/mongo'
import { Access } from 'meteor/mozfet:access'
import SimpleSchema from 'simpl-schema'

SimpleSchema.extendOptions(['autoform'])

// define global collection
Transactions = new Mongo.Collection('transactions')

// set permissions
Transactions.allow(Access.anyCreateAdminOwnersUpdateRemove)

const schema = new SimpleSchema({
  ownerId: {
    type: String
  },
  date: {
    type: Date
  },
  merchantAccount: {
    type: String
  },
  merchant: {
    type: String,
    label: i18n.__('GYR.transactions.table.merchant')
  },
  merchantCategory: {
    type: String
  },
  category: {
    type: String,
    label: i18n.__('GYR.transactions.table.category')
  },
  userCategory: {
    type: String,
    required: false
  },
  merchantReferenceNote: {
    type: String
  },
  referenceNote: {
    type: String,
    label: i18n.__('GYR.transactions.table.reference')
  },
  amount: {
    type: Number
  }
}, { tracker: Tracker })

Transactions.attachSchema(schema)
