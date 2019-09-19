import { Log } from 'meteor/mozfet:meteor-logs'
import { _ } from 'meteor/underscore'
import GridFs from '../gridfs'

function toBase64Async(uploadId, cb) {
  GridFs.toBase64(uploadId)
    .then(result => {
      cb(undefined, result)
    })
    .catch(error => {
      cb(error)
    })
}

const toBase64 = Meteor.wrapAsync(toBase64Async)

/**
 * Syncronous DataUri encoding directly from the Uploads file collection
 * @param {String} fileCollectionId - id of a doc in the Uploads collection
 * @returns {String} Data URI of the image
 **/
export function encode(uploadId) {

  // get the file in the uploads collection
  const media = _.first(Uploads.findOne(uploadId).fetch())
  Log.log(['debug', 'dataUri'], `media `, media.name)
  const b64 = toBase64(uploadId)
  const dataUri = `data:${media.type};base64,${b64}`
  Log.log(['debug', 'dataUri'], `result`, dataUri.length)
  return dataUri
}

/**
 * API: encode
 **/
export default {encode}
