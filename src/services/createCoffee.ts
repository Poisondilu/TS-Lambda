import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const requestBody = JSON.parse(event.body || '{}');
  const { customer_name, coffee_blend }: { customer_name: string; coffee_blend: string } = requestBody;
  const orderId: string = uuidv4();

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.COFFEE_ORDERS_TABLE || '',
    Item: {
      OrderId: orderId,
      CustomerName: customer_name,
      CoffeeBlend: coffee_blend,
      OrderStatus: 'Pending',
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order created successfully!', OrderId: orderId }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Could not create order: ${error.message}` }),
    };
  }
};