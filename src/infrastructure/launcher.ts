import { App } from "aws-cdk-lib";
import { DatabaseStack } from "./stacks/databaseStack";
import { LambdaStack } from "./stacks/lambdaStack";
import { ApiStack } from "./stacks/apiStack";

const app = new App();
const databaseStack = new DatabaseStack(app, 'DatabaseStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    coffeeOrdersTable: databaseStack.coffeeOrdersTable
});

new ApiStack(app, 'ApiStack', {
    coffeeLambdaIntegration: lambdaStack.coffeeLambdaIntegration
});