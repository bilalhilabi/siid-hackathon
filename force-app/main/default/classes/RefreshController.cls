public with sharing class RefreshController {
    @AuraEnabled  
    public static List<Account> getAccountId( Id accountId) {
            return [SELECT Id, Name, Rating FROM Account WHERE Id = :accountId];
    }
}