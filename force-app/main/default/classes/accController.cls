public with sharing class accController {
    @AuraEnabled(cacheable=false)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name Phone FROM Account ];
    }

    @AuraEnabled
    public static void updateAccounts(List<Account> accounts) {
        update accounts;
    }
}