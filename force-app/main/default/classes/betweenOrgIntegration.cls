public class betweenOrgIntegration {

    public static void createExternalUser(){

		//	CREATE USER
		Http hp = new Http();
		HttpRequest req = new HttpRequest();

		req.setEndpoint('https://conscendo-2a-dev-ed.develop.my.salesforce.com/services/data/v63.0/sobjects/Account');
     	req.setHeader('Content-Type','application/json');
        req.setMethod('POST');
		req.setBody('{"Name": "Mahesh","Phone": 7895576564}'); 

		HttpResponse res = new HttpResponse();
		res = hp.send(req);

		System.debug('response'+ res.getBody());
    }
    
}