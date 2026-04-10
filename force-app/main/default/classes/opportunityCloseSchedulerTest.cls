@isTest
public class opportunityCloseSchedulerTest {
    
    @testSetup
    static void setupTestData() {
        List<Opportunity> oppList = new List<Opportunity>();
        
        for (Integer i = 0; i < 5; i++) {
            oppList.add(new Opportunity(
                Name = 'Test Opportunity ' + i,
                StageName = 'Negotiation',  // Not closed yet
                CloseDate = Date.today().addDays(-31) // Simulate untouched for 30+ days
            ));
        }
        insert oppList;

        // Simulate that records are old using Test.setCreatedDate()
        for (Opportunity opp : oppList) {
            Test.setCreatedDate(opp.Id, DateTime.now().addDays(-31));
        }
    }
    
    @isTest
    static void testScheduler() {
        Test.startTest();
        OpportunityCloseScheduler scheduler = new OpportunityCloseScheduler();
        scheduler.execute(null);
        Test.stopTest();

        // Verify that the Opportunities are now marked as 'Closed Lost'
        List<Opportunity> updatedOpps = [SELECT Id, StageName FROM Opportunity WHERE StageName = 'Closed Lost'];
        System.assertEquals(5, updatedOpps.size(), 'All opportunities should be marked as Closed Lost');
    }
}