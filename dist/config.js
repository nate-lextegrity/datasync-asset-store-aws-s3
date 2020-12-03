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
        internal: {
            requiredKeys: {
                publish: ['locale', 'uid', 'url'],
                unpublish: ['locale', 'uid', 'url', 'Key'],
                delete: ['locale', 'uid', 'url', 'Key']
            }
        }
    }
};
