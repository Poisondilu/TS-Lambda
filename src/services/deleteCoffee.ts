import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const requestBody = JSON.parse(event.body || '{}');
  const { order_id, customer_name }: { order_id: string; customer_name: string } = requestBody;

  const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
    TableName: process.env.COFFEE_ORDERS_TABLE || '',
    Key: {
      OrderId: order_id,
      CustomerName: customer_name,
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order deleted successfully!', OrderId: order_id }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Could not delete order: ${error.message}` }),
    };
  }
};