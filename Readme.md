# Coffee Shop API Tutorial

This project demonstrates two popular ways to deploy AWS Lambda functions and DynamoDB using TypeScript: **Serverless Framework** and **AWS CDK**. It is designed as a hands-on tutorial for learning both approaches.

## Project Structure

- `src/services/` — Contains Lambda function handlers (TypeScript)
- `serverless.yml` — Serverless Framework configuration
- `cdk.json` & `src/infrastructure/launcher.ts` — AWS CDK configuration and entry point

## Prerequisites
- Node.js 20+ (recommended)
- AWS CLI configured
- Serverless Framework (`npm install -g serverless`)
- AWS CDK (`npm install -g aws-cdk`)

## 1. Deploying with Serverless Framework

1. Install dependencies:
   ```bash
   npm install
   ```
2. Deploy:
   ```bash
   serverless deploy --stage dev
   ```
3. Remove:
   ```bash
   serverless remove --stage dev
   ```

## 2. Deploying with AWS CDK

1. Install dependencies:
   ```bash
   npm install
   ```
2. Bootstrap your AWS environment (first time only):
   ```bash
   cdk bootstrap
   ```
3. Deploy:
   ```bash
   cdk deploy --all
   ```
4. Destroy:
   ```bash
   cdk destroy --all
   ```

## Lambda Functions
- **createCoffee**: Create a coffee order
- **getCoffee**: Retrieve coffee orders
- **updateCoffee**: Update order status
- **deleteCoffee**: Delete an order

All functions use DynamoDB for storage. The table is defined in both deployment methods.

## Additional Resources
- [Serverless Framework Docs](https://www.serverless.com/framework/docs/)
- [AWS CDK Docs](https://docs.aws.amazon.com/cdk/latest/guide/home.html)

---

Feel free to explore both deployment methods and compare their workflows!
