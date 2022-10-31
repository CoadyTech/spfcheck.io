# SPFcheck.io
![SPFcheck.io Logo](/logo.png?raw=true "SPFcheck.io")

Hello! Welcome to my mini server less project, [SPFcheck.io](https://www.spfcheck.io/).  

This software provides a no-nonsense website where engineers can check their domain names for correct and working email SPF record implementations.  

I wanted to help improve the security on the internet, and perhaps get a little better at coding whilst I'm at it.  

## Architecture  

![Architecture Overview](/architecture.jpg?raw=true)  

This project is built with the AWS Amplify service. It uses:  

 - **API Gateway** - To present a server less REST API to the world.  
 - **AWS Lambda** - To perform SPF record checks on-demand. Coded with Node.JS.  
 - **AWS S3** - HTML, CSS and JS hosting.  

## Deployment  
To automatically deploy the app, click the big orange button 👇  

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/CoadyTech/spfcheck.io)  

### Manual Deployment
Manual deployment steps coming soon.  