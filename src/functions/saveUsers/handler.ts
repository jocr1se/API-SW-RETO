import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { getRandomInt } from "../../helpers/number-random";
import { getDataApi } from "../../helpers/service-sw";

import { DynamoDB } from "aws-sdk";
import { v4 } from "uuid";

import schema from "./schema";

const saveUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const dynamodb = new DynamoDB.DocumentClient();
  const { nombre, apellido, edad } = event.body;
  const id = v4();
  const id_film = getRandomInt(1, 6);

  const { titulo, personaje } = await getDataApi(id_film);

  try {
    const params = {
      TableName: process.env.DYNAMO_TABLE,
      Item: {
        id,
        nombre,
        apellido,
        edad,
        titulo,
        personaje,
      },
    };
    await dynamodb.put(params).promise();
    return formatJSONResponse({
      message: `El usuario ${nombre} con pelicula favorita  ${titulo} a sido creado exitosamente`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const main = middyfy(saveUser);
