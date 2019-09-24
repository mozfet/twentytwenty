// imports
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import '/imports/ui/components/transactions/updateForm.js'
import moment from 'moment'
import { Random } from 'meteor/random'
import { schema } from '/imports/startup/both/collections.js'
import './transactionsPage.html'
import Chart from 'chart.js'

// on created
Template.transactionsPage.onCreated(() => {
  const instance = Template.instance()
  instance.subscribe('transactions', Meteor.userId())
})

// on rendered
Template.transactionsPage.onRendered(() => {
  const instance = Template.instance()
  instance.state = {}

  instance.state.pieChartData = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
  }

  // init chart
  const ctx = instance.$('#myChart')
  instance.state.pieChart = new Chart(ctx, {
      type: 'pie',
      data: instance.state.pieChartData,
      options: {}
  })

  // reactively run when transactions change
  instance.autorun(() => {
    const transactions = Transactions.find({ownerId: Meteor.userId()}).fetch()
    Log.log(['debug', 'transactions', 'chart'], `Transactions have been updated:`, transactions.length)

    // process transactions by grouping them by category and totalling their
    // transaction amounts
    const categories = _.chain(transactions)
        .groupBy(transaction => {
          return transaction.category
        })
        .pairs()
        .map(pair => {
          // Log.log(['debug', 'transactions', 'chart'], `Processing pair:`,
          //     pair)
          const category = pair[0]
          const categoryTransactions = pair[1]
          Log.log(['debug', 'transactions', 'chart'], `Processing category:`,
              category, categoryTransactions)
          const total = _.reduce(categoryTransactions, (memo, transaction) => {
            // Log.log(['debug', 'transactions', 'chart'], `Counting transaction:`,
                // transaction)
            return transaction.amount
          }, 0)
          return {category, total}
        })
        .value()
    Log.log(['debug', 'transactions', 'chart'], `Categories:`, categories)

    // extract labels
    const labels = _.pluck(categories, 'category')
    Log.log(['debug', 'transactions', 'chart'], `Labels:`, labels)

    // extract data
    const data = _.pluck(categories, 'total')
    Log.log(['debug', 'transactions', 'chart'], `Data:`, data)

    // generate colors
    const colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087',
        '#f95d6a', '#ff7c43', '#ffa600']

    // package pie chart data
    const piechartData = {
      labels,
      datasets: [{
        data,
        backgroundColor: colors
      }]
    }
    Log.log(['debug', 'transactions', 'chart'], `piechartData:`, piechartData)

    // set char data
    instance.state.pieChart.data = piechartData
    instance.state.pieChart.update()

  })
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
