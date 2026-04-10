@isTest
public class contactDescriptionTest {

    @isTest
    public static void contactDescriptionTestMethod() {
        // Create test data
        List<Contact> conList = new List<Contact>{
            new Contact(FirstName = 'Ftest1', LastName = 'Test1'),
            new Contact(FirstName = 'Ftest2', LastName = 'Test2')
        };
        insert conList;

        Test.startTest(); // Start test execution scope

        // Call the handler method
        contactDescriptionHandler.method(conList);

        Test.stopTest(); // Stop test execution scope

        // Fetch the updated records
        List<Contact> updatedContacts = [SELECT Id, FirstName, LastName, Description FROM Contact WHERE Id IN :conList];

        // Assertions to validate the expected behavior
        for (Contact con : updatedContacts) {
            System.assertEquals(con.FirstName + ' ' + con.LastName, con.Description, 'Contact description is incorrect');
        }
    }
}