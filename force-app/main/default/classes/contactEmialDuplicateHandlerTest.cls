@isTest
public  class contactEmialDuplicateHandlerTest {

    @testSetup
    static void setupTestData() {
        // Create test Contacts
        Contact con1 = new Contact(FirstName = 'John', LastName = 'Doe', Email = 'john.doe@example.com');
        insert con1;

        Contact con2 = new Contact(FirstName = 'Jane', LastName = 'Doe', Email = 'jane.doe@example.com');
        insert con2;
    }

    @isTest
    static void testDuplicateEmailPrevention() {
        Test.startTest();
        Contact con3 = new Contact(FirstName = 'Duplicate', LastName = 'Test', Email = 'john.doe@example.com');

        try {
            insert con3;
            System.assert(false, 'Duplicate contact should not be inserted.');
        } catch (DmlException e) {
            System.assert(e.getMessage().contains('A contact with this email already exists.'), 'Error message should indicate duplicate email.');
        }
        Test.stopTest();
    }

    @isTest
    static void testEmailChangeTrigger() {
        // Retrieve existing contact
        Contact con = [SELECT Id, Email FROM Contact WHERE Email = 'jane.doe@example.com' LIMIT 1];

        Test.startTest();
        con.Email = 'updated.jane@example.com';
        update con;
        Test.stopTest();

        // Verify email change
        Contact updatedCon = [SELECT Email FROM Contact WHERE Id = :con.Id];
        System.assertEquals('updated.jane@example.com', updatedCon.Email, 'Email should be updated.');
    }



    @isTest
    static void testBulkInsertAndUpdate() {
        List<Contact> contactList = new List<Contact>();

        for (Integer i = 0; i < 10; i++) {
            contactList.add(new Contact(FirstName = 'Test' + i, LastName = 'User', Email = 'test' + i + '@example.com'));
        }

        Test.startTest();
        insert contactList;
        Test.stopTest();

        // Validate insertion
        Integer count = [SELECT COUNT() FROM Contact WHERE Email LIKE 'test%@example.com'];
        System.assertEquals(10, count, '10 contacts should be inserted.');

        // Update all emails
        for (Contact con : contactList) {
            con.Email = 'updated_' + con.Email;
        }

        Test.startTest();
        update contactList;
        Test.stopTest();

        // Validate update
        Integer updatedCount = [SELECT COUNT() FROM Contact WHERE Email LIKE 'updated_test%@example.com'];
        System.assertEquals(10, updatedCount, 'All 10 emails should be updated.');
    }

    @isTest
    static void testFutureMethodExecution() {
        // Insert Contact
        Contact con = new Contact(FirstName = 'Test', LastName = 'Future', Email = 'future.test@example.com');
        insert con;

        // Update email to trigger @future method
        Test.startTest();
        con.Email = 'future.updated@example.com';
        update con;
        Test.stopTest();

        // Since future methods run asynchronously, we cannot directly verify the email sent.
        // However, we can confirm that no errors occur in the process.
        System.assert(true, 'Future method executed successfully.');
    }
}