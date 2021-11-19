const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const dbCatergoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(dbCategoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbCategoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if(!dbCategoryData){
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.status(200).json(dbCategoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async(req, res) => {
  try{
  // create a new category
const dbCategoryData =  await Category.create({
  category_name = req.body.category_name

});
res.status(200).json(dbCategoryData)
  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try{
    const dbCategoryData = await Category.update( req.body,{
      where :{
        id: req.params.id
      }
    })
    if(!dbCategoryData ){
      res.status(404).json({ mesaage: 'No category found with this id'})
      return;
    }
    res.status(200).json(dbCategoryData);
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id",async (req, res) => {
  // delete a category by its `id` value

   try{
     const dbCategoryData = await Category.destroy({
       where:{
         id: req.params.id
       }
     })
     if(!dbCategoryData){
       res.status(404).json({message: 'No category found with this id'});
        return;
      }
     res.status(200).json(dbCategoryData)
   } catch(err){
     console.log(err);
     res.status(500).json(err);
   }
});

module.exports = router;
