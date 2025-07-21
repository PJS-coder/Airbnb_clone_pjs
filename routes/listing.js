const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const{isLoggedIn ,validateListing,isOwner} = require("../middleware.js");
const listingControler = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get (wrapAsync(listingControler.index))
.post(isLoggedIn,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingControler.newRoute)
);

// New route
router.get("/new",isLoggedIn, (req,res) => {
    res.render("listings/new.ejs");
});

router.route("/:id")
.get(wrapAsync(listingControler.showRoute))
.put(isLoggedIn,upload.single("listing[image][url]"),validateListing,isOwner, wrapAsync(listingControler.updateRoute))
.delete(isLoggedIn,isOwner, wrapAsync(listingControler.deleteRoute));


// Edit route
router.get("/:id/edit" ,isLoggedIn, isOwner, wrapAsync(listingControler.editRoute));

router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const listings = await Listing.find({ category });
        res.render("listings/filter.ejs", { listings, category });
    } catch (err) {
        res.status(500).send("Error loading category listings");
    }
});


module.exports = router;