public with sharing class formController {
 
    // Wrapper class to hold field metadata details
    public class FieldMetadata {
        @AuraEnabled public String fieldName;
        @AuraEnabled public String fieldLabel;
        @AuraEnabled public String fieldType;
        @AuraEnabled public List<String> picklistValues;
 
        public FieldMetadata(String name, String label, String type, List<String> picklistValues) {
            this.fieldName = name;
            this.fieldLabel = label;
            this.fieldType = type;
            this.picklistValues = picklistValues;
        }
    }
 
    @AuraEnabled
    public static List<Map<String, Object>> getObjectFields(String objectName) {
        if (String.isEmpty(objectName) || !objectName.endsWith('__c')) {
            throw new AuraHandledException('Invalid object: Only custom objects are allowed');
        }
 
        List<Map<String, Object>> fieldsList = new List<Map<String, Object>>();
        Schema.SObjectType objType = Schema.getGlobalDescribe().get(objectName);
       
        if (objType == null) {
            throw new AuraHandledException('Invalid object: ' + objectName + ' does not exist');
        }
       
        Map<String, Schema.SObjectField> fields = objType.getDescribe().fields.getMap();
       
        for (String fieldName : fields.keySet()) {
            if (!fieldName.endsWith('__c')) continue;
 
            Schema.DescribeFieldResult fieldDescribe = fields.get(fieldName).getDescribe();
            if (!fieldDescribe.isAccessible()) continue;
 
            Map<String, Object> fieldData = new Map<String, Object>{
                'fieldName' => fieldName,
                'fieldLabel' => fieldDescribe.getLabel(),
                'fieldType' => fieldDescribe.getType().name()
            };
 
            if (fieldDescribe.getType() == Schema.DisplayType.Picklist) {
                List<Map<String, String>> picklistOptions = new List<Map<String, String>>();
                for (Schema.PicklistEntry entry : fieldDescribe.getPicklistValues()) {
                    picklistOptions.add(new Map<String, String>{
                        'label' => entry.getLabel(),
                        'value' => entry.getValue()
                    });
                }
                fieldData.put('picklistValues', picklistOptions);
            }
 
            fieldsList.add(fieldData);
        }
        return fieldsList;
    }
    @AuraEnabled
    public static Id saveCorporateData(Map<String, Object> shareholderValues, List<Map<String, Object>> nomineeValues) {
        try {
            if (shareholderValues == null || shareholderValues.isEmpty()) {
                throw new AuraHandledException('Error: No Shareholder data received.');
            }
    
            Schema.SObjectType shareholderType = Schema.getGlobalDescribe().get('Form__c');
            Schema.SObjectType nomineeType = Schema.getGlobalDescribe().get('SubForm__c');
    
            if (shareholderType == null || nomineeType == null) {
                throw new AuraHandledException('Error: Custom objects do not exist.');
            }
    
            Map<String, Schema.SObjectField> shareholderFields = shareholderType.getDescribe().fields.getMap();
            Map<String, Schema.SObjectField> nomineeFields = nomineeType.getDescribe().fields.getMap();
    
            Form__c shareholder = new Form__c();
            for (String fieldName : shareholderValues.keySet()) {
                if (shareholderFields.containsKey(fieldName)) {
                    Schema.DescribeFieldResult fieldDesc = shareholderFields.get(fieldName).getDescribe();
                    Object value = shareholderValues.get(fieldName);
                    value = processFieldValue(fieldDesc, value, fieldName);
                    shareholder.put(fieldName, value);
                }
            }
    
            insert shareholder;
            System.debug('Inserted Form: ' + shareholder.Id);
    
            List<SubForm__c> nomineesToInsert = new List<SubForm__c>();
            for (Map<String, Object> nomineeData : nomineeValues) {
                SubForm__c nominee = new SubForm__c();
                for (String fieldName : nomineeData.keySet()) {
                    if (nomineeFields.containsKey(fieldName)) {
                        nominee.put(fieldName, nomineeData.get(fieldName));
                    }
                }
                nominee.Form__c = shareholder.Id;
                nomineesToInsert.add(nominee);
            }
    
            if (!nomineesToInsert.isEmpty()) {
                insert nomineesToInsert;
                System.debug('Inserted Nominees Count: ' + nomineesToInsert.size());
            }
    
            return shareholder.Id; // Return the created Form__c record ID
        } catch (DmlException dmlEx) {
            System.debug('DML Exception: ' + dmlEx.getMessage());
            throw new AuraHandledException('DML Exception: ' + dmlEx.getMessage());
        } catch (Exception e) {
            System.debug('Exception occurred: ' + e.getMessage());
            throw new AuraHandledException('Error: ' + e.getMessage());
        }
    }
    
 
    private static Object processFieldValue(Schema.DescribeFieldResult fieldDesc, Object value, String fieldName) {
        try {
            if (fieldDesc.getType() == Schema.DisplayType.Date && value instanceof String) {
                return Date.valueOf((String) value);
            }
            if (fieldDesc.getType() == Schema.DisplayType.Percent && value instanceof String) {
                return Decimal.valueOf((String) value);
            }
            if (fieldDesc.getType() == Schema.DisplayType.Reference && value instanceof String) {
                return Id.valueOf((String) value);
            }
        } catch (Exception e) {
            throw new AuraHandledException('Invalid data for field ' + fieldName + ': ' + e.getMessage());
        }
        return value;
    }
}