public with sharing class FileUploaderController {
    @AuraEnabled
    public static Id uploadFile(String base64Data, String fileName, String recordId) {
        ContentVersion cv = new ContentVersion();
        cv.Title = fileName;
        cv.PathOnClient = fileName;
        cv.VersionData = EncodingUtil.base64Decode(base64Data);
        insert cv;
        
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id].ContentDocumentId;
        cdl.LinkedEntityId = recordId; // Link the file to Account record
        cdl.ShareType = 'V'; // View permission
        insert cdl;
        
        return cv.Id;
    }
}