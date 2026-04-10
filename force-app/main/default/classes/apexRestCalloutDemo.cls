public class apexRestCalloutDemo {
    public static void callExternalUser(){

		//GET Users
        Http httpobj = new Http();
		HttpRequest req = new HttpRequest();
        
        req.setEndpoint('https://jsonplaceholder.typicode.com/albums');
		req.setHeader('Content-Type','application/json');
		req.setMethod('GET');
  		//req.setBody();

		HttpResponse res = new HttpResponse();
		res = httpobj.send(req);

		System.debug('response'+ res.getBody());
    }
  
    public static void createExternalUser(){

		//	CREATE USER
		Http hp = new Http();
		HttpRequest req = new HttpRequest();

		req.setEndpoint('https://reqres.in/api/users');
     	req.setHeader('Content-Type','application/json');
        req.setMethod('POST');
		req.setBody('{"name": "morpheus","job": "leader"}'); //{"name": "morpheus","job": "leader"}

		HttpResponse res = new HttpResponse();
		res = hp.send(req);

		System.debug('response'+ res.getBody());
    }
    
}