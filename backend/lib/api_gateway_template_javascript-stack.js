const cdk = require("@aws-cdk/core");
const cognito = require("@aws-cdk/aws-cognito");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const apigw = require("@aws-cdk/aws-apigateway");

class ApiGatewayTemplateJavascriptStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, "UserPool", {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      userVerification: {
        emailSubject: "Verify your identity on your App",
        emailBody:
          "Hello {username}, welcome to your app. Use this {####} code to register",
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        phoneNumber: {
          required: true,
          mutable: true,
        },
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });
    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
    });
    const getItemsLambdaFunction = new lambda.Function(this, "getItemsLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("functions"),
      handler: "getItems.handler",
      timeout: cdk.Duration.seconds(10),
    });
    const createItemLambdaFunction = new lambda.Function(
      this,
      "createItemLambda",
      {
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("functions"),
        handler: "createItem.handler",
        timeout: cdk.Duration.seconds(10),
      }
    );
    const myTable = new dynamodb.Table(this, "BookmarkTable", {
      tableName: "myTable",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });
    myTable.grantFullAccess(getItemsLambdaFunction);
    getItemsLambdaFunction.addEnvironment("MY_TABLE", myTable.tableName);
    myTable.grantFullAccess(createItemLambdaFunction);
    createItemLambdaFunction.addEnvironment("MY_TABLE", myTable.tableName);
    const cognitoAuthorizer = new apigw.CognitoUserPoolsAuthorizer(
      this,
      "CognitoAuthorierOnLambda",
      {
        cognitoUserPools: [userPool],
      }
    );
    const api = new apigw.RestApi(this, "myApi", {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
      deploy: true,
    });
    const getItems = api.root.addResource("getItems");
    const getAllItemsIntegration = new apigw.LambdaIntegration(
      getItemsLambdaFunction
    );
    getItems.addMethod("GET", getAllItemsIntegration, {
      authorizer: cognitoAuthorizer,
    });
    const createItem = api.root.addResource("createItem");
    const createItemIntegration = new apigw.LambdaIntegration(
      createItemLambdaFunction
    );
    createItem.addMethod("POST", createItemIntegration, {
      authorizer: cognitoAuthorizer,
    });
    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });
    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
  }
}

module.exports = { ApiGatewayTemplateJavascriptStack };
