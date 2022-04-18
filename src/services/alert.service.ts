import { getCurrentLogStreamUrl } from '../utils/lambda.util';
import { PostAlert } from '../types/postAlert.interface';
import { snsPublish } from './sns.service';

export const sendErrorAlert = async (
  topicArn: string,
  error: any,
): Promise<any> => {
  try {
    const stage = process.env.STAGE;
    if (!stage) {
      return; // skip local env
    }

    const data: PostAlert = {
      service: `tax-service-tw-${process.env.STAGE}`,
      message: error?.stack || error,
      logStreamUrl: getCurrentLogStreamUrl(),
    };

    await snsPublish(topicArn, JSON.stringify(data));
  } catch (err) {
    console.error('Err while sending error alert', err);
  }
};
