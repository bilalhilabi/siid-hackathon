// AccountController.cls
public with sharing class accountController1 {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String recordTypeId, String picklistField, String picklistValue) {
        String query = 'SELECT Id, Name, Industry, IsActive__c FROM Account';
        if (recordTypeId != null || (picklistField != null && picklistValue != null)) {
            query += ' WHERE ';
            List<String> conditions = new List<String>();
            if (recordTypeId != null) {
                conditions.add('RecordTypeId = :recordTypeId');
            }
            if (picklistField != null && picklistValue != null) {
                conditions.add(picklistField + ' = :picklistValue');
            }
            query += String.join(conditions, ' AND ');
        }
        return Database.query(query);
    }

    //test
    //test
    //test

    @AuraEnabled(cacheable=true)
    public static List<RecordType> getRecordTypes() {
        return [SELECT Id, Name FROM RecordType WHERE SObjectType = 'Account'];
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getPicklistFields() {
        Schema.DescribeSObjectResult describe = Account.SObjectType.getDescribe();
        Map<String, Schema.SObjectField> fields = describe.fields.getMap();
        List<String> picklistFields = new List<String>();
        for (String fieldName : fields.keySet()) {
            Schema.DescribeFieldResult fieldDesc = fields.get(fieldName).getDescribe();
            if (fieldDesc.getType() == Schema.DisplayType.Picklist) {
                picklistFields.add(fieldName);
            }
        }
        return picklistFields;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getPicklistValues(String recordTypeId, String fieldName) {
        Schema.DescribeSObjectResult describe = Account.SObjectType.getDescribe();
        Schema.DescribeFieldResult fieldDescribe = describe.fields.getMap().get(fieldName).getDescribe();
        List<Schema.PicklistEntry> picklistEntries = fieldDescribe.getPicklistValues();
        List<String> values = new List<String>();
        for (Schema.PicklistEntry entry : picklistEntries) {
            values.add(entry.getValue());
        }
        return values;
    }
}


// public with sharing class accountController1 {

//     // Wrapper class to structure picklist field metadata
//     public class FieldMetadata {
//         @AuraEnabled public String fieldName;
//         @AuraEnabled public String fieldLabel;
//         @AuraEnabled public List<Map<String, String>> picklistValues;

//         public FieldMetadata(String fieldName, String fieldLabel, List<Map<String, String>> picklistValues) {
//             this.fieldName = fieldName;
//             this.fieldLabel = fieldLabel;
//             this.picklistValues = picklistValues;
//         }
//     }

//     @AuraEnabled(cacheable=true)
//     public static List<Account> getAccounts() {
//         return [SELECT Id, Name, Active__c, RecordType.Name FROM Account];
//     }

//     @AuraEnabled(cacheable=true)
//     public static List<RecordType> getAccountRecordTypes() {
//         return [SELECT Id, Name FROM RecordType WHERE SObjectType = 'Account'];
//     }

//     @AuraEnabled(cacheable=true)
//     public static List<FieldMetadata> getPicklistFieldsByRecordType(String recordTypeId) {
//         List<FieldMetadata> picklistFields = new List<FieldMetadata>();

//         Schema.SObjectType accountObj = Schema.getGlobalDescribe().get('Account');
//         Schema.DescribeSObjectResult objDescribe = accountObj.getDescribe();

//         // Validate record type
//         Map<Id, Schema.RecordTypeInfo> recordTypeMap = objDescribe.getRecordTypeInfosById();
//         if (!recordTypeMap.containsKey(recordTypeId)) {
//             throw new AuraHandledException('Invalid Record Type ID: ' + recordTypeId);
//         }

//         // Get all fields of the Account object
//         Map<String, Schema.SObjectField> fields = objDescribe.fields.getMap();

//         for (String fieldName : fields.keySet()) {
//             Schema.DescribeFieldResult fieldDescribe = fields.get(fieldName).getDescribe();

//             // Check if field is a picklist
//             if (fieldDescribe.getType() == Schema.DisplayType.Picklist) {
//                 List<Map<String, String>> picklistOptions = new List<Map<String, String>>();

//                 for (Schema.PicklistEntry entry : fieldDescribe.getPicklistValues()) {
//                     if (entry.isActive()) {
//                         picklistOptions.add(new Map<String, String>{
//                             'label' => entry.getLabel(),
//                             'value' => entry.getValue()
//                         });
//                     }
//                 }

//                 picklistFields.add(new FieldMetadata(fieldName, fieldDescribe.getLabel(), picklistOptions));
//             }
//         }

//         return picklistFields;
//     }
// }