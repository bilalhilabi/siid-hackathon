public with sharing class IntegrationApexTask1 {
    @AuraEnabled(cacheable=false)
    public static String getAuthToken(String username, String password) {
        try {
            String endpoint = 'https://dummyjson.com/auth/login';
            
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(endpoint);
            request.setMethod('POST');
            request.setHeader('Content-Type', 'application/json');

            // Construct JSON body
            String requestBody = '{"username": "' + username + '", "password": "' + password + '", "expiresInMins": 30}';
            request.setBody(requestBody);

            HttpResponse response = http.send(request);

            if (response.getStatusCode() == 200) {
                return response.getBody();  // Return response JSON
            } else {
                return 'Error: ' + response.getStatus() + ' - ' + response.getBody();
            }
        } catch (Exception e) {
            return 'Exception: ' + e.getMessage();
        }
    }
}