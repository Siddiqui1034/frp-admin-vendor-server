import DB_Connection from "./utils/DBConnection.js"
import jwt from 'jsonwebtoken'
import { ObjectId } from "mongodb"

export const resolvers = {
    Query:{
        login: async (parent, args, context, info )=>{
            try{
                // console.log(args?.data)  // { data: { uid: 'admin', password: 'admin', role: 'admin' } }
                // DB_Connection function called here for Databse Connection
                const database = await DB_Connection()
                // const role=args?.data?.role === 'A' ?'admin':'vendor'
                // console.log(role);
                // const collectionObject = database.collection("admin")
                const collection = database.collection(args?.data?.role)
                console.log(1, args.data)
                // const users = await collectionObject.find(args?.data).toArray()// returning a promise so we have to write await keyword
                const user = await collectionObject.findOne(args?.data)// returning a promise so we have to write await keyword
                if(user){
                    const token = jwt.sign(args?.data, "appToken") // server side created token with name appToken by sign method given by jsonwebtoken
                    user.token = token; // adding one property in user i.e. token
                }
                return user
                // console.log(1, users);
                // console.log(users) // with find(args?.data).toArray() [ { _id: new ObjectId('664dd460e05fd96839f62963'), password: 'admin', uid: 'admin', role: 'admin' }]
                // console.log(users) // with findOne(args? data) { _id: new ObjectId('664dd460e05fd96839f62963'), password: 'admin', uid: 'admin', role: 'admin' }

                
                // if(users){
                //     return "success"
                // }
                // return "fail"

                
                // if(users){
                //     return users; 
                // }
                // return "Authentication failed"

            }
            catch(exception){
                // return 'DB Connection Error'
               console.error(`DB Connection Error ${exception.message}`);
                return exception.message;
            }
            finally{

            }
        },
        getVendors: async (parent, args, context, info)=>{
            try{
                const database = await DB_Connection()
                const vendorCollection = database.collection("vendors");
                const vendersDetails = await vendorCollection.find().toArray()
                return vendersDetails;
            }
            catch(exception){
                console.error(exception.message);
                return exception.message;
            }
        },
        getProducts: async () =>{
            try{
                const database = await DB_Connection()
                const collection = database.collection("products")
                const result = await collection.find({}).toArray()
                return result;
            }catch(exception){
                console.error(exception.message);
                return exception.message;
            }
        }
    },
    Mutation:{
        registerVendors: async (parent, args, context, info)=>{ 
        try{
            // insert data in the Databse so first we need database connection
            const database = await DB_Connection()
            const vendorCollection = database.collection("vendors");
            const vendersDetails = await vendorCollection.insertOne(args?.data)
            console.log(vendersDetails);
            return vendersDetails;
        }   
        catch(exception){
            console.log(`Data can't insert ${exception.message}`);
            return exception.message;
        }    
        },
        updateVendor: async (parent, args, context, info) =>{
            try{
                const db = await  DB_Connection();
                const collection = db.collection("vendors")
                const result = await collection.updateOne({_id: ObjectId.createFromHexString(args.id) },{$set:args.data})
                return result;                
            }catch(exception){
                console.error(exception)
                return exception.message;
            }
        },
        deleteVendor: async (parent, args, context, info) =>{
            try{
                const db = await DB_Connection();
                const collection = db.collection("vendors")
                const result = await collection.deleteOne({_id: ObjectId.createFromHexString(args.id) })
                return result;
            }catch(exception){
                console.error(exception)
                return exception.message;
            }
        },

        saveProduct: async (parent,args,context,info) =>{
            try{
                const databaseObject = await DB_Connection();
                const collection = databaseObject.collection("products")
                const result = await collection.insertOne(args.data)
                return result;
            }catch(ex){
                console.error(ex);
                return ex.message;
            }
        },
        updateProduct: async (parent, args, context, info) =>{
            try{
                const {data, id} = args; // data and id are inputs to updateProduct Mutation and we r destructing this here
                const database = await DB_Connection()
                const collectionobject = database.collection("products")
                const result = collectionobject.updateOne({_id: ObjectId.createFromHexString(id)}, {$set: data})
                return result;
            }catch(exception){
                console.error(exception)
                return exception.message;
            }
        }, 
        deleteProduct: async (parent, args, context, info) =>{
            try{
                const database = await DB_Connection()
                const collection = database.collection("products")
                const result = collection.deleteOne({_id: ObjectId.createFromHexString(args.id)})
                return result;
            }catch(exception){
                console.error(exception.message);
                return exception.message;
            }

        },

        changePassword: async (parent, args, context, info) =>{
            try{
                const { password, id } = args; 
                const database = await DB_Connection()
                const collection = database.collection("vendors")
                const result =collection.updateOne({_id: ObjectId.createFromHexString(id)}, {$set: {password: password}})
                return result;
            }catch(exception){
                console.error(exception.message);
                return exception.message
            }
        }

    }
}





























// Day-52 Lecture
// export const resolvers = {

//     Query: {
//         getProducts: ()=>{
//             // connection with Database or the functionality
//             return "Hello, Nausheeen"
//         },
//         getName: ()=>{
//             return "This is Name"
//         }
//     },

//     Mutation: {
//         SaveProducts: ()=>{
//             return "This product saved "
//         }
//     }
// }