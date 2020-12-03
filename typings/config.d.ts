export interface AssetStoreConfig {
    assetStore: {
        pattern?: string;
        region: string;
        apiVersion: string;
        bucketParams: {
            Bucket: string;
            ACL?: string;
        };
        uploadParams?: {
            ACL?: string;
        };
        CORSConfiguration?: {
            CORSRules?: [{
                AllowedHeaders?: string[];
                AllowedMethods?: string[];
                AllowedOrigins?: string[];
                ExposeHeaders?: string[];
                MaxAgeSeconds: number;
            }];
        };
        Policy: {
            Version?: string;
            Statement: [{
                Sid?: string;
                Effect?: string;
                Principal?: string;
                Action?: string[];
                Resource: string[];
            }];
        };
        internal?: {
            requiredKeys?: {
                publish?: string[];
                unpublish?: string[];
                delete?: string[];
            };
        };
    };
}
export declare const defaultConfig: AssetStoreConfig;
