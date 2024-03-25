//with async-await

// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';

// async function findAll() {
    
//     const client = await MongoClient.connect(url, { useNewUrlParser: true })
//         .catch(err => { console.log("s2");console.log(err); });
//     if (!client) return;
        
//     try {
//         console.log('1');
//         const db =  client.db("mydb");
//         console.log('2');
//         let collection =  db.collection('customers');
//         console.log('3');
//         let cursor =  collection.find({}).limit(10);
//         console.log('4');
//         await cursor.forEach(doc => console.log(doc));
//         console.log('5');
//     } catch (err) {
//         console.log(err);
//     } finally {
//         client.close();
//     }
// }
// setTimeout(()=>{
//     findAll();
//     console.log('iter');
// }, 5000);



//Without async-await

// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';

//  function findAll() {
    
//     const client =  MongoClient.connect(url, { useNewUrlParser: true })
//         .catch(err => { console.log("s2");console.log(err); });
//     if (!client) return;
        
//     try {
//         console.log('1');
//         const db =  client.db("mydb");
//         console.log('2');
//         let collection =  db.collection('customers');
//         console.log('3');
//         let cursor =  collection.find({}).limit(10);
//         console.log('4');
//          cursor.forEach(doc => console.log(doc));
//         console.log('5');
//     } catch (err) {
//         console.log(err);
//     } finally {
//         client.close();
//     }
// }
// setTimeout(()=>{
//     findAll();
//     console.log('iter');
// }, 5000);









//Using Promise


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function findAll() {
    MongoClient.connect(url, { useNewUrlParser: true })
        .then(client => {
            console.log('1');
            const db = client.db("mydb");
            console.log('2');
            let collection = db.collection('customers');
            console.log('3');
            let cursor = collection.find({}).limit(10);
            console.log('4');
            
            // Wrap cursor.forEach in a Promise
            new Promise((resolve, reject) => {
                cursor.forEach(doc => {
                    console.log(doc);
                }, () => {
                    console.log('5');
                    resolve(); // Resolve the Promise when iteration is complete
                });
            })
            .then(() => {
                client.close();
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
            console.log("s2");
            console.log(err);
        });
}

setTimeout(() => {
    findAll();
    console.log('iter');
}, 5000);







