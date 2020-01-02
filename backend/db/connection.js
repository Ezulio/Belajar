const monk = require('monk')

// Connection URL
const url = 'mongodb+srv://yanka:yanka123@belajar-mx49o.gcp.mongodb.net/belajar?retryWrites=true&w=majority';

const db = monk(url);
try{
  db.then(() => {
    console.log('Connected correctly to server')
  });
}

catch(e){
  console.log(e)
}


module.exports=db;
