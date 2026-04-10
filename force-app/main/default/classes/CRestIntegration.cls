public class CRestIntegration {

    @AuraEnabled(cacheable=true)
    public static List<object> callExternalUser(){

		//GET Users
        Http httpobj = new Http();
		HttpRequest req = new HttpRequest();
        
        req.setEndpoint('https://jsonplaceholder.typicode.com/albums');
		req.setHeader('Content-Type','application/json');
		req.setMethod('GET');
  	

		HttpResponse res = new HttpResponse();
		res = httpobj.send(req);

		System.debug('response'+ res.getBody());

         List<Object> albums = (List<Object>) JSON.deserializeUntyped(res.getBody());
        return albums;
        
        
    }
}