@RestResource(urlMapping='/PingService/*')
global with sharing class PingService {

    // GET method for ping
    @HttpGet
    global static String doGet() {
        return 'Pong!';
    }

    // POST method
    @HttpPost
    global static String doPost() {
        RestRequest req = RestContext.request;
        String body = req.requestBody.toString();
        return 'Received POST with body: ' + body;
    }
}