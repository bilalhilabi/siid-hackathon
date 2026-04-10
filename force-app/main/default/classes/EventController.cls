public class EventController {
    @AuraEnabled(cacheable=true)
    public static List<Event> getRelatedEvents(Id contactId) {
        return [SELECT Id, Subject, StartDateTime, EndDateTime, Location
                FROM Event
                WHERE WhatId = :contactId];
    }
}