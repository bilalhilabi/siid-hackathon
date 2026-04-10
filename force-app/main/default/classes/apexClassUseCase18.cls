public class apexClassUseCase18 {
    public static void fetch(){
        List<Object> obj = new List<Object>();
        List<Account> accList = [Select id, CreatedDate from Account Where CreatedDate = TODAY ORDER BY CreatedDate DESC LIMIT 10];

        List<Contact> ConList = [Select id, CreatedDate from Contact Where CreatedDate = TODAY ORDER BY CreatedDate DESC LIMIT 10];
        obj.addAll(acclist);
        obj.addAll(conList);
        System.debug(obj);
    }
}