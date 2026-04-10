public class ApexClassUseCase4 {
    public static List<string> method( String AccountName){
        List<string> emptylist = new List<string>();
      List<Account> acclist =  [Select id from Account Where Name = :AccountName];
        system.debug(acclist);
        if(acclist.size() ==1){
            List<Contact> conlist = [Select id,Email from Contact where AccountId = :acclist[0].id];
            for( Contact con:conlist){
                if(con.Email != null){
                    emptylist.add(con.Email);
                    
                }
                
            }
            
        } 
        return emptylist;
        
    }
}