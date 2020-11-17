import AWS from 'aws-sdk'
import Debug from 'debug'
// import stream from 'stream'
import { cloneDeep } from 'lodash'
import { buildAWSConfig, formatConfig } from './util'
import { validateConfig } from './util/validations'

const debug = Debug('s3-setup')
let S3

const factory = (method, config) => {
  debug(`Factory: ${JSON.stringify(config)}`)
  return S3[method](config).promise().then((result) => {
    debug(`Result: ${JSON.stringify(result)}`)
    return result
  }).catch((error)=>{
    return error
  })
}

export const init = (config) => {
  return new Promise(async (resolve, reject) => {
    try {
      validateConfig(config)
      config = formatConfig(config)
      const awsConfig = buildAWSConfig(config)
      S3 = new AWS.S3(awsConfig)

      // add dummy file to check bucket is already created or not
      const params = cloneDeep(config.uploadParams)
      params.Key = "dummy"
      params.Body = "dummy data"
      let response = await factory('upload', params)
      
      if(response.code && response.code === 'NoSuchBucket'){
        // Step 1: Create a bucket
        await factory('createBucket', config.bucketParams)

        // Step 2: Set up bucket-versioning
        await factory('putBucketVersioning', {
          Bucket: config.bucketName,
          VersioningConfiguration: { MFADelete: 'Disabled', Status: 'Enabled' }
        })

        // Step 3 (Optional): Setup bucket's CORS policy
        if (typeof config.CORSConfiguration === 'object' && !(config.CORSConfiguration instanceof Array)) {
          await factory('putBucketCors', {
            Bucket: config.bucketName,
            CORSConfiguration: config.CORSConfiguration
          })
        }

        // Step 4 (Optional): Setup bucket's access policy
        if (typeof config.Policy === 'object' && !(config.Policy instanceof Array)) {
          await factory('putBucketPolicy', {
            Bucket: config.bucketName,
            Policy: JSON.stringify(config.Policy)
          })
        }
      } else {
        // delete the dummy file
        S3.deleteObject({
          Bucket: config.bucketParams.Bucket,
          Key: "dummy"
        }, (error, response) => {
          if (error) {
            return reject(error)
          }
          debug(`S3 dummy file deleted response ${JSON.stringify(response)}`)
        })
      }
      return resolve(S3)
    } catch (error) {
      return reject(error)
    }
  })
}