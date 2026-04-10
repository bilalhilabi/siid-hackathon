public with sharing class accountController {
    @AuraEnabled(cacheable=true)
    //  public static List<Account> getAccounts(){

    //     Id userId = UserInfo.getUserId();

    //     // Get logged-in user's ContactId
    //     User u = [SELECT ContactId FROM User WHERE Id = :userId LIMIT 1];

    //     if(u.ContactId == null){
    //         return new List<Account>();
    //     }

    //     // Get Account related to that Contact
    //     Contact c = [SELECT AccountId FROM Contact WHERE Id = :u.ContactId LIMIT 1];

    //     return [SELECT Id, Name, Phone, Industry, Type
    //             FROM Account
    //             WHERE Id = :c.AccountId];
    // }

   public static List<Account> getAccounts(Id userId){

        User u = [SELECT Contact.AccountId 
                  FROM User 
                  WHERE Id = :userId 
                  LIMIT 1];

        if(u.Contact.AccountId == null){
            return new List<Account>();
        }

        return [
            SELECT Id, Name, Phone, Industry, Type
            FROM Account
            WHERE Id = :u.Contact.AccountId
        ];
    }

}