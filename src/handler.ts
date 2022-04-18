import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { bootstrap } from './app';
import * as fastify from 'fastify';
import { proxy } from 'aws-serverless-fastify';

import { Config } from './types/appConfig.type';
// import { getSecretValue } from './services/secretManager.service';

let fastifyServer: fastify.FastifyInstance;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  console.log(event, 'APIGatewayProxyEvent');
  if (event['source'] === 'serverless-plugin-warmup') {
    console.info('WarmUp - Lambda is warm!');
    return;
  }
  console.log(process.env.ASM_TAX_KEY, 'process.env.ASM_TAX_KEY');
  if (!fastifyServer) {
    // const dbConfiguration: IDBConfig = await getSecretValue(
    //   process.env.ASM_DB_CONF,
    // );

    console.log(process.env.ASM_TAX_KEY, 'process.env.ASM_TAX_KEY');
    const config: Config = {
      postAlertTopicArn: process.env.POST_ALERT_TOPIC_ARN,
    };

    fastifyServer = await bootstrap({ config });
  }

  return await proxy(fastifyServer, event, context);
};
