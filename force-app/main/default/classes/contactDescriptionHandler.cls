public  class contactDescriptionHandler {
    public static void method(List<Contact> conlist) {
            for(Contact con : conlist){
               con.Description = con.FirstName + ' ' +con.LastName;
            }
    }
}