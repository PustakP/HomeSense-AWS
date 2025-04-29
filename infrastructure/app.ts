// AWS CDK app entry point for HomeSense
import * as cdk from 'aws-cdk-lib';
import { HomeSenseStack } from './lib/homesense-stack';

const app = new cdk.App();
new HomeSenseStack(app, 'HomeSenseStack');
