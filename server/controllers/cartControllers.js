import Cart from "../models/cartModel.js";


const cartData=async(req,res)=>{
  try {
    const {title,price,images,productId}=req.body;
    const userId=req.userID
    // const {  productId } = req.body;
    let existingItem = await Cart.findOne({ user: userId, productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json({ message: "Quantity increased" });
    }
    const cart=new Cart({
        title,
        price,
        images,
        quantity:1,
        user:userId,
        productId,
    })
    await cart.save()
    res.status(200).json({msg:"data added in cart"})
  } catch(error) {
    console.error("cart error",error)
  }
}

const deleteitem=async(req,res)=>{
  try {
    const {id}=req.params;
    const deleteItem=await Cart.findByIdAndDelete(
      id
    )
    if (!deleteItem) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.status(200).json({ msg: "Item deleted", deleteItem });
  } catch(error) {
    console.error(error);
  }
}


const cartFetch=async(req,res)=>{
  try {
    const userId=req.userID
    const cartDataFetch=await Cart.find({user:userId});
    if(!cartDataFetch){
      return res.status(404).json({msg:"cant fetch the product"})
    }
    res.status(200).json(cartDataFetch);
  } catch(error) {
    console.error(error);
    
  }
}


const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params; // cart item _id
    const { quantity } = req.body;

    const updatedItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    res.status(200).json({ msg: "Quantity updated", updatedItem });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export default {cartData,cartFetch,updateCartQuantity,deleteitem}