import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
    coffeeOrdersTable: ITable;
}

export class LambdaStack extends Stack {

    public readonly createCoffeeIntegration: LambdaIntegration;
    public readonly getCoffeeIntegration: LambdaIntegration;
    public readonly updateCoffeeIntegration: LambdaIntegration;
    public readonly deleteCoffeeIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        const createCoffeeLambda = new LambdaFunction(this, 'CreateCoffeeFunction', {
            runtime: Runtime.NODEJS_22_X,
            handler: 'src/services/createCoffee.handler',
            code: Code.fromAsset(join(__dirname, '../../', 'services')),
            environment: {
                COFFEE_ORDERS_TABLE: props.coffeeOrdersTable.tableName
            }
        });
        this.createCoffeeIntegration = new LambdaIntegration(createCoffeeLambda);

        const getCoffeeLambda = new LambdaFunction(this, 'GetCoffeeFunction', {
            runtime: Runtime.NODEJS_22_X,
            handler: 'src/services/getCoffee.handler',
            code: Code.fromAsset(join(__dirname, '../../', 'services')),
            environment: {
                COFFEE_ORDERS_TABLE: props.coffeeOrdersTable.tableName
            }
        });
        this.getCoffeeIntegration = new LambdaIntegration(getCoffeeLambda);

        const updateCoffeeLambda = new LambdaFunction(this, 'UpdateCoffeeFunction', {
            runtime: Runtime.NODEJS_22_X,
            handler: 'src/services/updateCoffee.handler',
            code: Code.fromAsset(join(__dirname, '../../', 'services')),
            environment: {
                COFFEE_ORDERS_TABLE: props.coffeeOrdersTable.tableName
            }
        });
        this.updateCoffeeIntegration = new LambdaIntegration(updateCoffeeLambda);

        const deleteCoffeeLambda = new LambdaFunction(this, 'DeleteCoffeeFunction', {
            runtime: Runtime.NODEJS_22_X,
            handler: 'src/services/deleteCoffee.handler',
            code: Code.fromAsset(join(__dirname, '../../', 'services')),
            environment: {
                COFFEE_ORDERS_TABLE: props.coffeeOrdersTable.tableName
            }
        });
        this.deleteCoffeeIntegration = new LambdaIntegration(deleteCoffeeLambda);
    }
}