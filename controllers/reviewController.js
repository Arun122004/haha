import Tour from "../models/Tour.js"
import Review from "../models/Review.js"



export const createReview = async(req, res) => {

    const tourId = req.params.tourId
    const newReviews = new Review({...req.body})

    try {

        const savedReview = await newReviews.save()

        // after creating a new review now update the reviews array of the tour
        await Tour.findByIdAndUpdate(tourId,{
            $push: {reviews: savedReview._id}
        })

        res.status(200).json({success: true, message: "Reviews submitted",
        data: savedReview});
        
    } catch (err) {
        res.status(500).json({success: false, message: "failed to submit"});
    }
};