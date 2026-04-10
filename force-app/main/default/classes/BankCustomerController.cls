public with sharing class BankCustomerController {
    @AuraEnabled
    public static void saveCustomer(Bank_Customer__c customer) {
        insert customer;
    }
}

//public with sharing class BankCustomerController {
  //  @AuraEnabled
    //public static void saveCustomer(Map<String, Object> fields) {
      //  Bank_Customer__c cust = new Bank_Customer__c();
        //for(String fieldName : fields.keySet()) {
        //    cust.put(fieldName, fields.get(fieldName));
      //  }
    //    insert cust;
  //  }
//}