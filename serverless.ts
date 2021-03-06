import type { AWS } from "@serverless/typescript";

import saveUser from "@functions/saveUsers";
import getUsers from "@functions/getUsers";
import getPersonaje from "@functions/getPersonaje";

const SERVICE_NAME = "api-reto-sw";
const DYNAMO_TABLE = `${SERVICE_NAME}-db`;
const URI_SW = `https://swapi.py4e.com/api/`;
const serverlessConfiguration: AWS = {
  service: SERVICE_NAME,
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      DYNAMO_TABLE,
      URI_SW,
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
        ],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: { saveUser, getUsers, getPersonaje },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      DynameTableSW: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          TableName: DYNAMO_TABLE,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
