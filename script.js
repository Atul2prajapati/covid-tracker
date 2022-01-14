

    // function init(){
        let url1 ="https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";
        let url2 = "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true";
        $.get(url1,function(data){
            //india
           $("#in-total").text(data.totalCases);
          
           
            $("#in-active").text(data.activeCases);
            
           $("#in-newactive").text(data.activeCasesNew+"+");

           $("#in-recover").text(data.recovered);
           $("#in-newrecover").text(data.recoveredNew+"+");

           $("#in-death").text(data.deaths);
           $("#in-newdeath").text(data.deathsNew+"+");
            

            });

        $.get(url2,function(data){
            let total =0;
            let recover =0;
            let death =0;
            let tested =0;
            for(let i=0;i<data.length;i++)
            {
                total+=data[i].infected;
                if(data[i].recovered !="NA"&& data[i].recovered != null )
                {recover+=data[i].recovered;}

                if(data[i].deceased !="NA" && data[i].deceased!=null)
                {
                    death+=data[i].deceased;
                }
                if(data[i].tested!="NA" && data[i].tested!=null)
                {
                    tested+=data[i].tested;
                }

            }
           $("#total").text(total);
           $("#recover").text(recover);
           $("#deaths").text(death);
           $("#tested").text(tested);
        });
    
    // init();
    // putData();
    let arrData =[];
    // function putData()
    // {
        let url="https://api.rootnet.in/covid19-in/stats/latest";
               
                  fetch('https://api.rootnet.in/covid19-in/stats/latest')
                    .then(response => response.json())
                    .then((info) => { arrData=[...info.data.regional] ;
                              console.log(arrData);
                        let searchbtn=document.querySelector("#search-btn");
                            let searchtool=document.querySelector(".search-tool");
                           
                            searchbtn.addEventListener("click",function(){
                            let getdata =  searchtool.value.toLowerCase();
                            console.log(getdata);
                            let filtered=arrData.filter((val)=>{
                                                return val.loc.toLowerCase().includes(getdata);
                            });
                            console.log(filtered);
                            
                            filtered.map((val)=>{
                                // let div = $("</div>").attr("id","ex1");
                                // div.attr("class","modal");
                                //     div.className ='modal';
                                    let active=val.confirmedCasesIndian-(val.deaths+val.discharged);
                                    let div =document.querySelector(".modal");
                                   
                                        div.innerHTML =`
                                    <div class="head"></div>
                                    <div class="col"><h2>${val.loc}</h2></div>
                                    <div class="col"><h2>${val.confirmedCasesIndian}</h2></div>
                                    <div class="col"><h2>${active}</h2></div>
                                    <div class="col"><h2>${val.discharged}</h2></div>
                                    <div class="col"><h2>${val.deaths}</h2></div>
                                    
                                   `;
                                   $('.search-btn').click(function(e){
                                       $('.modal').css({"top":"17rem","left":"22rem"});
                                   })
                                    
                                    $(".modal").click(function(e){
                                        $(this).css({"top":-200,});
                                    })
                                //    div.addEventListener();
                               
                             });
                            

                            })

                        for(let i=0;i<arrData.length;i++)
                        { CreateDiv(arrData[i].confirmedCasesIndian,arrData[i].loc,arrData[i].discharged,arrData[i].deaths)}
                          
                    });
       
    //  }

    


        function CreateDiv(total ,state, recover,death){
        let div = document.createElement('div');
        div.className ='values';
        let active=total-(death+recover);
            div.innerHTML =`
        <div class="head"></div>
         <div class="col"><h2>${state}</h2></div>
         <div class="col"><h2>${total}</h2></div>
         <div class="col"><h2>${active}</h2></div>
         <div class="col"><h2>${recover}</h2></div>
         <div class="col"><h2>${death}</h2></div>
         </div>`;
         document.getElementById("table").appendChild(div);
        
        }
        // console.log(arrData)
        // let searchbtn=document.querySelector("#search-btn");
        // let searchtool=document.querySelector(".search-tool");
        // searchbtn.addEventListener("click",function(){
        //  let getdata =  searchtool.value.toLowerCase();
        
        // })


 