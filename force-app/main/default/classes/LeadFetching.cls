public with sharing class LeadFetching {
    
    @AuraEnabled(cacheable=true)
    public static List<Lead> fetchLeads() {
        return [
            SELECT Id, FirstName, LastName, Company, Email, Phone, Status, Rating 
            FROM Lead Where Rating != null
        ];
    }
}