const express = require("express")
const router = express.Router();
const Category = require("../models/category")


router.put("/:id",async (req,res) => {
    const category = await Category.findByIdUpdate(
        req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },{new: true}
    )

    if(!category){
        return res.status(400).send("the category cannot be created")
    }
    res.status(200).send(category)
})

router.get("/",async (req,res) => {
    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList)
})

router.get("/:id",async (req,res) => {
    let category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({message: "The category with the given ID was not found"})
    }

    res.status(200).send(category)
})

router.post("/",async (req,res) => {
    let cat = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    cat = await cat.save();

    if(!cat){
        return res.status(400).send("the category cannot be created")
    }

    res.send(cat)
})

router.delete("/:id",(req,res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if(category){
            return res.status(200).json({success: true,message: "the category deleted"})
        }else {
            return res.status(404).json({success: false,message: "category not deleted"})
        }
    }).catch((err) => {
        return res.status(400).json({success: false,error: err})
    })
})

module.exports = router;