public with sharing class WrapperIntegration {
    //wrapper class
    public class pincodeResponse {
        public string Message {get;set;}
        public string Status {get;set;}
        public list<PostOffice> PostOffice {get;set;}
    }
    public class PostOffice {
        public string Name {get;set;}
        public string Description{get;set;}
        public string BranchType {get;set;}
        public string DeliveryStatus {get;set;}
        public string Circle {get;set;}
        public string District {get;set;}
        public string Division {get;set;}
        public string Region {get;set;}
        public string Block {get;set;}
        public string State {get;set;}
        public string Country {get;set;}
        public string Pincode {get;set;}
    }
    public static String getPincode(String pincode) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.postalpincode.in/pincode/' + pincode);
        req.setMethod('GET');
        try {
            HttpResponse res = http.send(req);
            if (res.getStatusCode() == 200) {
                // Deserialize the response body
                List<PincodeResponse> responses = (List<PincodeResponse>) JSON.deserialize(res.getBody(), List<PincodeResponse>.class);
                system.debug('responses' +responses);
                // Process the response data
                for (PincodeResponse response : responses) {
                    if(response.Status == 'Success' && !response.PostOffice.isEmpty()){
                        system.debug('response'+response.PostOffice[0].State);
                        return response.PostOffice[0].District;
                    }
                    return null;
                }
                return null;
            } else {
                return null;
            }
        } catch (Exception e) {
 
            return null;
        }
    }
}
 
    
   /* public static Map<string,object> method1(){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.postalpincode.in/pincode/518396');
        req.setMethod('GET');
        req.setHeader('Content-Type','Application/JSON');
        HttpResponse res = http.send(req);
        Map<string,object> response = new Map<string,object>();
        if(res.getstatuscode()== 200){
            system.debug('getbody' +res.getbody());
            list<object> convertObject = (list<object>)JSON.deserializeuntyped(res.getBody());
            system.debug('object' +convertObject);
            map<string,object> postoffice = (Map<string,object>)convertObject[0];
            system.debug('postoffice' +postoffice);
            list<object> postofficeDistrict = (list<object>)postoffice.get('PostOffice');
            system.debug('postofficeDistrict' +postofficeDistrict);
            for(object obj:postofficeDistrict){
                Map<string,object> district = (Map<string,object>) obj;
                system.debug('District' +district.get('District'));
                break;
            }
        }
        return response;
    }*/