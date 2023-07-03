const { json } = require("express");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");




// Create Product --> Admin

exports.createProduct = catchAsyncError(async(req,res,next)=>{
  const product = await Product.create(req.body);
  res.status(201).json({
      success:true,
      product
  })
});



// Get all Products
exports.getAllProducts = catchAsyncError(async(req,res)=>{

  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
    const apifeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apifeatures.query;
    res.status(200).json({
        success:true,
        products,
        productCount,
    })
});

// Get single product Details
exports.getProductDetails =catchAsyncError( async(req,res,next)=>{
  const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found ",404));
    }
    
    res.status(200).json({
        success : true,
        product
    })
});

// Update Product --> Admin
exports.updateProduct = async (req, res, next) => {
    try {
      let product = await Product.findById(req.params.id);
  
      if (!product) {
        return next(new ErrorHandler("Product not found ",404));
    }
  
      product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
  
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      // Handle any potential errors
      res.status(500).json({
        success: false,
        message: "Error updating the product",
        error: error.message,
      });
    }
  };
  

// Delete Product
exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found ",404));
  }

    await product.deleteOne();
    res.status(200).json({
        success : true,
        message:"Product Deleted succesfully"
    })
});

  
  

