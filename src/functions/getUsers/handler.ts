import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyHandler } from "aws-lambda";

import { DynamoDB } from "aws-sdk";

const getUsers: APIGatewayProxyHandler = async (event) => {
  const dynamodb = new DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.DYNAMO_TABLE,
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return formatJSONResponse({
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const main = middyfy(getUsers);
