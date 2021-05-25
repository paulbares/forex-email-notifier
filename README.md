# Forex Email Notifier
Send forex rates periodically to a list of recipients/subscribers 

Notice the code only supports fetching the pair **EUR/AED** but can be easily adapted. 

## Configuration
- Forex rate is fetched from https://fixer.io/. You need an API access key to be able to fetch anything.
- A smtp server and a mail client. You can use MailGun for instance. 

The following parameters need to be set as environment variables:

```javascript
const access_key=process.env.FOREX_EMAIL_NOTIFIER_AK; // see usage https://fixer.io/documentation
const user=process.env.FOREX_EMAIL_NOTIFIER_USER; // see usage https://nodemailer.com/about/#example
const pass=process.env.FOREX_EMAIL_NOTIFIER_PASSWORD; // see usage https://nodemailer.com/about/#example
const receivers=process.env.FOREX_EMAIL_NOTIFIER_RECIPIENTS; // usage see https://nodemailer.com/about/#example
```

## Run
Once configured, simply run (locally):

```javascript
npm run start
```

You can setup a cron job to execute it on a regular basis. See [github action](.github/workflows/notifier.yml)
