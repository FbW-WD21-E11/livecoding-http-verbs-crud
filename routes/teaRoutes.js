import express from 'express';
import Tea from '../models/tea.js';

//Creating a router
const router = express.Router();

//GET request (READ)
//http://localhost/api/teas
router.get('/', async (req, res) => {
    const teas = await Tea.find();

    return res.status(200).json(teas);
});

//GET request (READ)
//TEA by id 
//http://localhost/api/teas/byid/
router.get('/byid/:id', async (req, res) => {
    const tea = await Tea.findById(req.params.id);

    return res.status(200).json(tea);
});

//GET request (READ)
//TEA by name 
//http://localhost/api/teas/byname/Ceylon Tea
router.get('/byname/:name', async (req, res) => {
    //returns the first tea it finds with that name
    const tea = await Tea.findOne({name:req.params.name})
        
    if (!tea) {
        return res.status(404).json("Tea not found");
    }

    return res.status(200).json(tea);
});

//GET request (READ)
//TEA by name 
//http://localhost/api/teas/byname/multiple/Ceylon Tea
router.get('/byname/multiple/:name', async (req, res) => {
    //returns the first tea it finds with that name
    const tea = await Tea.find({name:req.params.name})
        
    if (!tea) {
        return res.status(404).json("Tea not found");
    }

    return res.status(200).json(tea);
});


//POST request (CREATE)
//http://localhost/api/teas/create
//BODY: 
// {
// 	"name":"Ceylon Tea",
// 	"description":"Very tasty tea from Sri Lanka",
// 	"category":"BLACKTEA",
// 	"price":"2.99"
// }
router.post('/create', async(req, res) => {
    
  try {
    const createdTea = await Tea.create({
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        price:req.body.price
    })

    return res.status(200).json({message:'Tea created', createdTea});
  } catch (error) {
    //if there's an error 
    return res.status(500).json({message:'Error happened'});
  }
});

//PATCH request (UPDATE resource partly)
//http://localhost/api/teas/update/632c28187b61a7af2621ef3a (! this is an example id)
//BODY
// {
// 	"name":"Jasmine Tea 6",
// 	"description":"Very tasty jasmine tea"
// }
router.patch('/update/:id', async(req, res) => {
    try {
       //first param = id 
       //second param = changes I would like to make
       //last param = options
       const updatedTea = await Tea.findByIdAndUpdate(req.params.id, {
        name:req.body.name,
        description:req.body.description
       },{new:true});
       //I didn't find a tea with this ID
       if(!updatedTea){
          return res.status(404).json("Tea not found");
       }

       return res.status(200).json({message:'Tea updated', updatedTea});

    } catch (error) {
        return res.status(500).json({message:'Error happened'});
    }
});

//DELETE request (DELETE a resource)
//http://localhost:3000/api/teas/delete/632c28e67b61a7af2621ef3d
router.delete('/delete/:id', async (req, res) => {
    try {
        const tea = await Tea.findByIdAndDelete(req.params.id);
        
        //if tea does not exist
        if(!tea){
            return res.status(404).json("Tea not found");
        }
        //send back the tea has been deleted
       return res.status(200).json({message:'Tea Deleted', tea});

    } catch (error) {
        return res.status(500).json({message:'Error happened'}); 
    }
});


//DELETE request (DELETE a resource)
//http://localhost:3000/api/teas/delete/category/BLACKTEA
router.delete('/delete/category/:category', async (req, res) => {
    try {
        //removes all the teas containing the provided category.
        const resDeleteTea = await Tea.deleteMany({category:req.params.category});
        
        console.log("resDeleteTea", resDeleteTea)
   
        //send back the tea has been deleted
       return res.status(200).json({message:`Message:${resDeleteTea.deletedCount} teas were deleted.`});

    } catch (error) {
        return res.status(500).json({message:'Error happened'}); 
    }
});




export default router;