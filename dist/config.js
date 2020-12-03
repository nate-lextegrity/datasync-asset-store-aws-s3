"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
exports.defaultConfig = {
    assetStore: {
        pattern: '/:uid/:filename',
        region: 'us-east-1',
        apiVersion: '2006-03-01',
        bucketParams: {
            Bucket: '',
            ACL: 'public-read'
        },
        uploadParams: {
            ACL: 'public-read'
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
        Policy: {
            Version: '2012-10-17',
            Statement: [
                {
                    Sid: 'AddPerm',
                    Effect: 'Allow',
                    Principal: '*',
                    Action: ['s3:GetObject'],
                    Resource: ['arn:aws:s3:::<name>/*']
                }
            ]
        },
        internal: {
            requiredKeys: {
                publish: ['locale', 'uid', 'url'],
                unpublish: ['locale', 'uid', 'url', 'Key'],
                delete: ['locale', 'uid', 'url', 'Key']
            }
        }
    }
};
