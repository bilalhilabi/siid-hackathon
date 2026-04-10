/*@RestResource(Urlmapping='/ApexRestApi')
global class ApexRestApi {
    
    @httpPost
    global static void saveAccConFromExtSys(){
        
        //initiate req and res obj
        RestRequest req=  RestContext.Request;
		RestResponse res =  RestContext.Response;
        

        //Parse json body into understandable structure
        String body = req.requestBody.toString(); //{"Customer Name":"Salesforce", "isAccount":"true"}
		MyJsonCls obj = (MyJsonCls)JSON.deserialize(body, MyJsonCls.Class);

		System.debug('@@@'+obj.CustomerName + '@'+obj.isAccount);

        
        //apex logic
        if(obj.isAccount==true){
           Account acc = new Account(Name=obj.CustomerName);
		   insert acc;  
        }
        else if(obj.isAccount==false){
            Contact con = new Contact(lastname=obj.CustomerName);
			insert con;
            
        }

		
        
    }

}*/

@RestResource(urlMapping='/accountAPI/get')
global with sharing class ApexRestApi {
 
   /* @HttpPost
    global static String createAccount(String name) {
        Account acc = new Account(Name = name);
        insert acc;
        return 'Account Created with ID: ' + acc.Id;
    }*/

     /*  
	@HttpGet
    global static List<Account> getAccount(){
        List<Account> acclist = [Select id,Name, annualRevenue from Account where annualRevenue != null ];
        return acclist;
}
*/
    

    @HttpGet
    global static List<Account> getAccount(){
		Map<String,String> paramMap =RestContext.request.params;
       String accIndustry = paramMap.get('Industry');
        List<Account> acclist = [Select id,Name, annualRevenue, Industry from Account where annualRevenue != null and Industry = :accIndustry ];
        return acclist;
    }
}