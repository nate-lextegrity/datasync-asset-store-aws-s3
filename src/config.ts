export interface AssetStoreConfig {
  assetStore: {
    pattern?: string,
    region: string,
    apiVersion: string,
    bucketParams: {
      Bucket: string
      ACL?: string
    },
    uploadParams?: {
      ACL?: string
    },
    CORSConfiguration?: {
      CORSRules?: [
        {
          AllowedHeaders?: string[],
          AllowedMethods?: string[],
          AllowedOrigins?: string[],
          ExposeHeaders?: string[],
          MaxAgeSeconds: number
        }
      ]
    },
    Policy?: {
      Version?: string,
      Statement: [
        {
          Sid?: string,
          Effect?: string,
          Principal?: string,
          Action?: string[],
          Resource: string[]
        }
      ]
    },
    internal?: {
      requiredKeys?: {
        publish?: string[],
        unpublish?: string[],
        delete?: string[]
      }
    }
  }
}

/**
 * @description Default application's internal config
 */
export const defaultConfig: AssetStoreConfig = {
  assetStore: {
    // Optional: Use this, if any key passed in the pattern doesn't exist on the asset by default Or if the key exists on the asset, but needs overriding
    pattern: '/:uid/:filename',
    region: 'us-east-1', // Required
    apiVersion: '2006-03-01', // Required
    bucketParams: {
      Bucket: '', // Required
      ACL: 'private'
    },
    uploadParams: {
      ACL: 'private'
    },
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ['Authorization'],
          AllowedMethods: ['PUT', 'POST', 'GET', 'DELETE'],
          AllowedOrigins: ['*'],
          ExposeHeaders: [],
          MaxAgeSeconds: 3000
        }
      ]
    },
    // Policy: {
    //   Version: '2012-10-17',
    //   Statement: [
    //     {
    //       Sid: 'AddPerm',
    //       Effect: 'Allow',
    //       Principal: '*',
    //       Action: ['s3:GetObject'],
    //       Resource: ['arn:aws:s3:::<name>/*'] // Required
    //     }
    //   ]
    // },
    internal: {
      requiredKeys: {
        publish: ['locale', 'uid', 'url'],
        unpublish: ['locale', 'uid', 'url', 'Key'],
        delete: ['locale', 'uid', 'url', 'Key']
      }
    }
  }
}
