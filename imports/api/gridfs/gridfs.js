/*jshint esversion: 6 */

import Grid from 'gridfs-stream';
import StreamBuffers from 'stream-buffers';

// setup gridfs instance
let gfs;
if (Meteor.isServer) {
  const db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  const driver = MongoInternals.NpmModule;
  gfs = Grid(db, driver);
}

/**
 * Get GridFS document matching id.
 * @param {string} fileId - the file document to read
 * @returns {Promise}
 **/
export const getGridFxFileDoc = fileId => {
  const promise = new Promise((resolve, reject) => {
    gfs.files.find({'metadata.mediaId': fileId}).toArray().then((files) => {
      if (!_.isEmpty(files)) {
        Log.log(['debug', 'media', 'gridfs'], 'Files for id '+fileId+' exists');
        resolve(_.first(files));
      }
      else {
        Log.log(['warning', 'media', 'gridfs'], 'No files for id '+fileId+' exists.');
        reject('Could not find gridfs file '+fileId);
      }
    }).catch((err) => {
      Log.log(['warning', 'media', 'gridfs'], 'Error finding files:', err);
      reject(err);
    });
  });
  return promise;
};

/**
 * Read a file from GridFS as Base64 string.
 * @param {string} fileId - the file document to read
 * @returns {Promise}
 **/
export const readGridFxFileAsBase64 = fileId => {
  Log.log(['debug', 'gridfs'], `toBase64 fileId ${fileId}`)
  const promise = new Promise((resolve, reject) => {
    getGridFxFileDoc(fileId)
      .then((doc) => {
        Log.log(['debug', 'gridfs'], 'File document name '+doc.filename+'.');
        const readStream = gfs.createReadStream({_id: doc._id});

        // on readstream errors
        readStream.on('error', Meteor.bindEnvironment(error => {throw error;}));

        // create buffer write stream
        const bufferStream = new StreamBuffers.WritableStreamBuffer();

        // on close of write stream
        bufferStream.on('finish', Meteor.bindEnvironment(() => {
          Log.log(['debug', 'gridfs'],
            'Finished buffer write stream with size of '+
            bufferStream.size()+'.');

          // get the content of the buffer as base 64 string
          const b64 = bufferStream.getContentsAsString('base64');
          Log.log(['debug', 'gridfs'], 'Base 64 starts with '+ b64.slice(0, 30)+'...');

          resolve(b64);
        }));

        // stream read stream to buffer write stream
        readStream.pipe(bufferStream);
      })
      .catch(error => {reject(error);});
  });
  return promise;
};

/**
 * Client side method to add base64 encoded string as file to gridfs.
 * First a local file is created from the base64 string, then a read stream is
 * created from the local file before it is piped to a gridfs write stream.
 **/
export const writeGridFxFileFromBase64 = (base64, meta) => {
  const promise = new Promise((resolve, reject) => {

    // create read buffer stream from base64
    const readStream = new StreamBuffers.ReadableStreamBuffer();
    readStream.put(clone.base64, 'base64');

    // on readstream errors
    readStream.on('error', Meteor.bindEnvironment(error => {throw error;}));

    // create media file
    const mediaPath = '';
    const mediaFile = {};

    // create meta data
    const metadata = { version: 'original', mediaId: id, storedAt: new Date() };

    // write file to stream
    const writeStream = gfs.createWriteStream({ filename: clone.meta.name,
        metadata });
    Log.log(['debug', 'media', 'upload'], 'path:',
        file.versions[versionName].path);
    fs.createReadStream(file.versions[versionName].path).pipe(writeStream);

    // close is emitted after file is fully written to GridFS
    writeStream.on('close', Meteor.bindEnvironment((file) => {
      Log.log(['debug', 'media', 'upload'], 'GridFS write stream closed.');

      // the property to update in the collection is the version in the file
      const property = `versions.${versionName}.meta.gridFsFileId`;

      const result = this.collection.update(id, {$set: {[property]: id}});
      Log.log(['debug', 'media', 'upload'], 'Media File in DB:',
          this.collection.findOne(id).versions);
    }));

    writeStream.on('open', Meteor.bindEnvironment(() => {
      Log.log(['debug', 'media', 'upload'], 'GridFS write stream opened ok.');
    }));

    writeStream.on('error', Meteor.bindEnvironment((error) => {
      Log.log(['error', 'media', 'upload'], 'Error in GridFS write stream:',
          error);
    }));

    // on finish of gridfs write stream
    // on close of write stream
    readStream.on('close', Meteor.bindEnvironment(() => {
      Log.log(['debug', 'gridfs'],
        'Finished buffer write stream with size of '+
        bufferStream.size()+'.');

      // get the content of the buffer as base 64 string
      const b64 = bufferStream.getContentsAsString('base64');
      Log.log(['debug', 'gridfs'], 'Base 64 starts with '+ b64.slice(0, 30)+'...');

      resolve(b64);
    }));

    // pipe read buffer stream to gridfs write stream
  });
  return promise;
};

export default {
  toBase64: readGridFxFileAsBase64,
  fromBase64: writeGridFxFileFromBase64,
  toDoc: getGridFxFileDoc
};
