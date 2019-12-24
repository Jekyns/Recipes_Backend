var multer = require("multer");
const recipeCtrl = require("../controllers/recipes");
const AuthMiddl = require("../middlewares/Authentication");
var upload = multer({ storage: recipeCtrl.storage });
var uploadMiddleware = upload.fields([
  { name: "stepsimages", maxCount: 12 },
  { name: "images", maxCount: 12 }
]);
module.exports = router => {
  router.post(
    "/favorite/:id",
    AuthMiddl.AuthRecipe,
    recipeCtrl.recipeAddFavorites
  ); //add to favorite recipe
  router.post("/", uploadMiddleware, AuthMiddl.AuthAuthor, recipeCtrl.recipeCreate); //create
  router.get("/ingredients", recipeCtrl.recipeIngredients); //show all ingredients
  router.get("/filter", recipeCtrl.recipeFilter); //show all recipes with filter
  router.get("/:id", recipeCtrl.recipeShow); //show recipe
  router.delete("/:id", AuthMiddl.GetAuth, recipeCtrl.recipeDel); //delete
  router.put("/:id", uploadMiddleware, recipeCtrl.recipeUpdate); //recipe update
};
