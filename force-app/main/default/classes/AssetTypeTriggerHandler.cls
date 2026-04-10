public with sharing class AssetTypeTriggerHandler {
    /**
     * Handles before-insert logic for Asset_Type__c records.
     * Assigns a sequential Asset_Code__c value in the format AT-0001, AT-0002, …
     *
     * @param newRecords List of Asset_Type__c records being inserted
     * //Test
     */
    public static void handleAfterInsert(List<Asset_Type__c> newRecords) {
        if (newRecords == null || newRecords.isEmpty()) {
            return;
        }

        // Determine the current maximum Asset_Code__c value (if any)
        Integer startNumber = 1;
        List<Asset_Type__c> existing = [
            SELECT Asset_Code__c
            FROM Asset_Type__c
            WHERE Asset_Code__c != null
            ORDER BY Asset_Code__c DESC
            LIMIT 1
        ];

        if (!existing.isEmpty() && existing[0].Asset_Code__c != null) {
            String maxCode = existing[0].Asset_Code__c;
            // Extract the numeric part from the code (e.g., "AT-0001" -> 1)
            if (maxCode.startsWith('AT-')) {
                String numericPart = maxCode.substring(3);
                try {
                    startNumber = Integer.valueOf(numericPart) + 1;
                } catch (Exception e) {
                    // If parsing fails, start from 1
                    startNumber = 1;
                }
            }
        }

        // Assign sequential codes to new records
        Integer currentNumber = startNumber;
        List<Asset_Type__c> assetsToUpdate = new List<Asset_Type__c>();
        for (Asset_Type__c assetType : newRecords) {
            assetsToUpdate.add(new Asset_Type__c(
                Id = assetType.Id,
                Asset_Code__c = 'AT-' + String.valueOf(currentNumber).leftPad(4, '0')
            ));
            currentNumber++;
        }

        // Update the records with the new codes
        if (!assetsToUpdate.isEmpty()) {
            update assetsToUpdate;
        }
    }
}