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
    type: Boolean,
    required: false
  },
  similarTo: {
    type: String,
    required: false
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
})


// create new collection
Bids = new Mongo.Collection('bids')

// set permissions
Bids.allow(Access.anyCreateAdminOwnersUpdateRemove)

export const bidSchema = new SimpleSchema({
  email: {
    type: String,
    label: i18n.__('MFS.account.form.email.label'),
    regEx: SimpleSchema.RegEx.Email,
    autoform: {
      type: 'email',
      placeholder: i18n.__('MFS.account.form.email.placeholder')
    }
  },
  amount: {
    type: Number,
    label: i18n.__('MFS.bids.schema.amount.label'),
    autoform: {
      placeholder: i18n.__('MFS.account.form.email.placeholder')
    }

  }
}, { tracker: Tracker })

// attach schema to collection
Bids.attachSchema(bidSchema)
