const Mongoose = require("mongoose");

let database = "DLC_SED";
let port = "27017";
let host = "localhost";
let uri = `mongodb://${host}:${port}/${database}`;

const connect = ()=>{
    Mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology:true})
    .then(()=>{
        console.log(`Conection to ${database} successfully`);
    })
    .catch(()=>{
        console.log(`Something went wrong trying to connect to
        ${database}`);
    });;

    Mongoose.Promise = global.Promise;
}

module.exports = {
    connect
};