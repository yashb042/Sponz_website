const express = require("express");
const {isSeller, isAuthenticated, isAdmin} = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const KnowAFest = require("../model/knowafestevent");
const Order = require("../model/order");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
    "/create-product",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const shopId = req.body.shopId;
            const shop = await Shop.findById(shopId);
            if (!shop) {
                return next(new ErrorHandler("Shop Id is invalid!", 400));
            } else {
                let images = [];

                if (typeof req.body.images === "string") {
                    images.push(req.body.images);
                } else {
                    images = req.body.images;
                }

                const imagesLinks = [];

                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(images[i], {
                        folder: "products",
                    });

                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                }

                const productData = req.body;
                productData.images = imagesLinks;
                productData.shop = shop;

                const product = await Product.create(productData);

                res.status(201).json({
                    success: true,
                    product,
                });
            }
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// get all products of a shop
router.get(
    "/get-all-products-shop/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find({shopId: req.params.id});

            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// delete product of a shop
router.delete(
    "/delete-shop-product/:id",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product is not found with this id", 404));
            }

            for (let i = 0; 1 < product.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(
                    product.images[i].public_id
                );
            }

            await product.remove();

            res.status(201).json({
                success: true,
                message: "Product Deleted successfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

//products with filters
router.get(
    "/get-all-products-filters/:organizer",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const knowafestevents = await KnowAFest.find({
                "Related Links:": {
                    $nin: [
                        "/explore/category/Workshops",
                        "/explore/category/Symposiums",
                        "/explore/category/Seminars",
                        "/explore/category/Conferences",
                        "/explore/category/Management"
                    ]
                },
                "Related Links:": {
                    $elemMatch: {
                        $regex: `${req.params.organizer}`, $options: 'i'
                    }

                },
                "Event_Image": {
                    $regex: /uploads/i
                },
                "Organizer": {
                    $nin: ["Top Engineers"]
                },
                ...(req.query.organizer && {"Organizer": req.query.organizer})
            }).sort({}).limit(40);
            appendLinks(knowafestevents)
            changeDates(knowafestevents)
            res.status(201).json({
                success: true,
                knowafestevents,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// get all products
router.get(
    "/get-all-products",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const knowafestevents = await KnowAFest.find({
                "Related Links:": {
                    $nin: [
                        "/explore/category/Workshops",
                        "/explore/category/Symposiums",
                        "/explore/category/Seminars",
                        "/explore/category/Conferences",
                        "/explore/category/Management"
                    ]
                },
                "Event_Image": {
                    $regex: /uploads/i
                },
                "Organizer": {
                    $nin: ["Top Engineers"]
                }
            }).sort({}).limit(40);
            appendLinks(knowafestevents)
            changeDates(knowafestevents)
            res.status(201).json({
                success: true,
                knowafestevents,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

function changeDates(knowafestevents) {
    const numberRegex = /(?<!\.)\d+$/;


    knowafestevents.forEach((event) => {
        event['Start Date'] = event['Start Date'].split(' ')[0] + ' ' + event['Start Date'].split(' ')[1] + ' 2024';
        event['End Date'] = event['End Date'].split(' ')[0] + ' ' + event['End Date'].split(' ')[1] + ' 2024';
        event['Event_Name'] = event['Event_Name'].replace(numberRegex, "24");
    });
    return knowafestevents;

}

function appendLinks(knowafestevents) {
    knowafestevents.forEach((event) => {
        if (event.Event_Image.includes('uploads') > 0) {
            event.Event_Image = 'https://www.knowafest.com' + event.Event_Image;
        }
    });
    return knowafestevents;
}

// review for a product
router.put(
    "/create-new-review",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const {user, rating, comment, productId, orderId} = req.body;

            const product = await Product.findById(productId);

            const review = {
                user,
                rating,
                comment,
                productId,
            };

            const isReviewed = product.reviews.find(
                (rev) => rev.user._id === req.user._id
            );

            if (isReviewed) {
                product.reviews.forEach((rev) => {
                    if (rev.user._id === req.user._id) {
                        (rev.rating = rating), (rev.comment = comment), (rev.user = user);
                    }
                });
            } else {
                product.reviews.push(review);
            }

            let avg = 0;

            product.reviews.forEach((rev) => {
                avg += rev.rating;
            });

            product.ratings = avg / product.reviews.length;

            await product.save({validateBeforeSave: false});

            await Order.findByIdAndUpdate(
                orderId,
                {$set: {"cart.$[elem].isReviewed": true}},
                {arrayFilters: [{"elem._id": productId}], new: true}
            );

            res.status(200).json({
                success: true,
                message: "Reviwed succesfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// all products --- for admin
router.get(
    "/admin-all-products",
    isAuthenticated,
    isAdmin("Admin"),
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find().sort({
                createdAt: -1,
            });
            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);
module.exports = router;
