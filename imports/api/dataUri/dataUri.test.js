import { chai } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import Sinon from 'sinon';
import '../../test/collections';
import { Log } from 'meteor/mozfet:meteor-logs';

// server side tests
if (Meteor.isServer) {

  // define module
  describe('DataUri', function () {

    // before each test
    beforeEach(function () {

      // stub Log
      Sinon.stub(Log, 'log').callsFake(function (tags, msg, data) {
        const args = data?[msg, data]:[msg];
        let isError = _.contains(tags, 'error');
        if (isError) {/*console.error(...args);*/ throw new Meteor.Error(msg);}

        let isInfo = _.contains(tags, 'info');
        if (isInfo) {/*console.info(...args);*/}

        let isAccess = _.contains(tags, 'access');
        let isDebug = _.contains(tags, 'debug');
        if (isDebug && isAccess) {/*console.log(...args);*/}
      });

      // reset database
      resetDatabase();

      // sleep a bit
      Meteor._sleepForMs(50);
    });

    // after each test
    afterEach(function () {

      Log.log.restore();
      resetDatabase();
      Meteor._sleepForMs(50);
    });

    // define test
    it('should encode', function () {
      Sinon.stub(Meteor, 'userId').returns('1234');



      Meteor.userId.restore();
    });
  });
}
