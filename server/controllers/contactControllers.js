import Contact from "../models/contactModel.js";

// Contact

const contactDataAdd=async(req,res)=>{
   try {
    const userId=req.userID
    
    const {name,email,message}=req.body;
   const createMessageContact=new Contact({
    name,
    email,
    message,
    user:userId
   }) 
   await createMessageContact.save()
   res.status(200).json({ msg: "contactdataAdded", contact: createMessageContact });

   } catch(error) {
    console.error(error);
   }
}

export default {contactDataAdd}