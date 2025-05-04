import Maincardmodel from "../models/MainCardsModel.js"

const mainCardProduct=async(req,res)=>{
    try {
        const { title, price, category, ratings, images } = req.body;
    
        if (!title || !price || !category || !images || images.length === 0) {
          return res.status(400).json({ message: "Missing required fields" });
        }
    
        const MainProduct = new Maincardmodel({
          title,
          price,
          category,
          ratings,
          images
        });
    
        await MainProduct.save();
        res.status(201).json({ message: "MaincardProduct added successfully", mainproduct: MainProduct });
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error" });
      }
}


const mainCardProductFetch=async(req,res)=>{
  try {
    const GetProduct=await Maincardmodel.find();
    res.status(200).json({ message: "Fetched products for main card", GetProduct });
    
  } catch(error) {
    console.error(error);
  }
}

const mainCardProductFetchSingle=async(req,res)=>{
    try {
        const {id}=req.params
        const Singleproductdata=await Maincardmodel.findById(id);
        if (!Singleproductdata) {
          return res.status(404).json({ message: 'Product not found' });
        }
       res.status(200).json(Singleproductdata);
    } catch(error) {
        console.error(error);
        
    }
}
export default {mainCardProduct,mainCardProductFetch,mainCardProductFetchSingle}