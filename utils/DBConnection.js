import mongo from 'mongodb'

async function DB_Connection(){

    try{
        const url = "mongodb+srv://nausheen:14Nausheen$@finalproject.z9dhgcu.mongodb.net/"
        const mongoClient = mongo.MongoClient;
        const server = await mongoClient.connect(url) //returns a promise so hold result with await and write in try it always gives success response
        const dbObject = server.db("e-commerce")
        return dbObject;  // return a promise 
    }
    catch(exception){
        console.error(exception)
        return `Database Connection Error ${exception.message}`
    }
}

export default DB_Connection;