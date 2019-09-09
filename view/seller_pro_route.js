const express = require('express');
const router = express.Router() ;
const sellerController = require('../controller/seller')

router.post('/getAccess' , (req,res) => {
  
   sellerController.getAccess(req,res)

})
 
router.post('/loginseller' , (req,res) => {
   sellerController.loginseller(req,res)
})

router.post('/addproducts' , sellerController.verifyToken , (req,res) => {
    sellerController.addproduct(req,res);
})

router.put('/updateproduct/:id' , sellerController.verifyToken ,(req,res) => {
   sellerController.updateProduct(req,res)
} )

router.delete('/deleteproduct/:id' , sellerController.verifyToken , (req,res) => {
   sellerController.deleteProduct(req,res)
})

module.exports = router