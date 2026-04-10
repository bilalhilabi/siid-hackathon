public class opportunityCloseScheduler implements Schedulable {
    
    public void execute(SchedulableContext sc) {
        updateOldOpportunities();
    }

    public static void updateOldOpportunities() {
        // Get all Opportunities that haven't been updated in the last 30 days and are still open
        List<Opportunity> oldOpportunities = [ 
            SELECT Id, Name, StageName, LastModifiedDate 
            FROM Opportunity 
            WHERE StageName NOT IN ('Closed Won', 'Closed Lost')
            AND LastModifiedDate <= LAST_N_DAYS:30
        ];

        if (!oldOpportunities.isEmpty()) {
            for (Opportunity opp : oldOpportunities) {
                opp.StageName = 'Closed Lost';
            }
            update oldOpportunities;
        }
    }
}