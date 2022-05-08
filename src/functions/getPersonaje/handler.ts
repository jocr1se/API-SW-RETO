import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyHandler } from "aws-lambda";
import { getPeopleSW } from "../../helpers/service-sw";

const getPersonaje: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;
  const objPeople = await getPeopleSW(id);

  return formatJSONResponse({
    payload: objPeople,
  });
};

export const main = middyfy(getPersonaje);
