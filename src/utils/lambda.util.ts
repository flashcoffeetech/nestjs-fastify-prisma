export const getCurrentLogStreamUrl = () => {
  const region = process.env.AWS_REGION;
  const logGroupName = process.env.AWS_LAMBDA_LOG_GROUP_NAME;
  const logStreamName = process.env.AWS_LAMBDA_LOG_STREAM_NAME;

  return [
    'https://console.aws.amazon.com/cloudwatch/home?region=',
    region,
    '#logsV2:log-groups/log-group/',
    encodeURIComponent(logGroupName),
    '/log-events/',
    encodeURIComponent(logStreamName),
  ].join('');
};
