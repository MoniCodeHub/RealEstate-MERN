/** @format */

import express from "express";
import { createListing, deleteListing, updateListing, getForEditListing, getListings} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/getForEdit/:id", verifyToken, getForEditListing);
router.get('/get', getListings);

export default router;
