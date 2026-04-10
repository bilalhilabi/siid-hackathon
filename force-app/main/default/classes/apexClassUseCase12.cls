public class apexClassUseCase12 {
    public static List<Task> lastFiveTask(){
        List<Task> emptylist = new List<Task>();
     List<Task> taskList = [Select id, CreatedById, CreatedDate from Task WHERE CreatedDate= TODAY ORDER BY CreatedDate LIMIT 5 ];

        //List<Task> taskList = [Select id, CreatedById, CreatedDate from Task WHERE CreatedDate >= :Date.today() AND  CreatedDate <= :Date.today().addDays(1) LIMIT 5 ];
        if(tasklist.size() >0){
            return taskList;
        }
        return emptylist;
    }
}