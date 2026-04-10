public class namedCredentialIntegration {
    public static void getAcessToken() {
     
 		HttpRequest req = new HttpRequest();
		req.setEndpoint('callout:callout:Test_Client_Cred/services/data/v63.0/sobjects/Account');
		req.setMethod('GET');
		req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.setHeader('Accept','application/json');
 
		Http http = new Http();
		HTTPResponse res = http.send(req);
 
		System.debug('Response: ' + res.getBody());

    }
}

//if(response.getStatusCode()==200){
   // String responseBody = response.getBody();
//System.debug('Response'+responseBody);
//}
//else{
 //   system.debug('Callout Failed'+response.getStatusCode);
//}