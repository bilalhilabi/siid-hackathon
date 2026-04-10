public class Integration {
    public static void callexternalUser() {
       
        Http httpObj = new Http();
        HttpRequest req = new HttpRequest();
        
     
        req.setEndpoint('https://dummyjson.com/auth/login');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        String requestBody = '{"username":"emilys", "password":"emilyspass"}';
        req.setBody(requestBody);
 HttpResponse res = httpObj.send(req);
System.debug('Success! Response: ' + res.getBody());
        
       
    }
}