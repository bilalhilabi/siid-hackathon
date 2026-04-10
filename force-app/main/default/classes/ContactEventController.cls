public with sharing class ContactEventController {
    @AuraEnabled(cacheable=true)
    public static List<Event_Detail__c> getRelatedContactEvents(String contactId) {
        try {
            // Fetching related Contact_Event__c records based on ContactId
            List<Event_Detail__c> events = [
                SELECT Subject__c, StartDateTime__c, EndDateTime__c
                FROM Event_Detail__c 
                WHERE Contact__c = :contactId
            ];
            return events;
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching related events: ' + e.getMessage());
        }
    }
}