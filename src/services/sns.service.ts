import {
  SNSClient,
  PublishCommand,
  PublishBatchCommand,
  PublishBatchRequestEntry,
} from '@aws-sdk/client-sns';

const client = new SNSClient({ region: process.env.AWS_REGION });

export const snsPublish = async (
  topicArn: string,
  message: string,
): Promise<any> => {
  const command = new PublishCommand({
    TopicArn: topicArn,
    Message: message,
  });

  return client.send(command);
};

export const snsPublishBatch = async (
  topicArn: string,
  batchItems: { id: string; message: string }[],
): Promise<any> => {
  const batchEntries: PublishBatchRequestEntry[] = batchItems.map((item) => ({
    Id: item.id,
    Message: item.message,
  }));
  const maximumBatch = 10;
  const batchTimes = Math.ceil(batchEntries.length / maximumBatch);
  for (let i = 0; i < batchTimes; i++) {
    const command = new PublishBatchCommand({
      TopicArn: topicArn,
      PublishBatchRequestEntries: batchEntries.splice(0, maximumBatch),
    });
    await client.send(command);
  }
};
