import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
  createCoffeeIntegration: LambdaIntegration;
  getCoffeeIntegration: LambdaIntegration;
  updateCoffeeIntegration: LambdaIntegration;
  deleteCoffeeIntegration: LambdaIntegration;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'CoffeeApi', {
      restApiName: 'Coffee Service',
      description: 'This service serves coffee.',
    });

    const coffeeResource = api.root.addResource('coffee');
    coffeeResource.addMethod('POST', props.createCoffeeIntegration);
    coffeeResource.addMethod('GET', props.getCoffeeIntegration);
    coffeeResource.addMethod('PUT', props.updateCoffeeIntegration);
    coffeeResource.addMethod('DELETE', props.deleteCoffeeIntegration);
  }
}