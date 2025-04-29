# HomeSense: Smart Home Automation Platform

## Overview
HomeSense is a secure, serverless smart home platform for monitoring and controlling IoT devices (lights, thermostats, locks, sensors) via web dashboard, API, and Alexa voice commands.

**Key Features:**
- Onboard/register new IoT devices securely (X.509, AWS IoT Core)
- Real-time device status and telemetry logs
- Remote control: lights (on/off/brightness), thermostat (set temp), locks (lock/unlock)
- Automation rules: e.g., "turn off all lights at sunset", "lock doors when nobody's home"
- Alerts & notifications: SMS/email for door left open, motion detected, etc.
- Voice control via Alexa Skill (account linking, device actions, status queries)
- User authentication with Cognito
- Highly scalable, secure, and cost-effective (fully serverless)
- Modern web dashboard (React/Next.js + Tailwind CSS)
- Infrastructure as Code (AWS CDK, TypeScript)

## Architecture

- **Devices:** ESP32/Arduino (MQTT+TLS, X.509)
- **AWS IoT Core:** Secure device gateway, message broker
- **DynamoDB:** Device/user/automation/log storage
- **SNS:** Notifications
- **API Gateway + Lambda:** REST API
- **Cognito:** Auth
- **Alexa Skill:** Voice integration
- **Frontend:** Next.js (React, Amplify)

## Quick Start

### 1. Prerequisites
- Node.js 18+
- AWS CLI configured
- AWS CDK (`npm install -g aws-cdk`)
- Python 3.x (for some Lambda/test scripts)
- (Optional) ESP32/Arduino hardware

### 2. Clone and Install
```sh
git clone https://github.com/PustakP/HomeSense-AWS.git
cd HomeSense_AWS/infrastructure
npm install
```

### 3. Bootstrap & Deploy Infrastructure
```sh
cdk bootstrap
cdk deploy
```
- Stack creates DynamoDB tables, Cognito, IoT policy, SNS, Lambda, API Gateway
- Outputs API endpoint URL

### 4. Test the API
```sh
curl <API_ENDPOINT>/devices
```

### 5. Device Firmware (ESP32 Example)
- See `/firmware/esp32_sample.cpp`
- Configure WiFi, AWS IoT endpoint, X.509 certs
- Publishes telemetry, receives commands

### 6. Web Dashboard
- See `/frontend/README.md`
- Next.js app with Amplify Auth, device dashboard, automation UI

### 7. Alexa Skill
- See `/alexa/skill.json`
- Import into Alexa Developer Console
- Set Lambda endpoint
- Account linking with Cognito

### 8. Extending & Customizing
- Add more Lambda logic in `/services`
- Expand device types, automation rules
- Add notification channels (SMS/email) in SNS
- Enhance frontend UI/UX

## Applications
- Smart lighting, climate, and security control
- Energy saving automations
- Elderly care (alerts for inactivity, door open, etc.)
- Remote home monitoring for travel
- Integration with 3rd-party platforms (future)

## Troubleshooting
- If `cdk deploy` fails, check AWS credentials and region
- Use `cdk destroy` to remove all resources
- Check CloudWatch logs for Lambda/API errors

## Project Structure
```
/infrastructure   # AWS CDK (TypeScript)
/firmware         # ESP32/Arduino code
/services         # Lambda handlers
/frontend         # Next.js dashboard
/alexa            # Alexa skill config
```
---
For detailed setup, see the README in each subdirectory.