import { bootstrap } from './app';

async function startLocal() {
  const app = await bootstrap({
    config: {
      accessKeyId: process.env.READ_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.READ_AWS_SECRET_ACCESS_KEY,
      postAlertTopicArn: process.env.POST_ALERT_TOPIC_ARN,
    },
  });
  await app.listen(process.env.APP_PORT);

  console.info(`Server started at http://localhost:${process.env.APP_PORT}`);
  console.info(
    `Swagger started at http://localhost:${process.env.APP_PORT}/swagger`,
  );
}

startLocal();
