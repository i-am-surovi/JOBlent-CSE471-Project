import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req,res) => {
    try {
        
        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body),{
            "svix-id" : req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"],
        })

        // Getting Data from request body
        const { data, type } = req.body


    } catch (error) {
        
    }
}