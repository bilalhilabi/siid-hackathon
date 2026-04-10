global class ApexSoapApi {
    webservice static string AccConFromExtSys( String CustomerName, Boolean isAccount){
		
        if(isAccount==true){
            Account acc = new Account(Name=CustomerName);
            insert acc;
            return acc.id;
        }
        else{
            Contact con = new Contact(LastName=CustomerName);
			insert con;
            return con.id;
        }
    }
}