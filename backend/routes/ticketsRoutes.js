const express = require("express");
const router = express.Router();
const {getTickets, createTicket, getSingleTicket, deleteTicket, UpdateTicket} = require('../controllers/ticketController')

const { protect } = require("../middleware/authM");
const noteRouter = require('./noteRoutes')
//Re-Route into noteRouter
router.use('/:ticketId/notes', noteRouter)

router.route("/")
.get(protect, getTickets)
.post(protect, createTicket);

router.route('/:id')
.get(protect, getSingleTicket)
.delete(protect, deleteTicket) 
.put(protect, UpdateTicket)
module.exports = router;
