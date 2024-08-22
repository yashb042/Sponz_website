// write api to get all cbc events


// get all products
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const CbcEvent = require("../model/cbc_events");
const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();

router.post(
    "/get-cbc-events",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const selectedStates = req.body.payload.selectedStates;
            const selectedMonthYear = req.body.payload.selectedMonthYear;
            for (let i = 0; i < selectedMonthYear.length; i++) {
                selectedMonthYear[i] = selectedMonthYear[i].split(" ")[0];
            }
            // const selectedObjectives = req.body.selectedObjectives;
            const limit = req.body.payload.conductedNo;
            const filter = {};

            if (selectedStates && selectedStates.length > 0) {
                filter.states = {$in: selectedStates};
            }

            if (selectedMonthYear && selectedMonthYear.length > 0) {
                filter.month = {$in: selectedMonthYear};
            }

            const cbcEvents = await CbcEvent.find(filter).sort({}).limit(limit);
            res.status(201).json({
                success: true,
                cbcEvents,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

module.exports = router;
