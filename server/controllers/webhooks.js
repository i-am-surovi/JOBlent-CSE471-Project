import {Webhook} from "svix";
import User from "../models/User.js";

//API CONTROLLER FUNC TO MANAGE Clerk user with database
const clerkWebhooks = async (req,res) => {
    try{

         //CREATE  svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        //verifying headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-signature": req.headers["svix-signature"],
            "svix-timestamp": req.headers["svix-timestamp"]
        });

        // getting data from request body
        const {data, type} = req.body

        //switch cases for different events
        switch(type){
            case 'user.created': {

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    resume: '',
                    image: data.image_url
                }
                await User.create(userData);
                res.json({})
                break;
            }
            
            case 'user.updated': {

                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

             case 'user.deleted': {
                
                await User.findByIdAndDelete(data.id);
                res.json({})
                break;
             }

            default:
                break;
        }

    } catch(error) {

        console.log(error.message);
        res.json({success: false, message: "webhooks error"});

    }
}

export { clerkWebhooks }

