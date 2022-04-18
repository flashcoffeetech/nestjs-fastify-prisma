import AWS from 'aws-sdk';

const client = new AWS.SecretsManager({
  region: process.env.AWS_REGION,
});

export async function getSecretValue(secretName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    client.getSecretValue(
      { SecretId: secretName },
      (
        err: { code: string },
        data: { SecretString?: string; SecretBinary?: any },
      ) => {
        if (err) {
          reject(err);
        } else if ('SecretString' in data) {
          // Decrypts secret using the associated KMS CMK.
          // Depending on whether the secret is a string or binary, one of these fields will be populated.
          resolve(JSON.parse(data.SecretString));
        } else {
          const buff = Buffer.from(data.SecretBinary, 'base64');
          const decodedBinarySecret: string = buff.toString('ascii');

          resolve(JSON.parse(decodedBinarySecret));
        }
      },
    );
  });
}
