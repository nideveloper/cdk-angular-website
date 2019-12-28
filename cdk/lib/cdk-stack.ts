import cdk = require('@aws-cdk/core');
import s3deploy= require('@aws-cdk/aws-s3-deployment');
import s3 = require('@aws-cdk/aws-s3');

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, 'BlogBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true
    });
   
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('../blog/dist/blog')], 
      destinationBucket: websiteBucket
    });
    
    new cdk.CfnOutput(this, 'URL', {
      description: 'The url of the website',
      value: websiteBucket.bucketWebsiteUrl
    })
  }
}