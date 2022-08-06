function lowercase(){
    let name1 = "NAVRATAN PRAJAPAT"
  let fullName1 =name1.toLowerCase();
console.log(fullName1)

uppercase()
}


function uppercase(){
    let name2= "navratan prajapat"
    let fullName2= name2.toUpperCase();
    console.log(fullName2)
    trim()
}

function trim(){
    let name = " navratan prajapat "
    let fullName =name.trim();
    console.log(fullName)
}

module.exports.lowercase = lowercase