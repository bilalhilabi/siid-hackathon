public with sharing class AccountTriggerHandler {
    public static void handleAccountNameChange(List<Account> newAccounts, Map<Id, Account> oldAccountMap) {
        List<Account> accountsToUpdate = new List<Account>();

        for (Account acc : newAccounts) {
            Account oldAcc = oldAccountMap.get(acc.Id);
            if (oldAcc != null && acc.Name != oldAcc.Name) {
                acc.Name_Changed__c = true; // Mark the custom field as true
                accountsToUpdate.add(acc);
            }
        }

        // No DML needed, since we are modifying Trigger.new records
    }
}