public class apexClassUseCase14 {
    public static void Fabonicci(Integer num){
        /* Integer n1=0;
         Integer n2=1;
        List<integer> arr=new List<integer>();
        if(num==0){
            arr.add(num);
        }
        else{

            arr.addAll(new List<Integer>{n1, n2});
             for(Integer i=1;i<num-1;i++){
                 integer sum=n1+n2;
                 arr.add(sum);
                 n1=n2;
                 n2=sum;
        }
           
        } 
        system.debug(arr);  */
        integer j=0;
        for(integer i=0; i<=num; i+=j){
            system.debug(j);
        }
    }
}