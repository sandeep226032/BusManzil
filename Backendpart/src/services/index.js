


import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import { signmodel } from "../models/index.js";
  const client = new MongoClient(process.env.DB_URL);
(async () => {
  
    try {
        // Connect to the MongoDB cluster
        await client.connect();

       
    
        console.log("connected successfully");
        
    

    } catch (e) {
        console.error(e);
    }
})();


 export async function run(d) {
    try {
        const database = client.db("Busdatabase");
        const colle = database.collection("busrecord");
    
    
       
        const findResult = await colle.find({name:d}).toArray();
        //  console.log('Found documents =>', findResult);
        return findResult;
    } catch (error) {
        console.log(error, "hello");
    }
    
} 
 export async function magic(data) {
    try {
        const database = client.db("Busdatabase");
        const colec = database.collection("busst");
        const result = await colec.find({busno:data}).toArray();
        // console.log('Found documents =>', result);
        return result;
    } catch (error) {
        console.log(error, "hi");
    }
}
export async function save(data) {
    try {
        await signmodel.create({
            name: data.name,
            phonenumber: data.phonenumber,
            email: data.email,
        password:data.password})
    } catch (error) {
        console.log("error in save function", error);
    }
}
export async function see(data) {
    try {
        const re = await signmodel.findOne({ $and: [{ name: data.name }, { email: data.email }] });
    
        return re;
    

        
    } catch (error) {
        console.log("error in finding function", error);
    }
}
export  async function signupverify(data) {
    try {
        const re = await signmodel.findOne({ $or: [{ email: data.email }, { phonenumber: data.phonenumber }] },{email:1,phonenumber:1})
        if (re== null) {
            return true;
        }
        // return false;
        return re;
    } catch (error) {
        
    }
}
export async function genrateaccessandrefreshtoken(id) {
try {
    const user = await signmodel.findById(id);
    
   const accestoken= user.genrateaccestoken();
    const refershtoken = user.genraterefreshtoken();
    user.refreshtoken = refershtoken;
   await user.save({validateBeforeSave:false})
    return {
        a: accestoken,
        r:refershtoken
    }
} catch (error) {
    console.log("error in genrating tokens", error);
}
    
}



