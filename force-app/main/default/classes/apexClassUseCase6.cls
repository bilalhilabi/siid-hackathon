public class apexClassUseCase6 {
    public static Boolean ageChecking(Integer Year, Integer Month, Integer Day){
          Date dob = Date.newInstance(Year, Month, Day); 
             date today = Date.today();  
				Integer age = today.year() - dob.year();
        
         if (today.month() < dob.month() || (today.month() == dob.month() && today.day() < dob.day())) {
            age--;
          
        }
            if(age>=18){
           return true;
        }else{
           return false; 
        }
       

    }
}