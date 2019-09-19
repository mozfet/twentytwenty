import Algorithmia from 'algorithmia'
import { Promise } from 'meteor/promise'
import DataUri from '/imports/api/dataUri'
import unescape from 'unescape'

const defaultKey = Meteor.settings.algorithmia.simpleKey

function algorithmAsync(key, algorithm, input, cb) {
  Log.log(['debug', 'algorithmia'], `Calling algorithm ${algorithm}`)
  Algorithmia
      .client(key)
      .algo(algorithm)
      .pipe(input).then(Meteor.bindEnvironment((response) => {
        cb(undefined, response)
      }))
}

function algorithmPromise(key, algorithm, input) {
  Log.log(['debug', 'algorithmia'], `Calling algorithm ${algorithm}`)
  return new Promise(function(resolve, reject) {
    Algorithmia
        .client(key)
        .algo(algorithm)
        .pipe(input).then(Meteor.bindEnvironment((response) => {
          resolve(response)
        }))
  });
}

const algorithm = Meteor.wrapAsync(algorithmAsync)

function htmlToStringList(url) {
  const response = algorithm(
      defaultKey,
      'TGRedBaron/HtmlToStringList/0.1.1',
      url
  )
  Log.log(['debug', 'algorithmia'], `htmlToStringList response`, response)
  const result = !response.error?response.result:[]
  return result
}

function htmlToText(url) {
  const response = algorithm(
      defaultKey,
      'util/Html2Text/0.1.6',
      url
  )
  Log.log(['debug', 'algorithmia'], `htmlToStringList response`, response)
  const result = !response.error?response.result:[]
  return result
}

function googleTranslate(text) {
  const input = {action: "translate", text}
  const response = algorithm(
      defaultKey,
      'translation/GoogleTranslate/0.1.1',
      input
  )
  Log.log(['debug', 'algorithmia'], 'google tranlate response', response);
  let result = !response.error?response.result.translation:text
  result = unescape(result)
  return result
}

function languageIdentification(text) {
  const input = {"sentence": text}
  const response = algorithm(
      defaultKey,
      'nlp/LanguageIdentification/1.0.0',
      input
  )
  Log.log(['debug', 'algorithmia'], 'language identification response', response);
  let result = !response.error?response.result[0].language:'zz'
  return result
}

/**
 * @param {String} inputLanguage - lower alpha 2, e.g. "en", "nl"
 * @returns {}
 **/
function yandexTranslate(inputLanguage, outputLanguage, text) {
  const input = {from: inputLanguage, to: outputLanguage, text}
  const response = algorithm(
      defaultKey,
      'translation/YandexTranslate/0.1.2',
      input
  )
  Log.log(['debug', 'algorithmia'], 'yandex translate response', response);
  let result = !response.error?response.result[0]:text
  return result
}

function summarizer(text) {
  const response = algorithm(
      defaultKey,
      'nlp/Summarizer/0.1.7',
      text
  )
  const result = !response.error?response.result:text
  return result
}

function autoTag(text) {
  const response = algorithm(
      defaultKey,
      'nlp/AutoTag/1.0.1',
      text
  )
  const result = !response.error?response.result:[]
  return result
}

function namedEntityRecognition(text) {
  const response = algorithm(
      defaultKey,
      'StanfordNLP/NamedEntityRecognition/0.2.0',
      text
  )
  const result = !response.error?response.result:[]
  Log.log(['debug', 'algorithmia'], 'namedEntityRecognition response', response);
  Log.log(['debug', 'algorithmia'], 'namedEntityRecognition response.sentences', response.sentences);
  return result
}

function computerVisionCarMakeAndModelRecognition(uploadId) {
  const dataUri = DataUri.encode(uploadId)
  Log.log(['debug', 'algorithmia'], 'dataUri', dataUri.length);
  const response = algorithm(
      defaultKey,
      'LgoBE/CarMakeandModelRecognition/0.4.1?timeout=300',
      dataUri
  )
  Log.log(['debug', 'algorithmia'], 'CarMakeandModelRecognition response', response);
  const result = !response.error?response.result:[]
  return result
}

export default {
  algorithm,
  algorithmPromise,
  htmlToStringList,
  htmlToText,
  languageIdentification,
  googleTranslate,
  yandexTranslate,
  summarizer,
  autoTag,
  namedEntityRecognition,
  computerVisionCarMakeAndModelRecognition
}
