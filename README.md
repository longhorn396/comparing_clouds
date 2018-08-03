# Comparing Cloud Providers: AWS, Azure, and GCP

## Links

[AWS](https://9x6wmuoxc6.execute-api.us-east-1.amazonaws.com/prod/home)
[Azure](https://randomrestaurantstorage2.z21.web.core.windows.net/)
[GCP](http://randomrestaurantselector.appspot.com/)

## Idea

My family recently moved to a new apartment complex (Beacon) in Houston from the Spring/Klein area. As such, we now have to find new places to eat out that we like. My dad compiled a list of restaurants in the area, and I decided to take this opportunity to turn this into a personal project, since my family as a whole can't easily make decisions about where to eat without at least one person saying "I don't care."

I had some experience with Amazon's Lambda functions and DynamoDB, and was originally going to just use those and other services in the Amazon Web Services free tier to be able to choose a restaurant from that list at random given an optional type of food. Once I got a proof of concept implemented, I decided to make two other versions using free tier services from Microsoft Azure and Google Cloud Platform as well.

## Services

* AWS
  * DynamoDB
  * Lambda
  * API Gateway
* Azure
  * Cosmos DB
  * Function Apps
  * StorageV2
* GCP
  * App Engine

## Findings

### AWS

Entering data into DynamoDB was not fun. While it does support exporting data to a .csv file, it does not support input in that format. There is a command line application that uploads data in JSON format, but this could only be done 25 objects at a time.

Lambda on the other hand was fun to use. Documentation for using it and DynamoDB together was very helpful. All configuration, testing, and coding was on the same screen which made the process a breeze.

API Gateway had it's ups and downs. On the one hand, it's very easy to get working with Lambda, and it can serve up static HTML like I wanted it to do. However, setting that up was fairly complex (see [here](https://blog.it-playground.eu/display-html-page-using-only-api-gateway/)) and takes a lot of clicking around the interface to edit the html once the API is deployed.

### Azure

Cosmos DB is awesome. I went with standard SQL API, but it can be configured for MongoDB, Cassandra, and others. I can't confirm for other APIs, but for the one I used I was able to upload JSON data to populate the database. (This was much appreciated as I was able to download the .csv from AWS and convert it to JSON.

Making a Function App was overall pretty straightforward. It differs from AWS Lambda in that each app can have more than one function, which I thought was kind of neat. Also unlike AWS, coding and testing are done on the same page, but configuration was not. I was okay with this, however, because the configuration options were no doubt better. I was able to have the results of a Cosmos DB query as a parameter in my JavaScript function (as long as the app was initially set up on a Windows OS). This meant the only thing needed by my code was to filter the results and return one at random, instead of having to query the database like my AWS implementation.

Serving the static HTML was made simple recently StorageV2 (see [here](https://azure.microsoft.com/en-us/blog/azure-storage-static-web-hosting-public-preview/)). It can be set up quickly as well as edited in-browser.

### GCP

I did not have the best experience with Google Could Platform. I wasn't too keen on manually inputting data with Datastore, so I tried Cloud SQL. That allowed me to import data as .csv, but Cloud Functions do not have good support for connecting to either Datastore or Cloud SQL.

That led me to App Engine. Since I was already breaking my pattern, I decided to make a Python app instead of JavaScript. I followed the documentation and examples for connecting the app to Cloud SQL, but after a few hours of trying and failing I decided to stop and instead serve up the same file as my Azure implementation, which communicates directly with the Azure Function App.

## Results

For this project, I had the best overall experience with Azure. Working with AWS was enjoyable, but where it fell flat Azure soared. It also has a dark theme, a great UI, and an in-browser shell. I haven't given up on GCP yet. If I was making a more classic application it would most likely be my favorite as its App Engine is included in its free tier, and I do plan on doing more with it somewhere down the line. Along with a dark mode for its online code editor in App Engine, it also has an in-browser shell.