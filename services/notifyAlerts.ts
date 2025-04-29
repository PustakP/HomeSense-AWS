import { SNS } from 'aws-sdk';

const sns = new SNS();

// Lambda: notifyAlerts (Node.js/TypeScript)
// Expects event { thresholdBreached: boolean, message: string, topicArn: string }
export const handler = async (event: any) => {
  if (!event.thresholdBreached || !event.topicArn) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid event: thresholdBreached and topicArn are required.' }) };
  }
  try {
    await sns.publish({
      TopicArn: event.topicArn,
      Message: event.message || 'Alert: Threshold breached in HomeSense!',
      Subject: 'HomeSense Alert',
    }).promise();
    return { statusCode: 200, body: JSON.stringify({ message: 'Alert notification sent' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'SNS publish failed', details: err }) };
  }
};
