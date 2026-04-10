public class ToolingApiFetcher {
public static void updateApexClass() {
        // Step 1: Get Apex Class by Name
        String query = 'SELECT Id, Name, Body FROM ApexClass WHERE Name = \'ContactQuery\'';
        String toolingEndpoint = URL.getOrgDomainUrl().toExternalForm() + '/services/data/v59.0/tooling/query/?q=' + 
            EncodingUtil.urlEncode(query, 'UTF-8');
 
        HttpRequest req = new HttpRequest();
        req.setEndpoint(toolingEndpoint);
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        req.setHeader('Content-Type', 'application/json');
 
        Http http = new Http();
        HttpResponse res = http.send(req);
        System.debug('Retrieve Response: ' + res.getBody());
 
        // Parse the JSON response
        Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        List<Object> records = (List<Object>) result.get('records');
 
        if (records.isEmpty()) {
            System.debug('No Apex class found.');
            return;
        }
 
        Map<String, Object> apexClass = (Map<String, Object>) records[0];
        String classId = (String) apexClass.get('Id');
        String currentBody = (String) apexClass.get('Body');
 
        // Step 2: Modify the class body
        String newBody = currentBody.replace('OldLogic()', 'NewLogic()'); // or full replacement
 
        // Step 3: Send PATCH request to update the class
        String updateEndpoint = URL.getOrgDomainUrl().toExternalForm() + '/services/data/v59.0/tooling/sobjects/ApexClass/' + classId;
 
        HttpRequest updateReq = new HttpRequest();
        updateReq.setEndpoint(updateEndpoint);
        updateReq.setMethod('PATCH');
        updateReq.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        updateReq.setHeader('Content-Type', 'application/json');
        updateReq.setBody(JSON.serialize(new Map<String, Object>{ 'Body' => newBody }));
 
        HttpResponse updateRes = http.send(updateReq);
        System.debug('Update Response: ' + updateRes.getBody());
    }
}