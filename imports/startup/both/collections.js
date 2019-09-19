import { Mongo } from 'meteor/mongo'
import { Access } from 'meteor/mozfet:access'
import SimpleSchema from 'simpl-schema'

SimpleSchema.extendOptions(['autoform'])

// define global collection
Transactions = new Mongo.Collection('transactions')

// set permissions
Transactions.allow(Access.anyCreateAdminOwnersUpdateRemove)

export const schema = new SimpleSchema({
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
    label: i18n.__('MFS.transactions.table.merchant')
  },
  merchantCategory: {
    type: String
  },
  category: {
    type: String,
    label: i18n.__('MFS.transactions.table.category')
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
    label: i18n.__('MFS.transactions.table.reference')
  },
  amount: {
    type: Number
  },
  isReference: {
    type: Boolean
  },
  similarTo: {
    type: String
  }
}, { tracker: Tracker })

// attach schema to collection
Transactions.attachSchema(schema)

// before updating transactions
Transactions.before.update((userId, doc, fieldNames, modifier, options) => {

  // mark doc as reference
  modifier.$set = modifier.$set || {}
  if (!modifier.$set.similarTo) {
    modifier.$set.isReference = true
  }

  // Log.log(['debug', 'hooks', 'transactions'], `doc modifier before update:`,
  //     modifier)
})
