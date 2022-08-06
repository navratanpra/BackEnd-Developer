function printDate(){
    const day= new Date ();
    const dd= day.getDate();
    const mm= day.getMonth()+1;
    const yyyy=day.getFullYear();
    console.log("current Date is -->" ,dd,"/",mm,"/",yyyy);

    
}

printDate()


function PrintMonth(){
    const months= ["jan","feb","mar","april","may","jun",
    "jul","aug","sep","oct","nov","dec"]

    let a =new Date()
    let month= month[a.getMonth()];
    console.log (month);
}
PrintMonth()

function getBatchInfo(){

console.log("plutonium, w3d5, the topic being taught today is node js module system")

}

getBatchInfo()


    module.exports.tarikh= printDate
    module.exports.mahina= PrintMonth
    module.exports.batchinfo= getBatchInfo

