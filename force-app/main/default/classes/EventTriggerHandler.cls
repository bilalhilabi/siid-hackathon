public class EventTriggerHandler {
    public static void handleAfterInsert(List<Event> newEvents) {
        List<Event_Detail__c> customEventList = new List<Event_Detail__c>();

        for (Event evt : newEvents) {
            
            if (evt.WhoId != null && String.valueOf(evt.WhoId).startsWith('003')) {
                Event_Detail__c customRec = new Event_Detail__c();
                customRec.Contact__c = evt.WhoId;
                customRec.Subject__c = evt.Subject;
                customRec.StartDateTime__c = evt.StartDateTime;
                customRec.EndDateTime__c = evt.EndDateTime;
                

                customEventList.add(customRec);
            }
        }

        if (!customEventList.isEmpty()) {
            try {
                insert customEventList;
            } catch (DmlException e) {
                System.debug('Error inserting custom event records: ' + e.getMessage());
            }
        }
    }
}