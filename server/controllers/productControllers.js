import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { title, price, category, ratings, images } = req.body;

    if (!title || !price || !category || !images || images.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      title,
      price,
      category,
      ratings,
      images
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Fetched products", products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const fetchSingleproduct=async(req,res) => {
  try {
    const {id}=req.params
    const Singleproduct=await Product.findById(id);
    if (!Singleproduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
   res.status(200).json(Singleproduct);
  } catch(error) {
    console.error("fetchSingleproduct error",error)
  }
}

export default { addProduct, fetchProduct,fetchSingleproduct };
