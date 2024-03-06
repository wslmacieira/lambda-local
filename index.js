
module.exports.handler = async (event, context) => {
    console.log("EVENT: " + JSON.stringify(event));
    return {
        statusCode: 200,
        body: "Hello World"
    }
}
