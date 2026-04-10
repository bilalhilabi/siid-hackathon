public with sharing class DummyAuthController {
    @AuraEnabled(cacheable=false)
    public static String getAuthToken(String username, String password) {
        System.debug('Received Username: ' + username);
        System.debug('Received Password: ' + password);

        try {
            String endpoint = 'https://dummyjson.com/auth/login';
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(endpoint);
            request.setMethod('POST');
            request.setHeader('Content-Type', 'application/json');

          
            String requestBody = '{"username": "' + username + '", "password": "' + password + '", "expiresInMins": 1}';
            request.setBody(requestBody);

            System.debug('Request Body: ' + requestBody);

            HttpResponse response = http.send(request);
            System.debug('Response Status: ' + response.getStatusCode());
            System.debug('Response Body: ' + response.getBody());

            if (response.getStatusCode() == 200) {
                return response.getBody(); // Return full response as JSON
            } else {
                return '{"error": "Error: ' + response.getStatusCode() + ' - ' + response.getBody() + '"}';
            }
        } catch (Exception e) {
            System.debug('Exception: ' + e.getMessage());
            return '{"error": "Exception: ' + e.getMessage() + '"}';
        }
    }

@AuraEnabled
    public static Map<String, Object> getUserProfile(String accessToken) {
        System.debug('Fetching user profile with access token: ' + accessToken);
 
        if (String.isEmpty(accessToken)) {
            return new Map<String, Object>{'error' => 'Access token is required'};
        }
 
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://dummyjson.com/auth/me');
        request.setMethod('GET');
        request.setHeader('Authorization', 'Bearer ' + accessToken);
        request.setHeader('Content-Type', 'application/json');
 
        try {
            HttpResponse response = http.send(request);
            Integer statusCode = response.getStatusCode();
            String responseBody = response.getBody();
 
            System.debug('User info Status Code: ' + statusCode);
            System.debug('User info Body: ' + responseBody);
 
            if (statusCode == 200) {
                return (Map<String, Object>) JSON.deserializeUntyped(responseBody);
            } else {
                return new Map<String, Object>{'error' => 'Status code: ' + statusCode + ', Body: ' + responseBody};
            }
        } catch (Exception e) {
            System.debug('Exception in user info: ' + e.getMessage() + ', Stack: ' + e.getStackTraceString());
            return new Map<String, Object>{'exception' => e.getMessage()};
        }
    }


   @AuraEnabled
public static Map<String, Object> refreshToken(String refreshToken) {
    String apiUrl = 'https://dummyjson.com/auth/refresh';
    Http http = new Http();
    HttpRequest request = new HttpRequest();
    request.setEndpoint(apiUrl);
    request.setMethod('POST');
    request.setHeader('Content-Type', 'application/json');

    // Ensure the correct key is sent in the request body
    Map<String, Object> requestBodyMap = new Map<String, Object>{
        'token' => refreshToken  // API might expect 'token' instead of 'refreshToken'
    };

    request.setBody(JSON.serialize(requestBodyMap));
    Map<String, Object> result = new Map<String, Object>();

    try {
        HttpResponse response = http.send(request);
        System.debug('Refresh Token Response: ' + response.getBody());

        if (response.getStatusCode() == 200) {
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

            // Ensure both accessToken and refreshToken are properly extracted
            if (responseMap.containsKey('token')) {
                result.put('accessToken', responseMap.get('token'));
            }
            if (responseMap.containsKey('refreshToken')) {
                result.put('refreshToken', responseMap.get('refreshToken'));
            }

            if (!result.containsKey('accessToken')) {
                result.put('error', 'Missing accessToken in response.');
            }
        } else {
            result.put('error', 'Failed to refresh token: ' + response.getBody());
        }
    } catch (Exception e) {
        result.put('exception', e.getMessage());
    }
    return result;
}



}