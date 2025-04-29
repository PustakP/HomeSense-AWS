# HomeSense Infrastructure (AWS CDK)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Bootstrap your AWS environment:
   ```bash
   npx cdk bootstrap
   ```
3. Deploy the stack:
   ```bash
   npx cdk deploy
   ```

## Stack Components
- AWS IoT Core (thing registry, policies, certs)
- DynamoDB (devices, users, automations, logs)
- SNS (alerts/notifications)
- API Gateway + Lambda (REST API)
- Cognito (user authentication)
- IAM (least privilege roles)

## To Do
- Complete resource definitions in `lib/homesense-stack.ts`
