const asyncHandler=require("express-async-handler")
const Contact=require("../models/contactModel");
// GetContact

const getContacts = asyncHandler(async(req,res) => {
    const contacts= await Contact.find({user_id: req.user_id});
    res.status(200).json(contacts);
});

// PostContact

const createContact = asyncHandler(async(req,res) => {
    console.log("The request body is:", req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandetory!");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        // user_id: req.user.id
    });
    res.status(200).json(contact);
});

const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found !")
    }
    res.status(200).json(contact);
});

// PutContact

const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found !")
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});



// DeleteContact

const deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found !")
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

module.exports={getContacts,createContact,getContact,updateContact,deleteContact};
