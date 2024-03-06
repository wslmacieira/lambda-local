const { handler } = require(".")
const { Lambda } = require("aws-sdk");
const { stopLambda, startLambda, sleep } = require("./helper");
const lambda = new Lambda({
    apiVersion: '2015-03-31',
    endpoint: 'http://localhost:3002',
    sslEnabled: false,
    region: 'us-east-1',
    accessKeyId: 'any',
    secretAccessKey: 'any'
});
var eventparams = {
  FunctionName: 'dev-lambdaName',
  InvocationType: 'RequestResponse',
  Payload: ''
};

describe('lambda', () => {
    let PID
    beforeAll(async () => {
        PID = startLambda()
        console.log("PID: " + PID)
        await sleep(3000)
    })
    afterAll(async () => {
        await stopLambda(PID)
    })
    it('should be defined', () => {
        expect(handler).toBeDefined()
    })

    it('should be return status 200', async() => {
        const result = await handler()
        expect(result.statusCode).toBe(200)
    })

    it('should be return body with messge "Hello World"', async() => {
        const result = await handler()
        expect(result.body).toEqual("Hello World")
    })

    it('should be invoke handler', async() => {
        const result = await lambda.invoke({
            FunctionName: 'dev-lambdaName',
            InvocationType: 'RequestResponse',
            Payload: ''
        }).promise()
        expect(result.StatusCode).toBe(200)
    })
})