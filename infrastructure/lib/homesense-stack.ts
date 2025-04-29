import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iot from 'aws-cdk-lib/aws-iot';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export class HomeSenseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB tables
    const devicesTable = new dynamodb.Table(this, 'DevicesTable', {
      partitionKey: { name: 'deviceId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
    });
    const logsTable = new dynamodb.Table(this, 'LogsTable', {
      partitionKey: { name: 'logId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
    });

    // SNS topic for notifications
    const alertTopic = new sns.Topic(this, 'AlertTopic', {
      displayName: 'HomeSense Alerts',
    });

    // Cognito User Pool
    const userPool = new cognito.UserPool(this, 'HomeSenseUserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      standardAttributes: { email: { required: true, mutable: false } },
    });
    const userPoolClient = new cognito.UserPoolClient(this, 'HomeSenseUserPoolClient', {
      userPool,
      generateSecret: false,
      oAuth: {
        flows: { authorizationCodeGrant: true },
        scopes: [cognito.OAuthScope.EMAIL, cognito.OAuthScope.OPENID, cognito.OAuthScope.PROFILE],
        callbackUrls: ['http://localhost:3000/'],
      },
      authFlows: { userPassword: true, userSrp: true },
    });

    // IoT Core Policy (for device authentication)
    new iot.CfnPolicy(this, 'DeviceIoTPolicy', {
      policyName: 'HomeSenseDevicePolicy',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: [
              'iot:Connect',
              'iot:Publish',
              'iot:Subscribe',
              'iot:Receive',
            ],
            Resource: '*',
          },
        ],
      },
    });

    // Lambda functions
    const ingestTelemetryFn = new lambda.Function(this, 'IngestTelemetryFn', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'ingestTelemetry.handler',
      code: lambda.Code.fromAsset('../services'),
      environment: {
        DEVICES_TABLE: devicesTable.tableName,
        LOGS_TABLE: logsTable.tableName,
      },
    });
    devicesTable.grantWriteData(ingestTelemetryFn);
    logsTable.grantWriteData(ingestTelemetryFn);

    // API Gateway
    const api = new apigateway.RestApi(this, 'HomeSenseApi', {
      restApiName: 'HomeSense Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });
    const devices = api.root.addResource('devices');
    devices.addMethod('GET', new apigateway.LambdaIntegration(ingestTelemetryFn));
  }
}
