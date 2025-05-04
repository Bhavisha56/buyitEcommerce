import Ordered from "../models/orderModel.js";
import Cart from "../models/cartModel.js"; 

const PlaceItem = async (req, res) => {
  try {
    const userId = req.userID;
    const { items, paymentMethod } = req.body;

    for (const item of items) {
      const { title, price, images, category, ratings } = item;

      const itemBuy = new Ordered({
        title,
        price,
        images,
        category,
        ratings,
        user: userId,
        paymentMethod,
      });

      await itemBuy.save();
    }

    await Cart.deleteMany({ user: userId });

    res.status(200).json({ msg: "Order placed and cart cleared!" });
  } catch (error) {
    res.status(500).json({ msg: "Order failed", error });
  }
};


const fetchitem=async(req,res)=>{
try {
    const userId = req.userID; 
    const items=await Ordered.find({ user: userId });
    res.status(200).json({items})

} catch(error) {
    console.error(error);
}
}

const deleteitem=async(req,res)=>{
    try {
        const {id}=req.params
        const deleteitem=await Ordered.findByIdAndDelete(id)
          res.status(200).json({msg:"item deleted",deleteitem})
    } catch(error) {
        console.error(error);
    }
}

export default { PlaceItem ,fetchitem,deleteitem};

