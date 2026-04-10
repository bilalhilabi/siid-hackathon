public class digitalOppList {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> opportunityRecords() {
        return [SELECT Id, Name, StageName, CloseDate FROM Opportunity];
    }
}