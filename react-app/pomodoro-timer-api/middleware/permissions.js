const Task = require("../models/task")
const Session = require("../models/session")
const { BadRequestError, ForbiddenError } = require("../utils/errors")

/**
 * Checks to make sure that the authenticated user is the owner of the task.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the listing to res.locals
 *
 */
const authedUserIsSessionOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { taskId } = req.params
    const session = await Session.getUserSessions();

    if (listing.username !== user.username) {
      throw new ForbiddenError("User is not allowed to fetch other user's session.")
    }

    res.locals.task = task

    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Checks to make sure that the authenticated user is not the owner of the listing.
 * If they are, throws a BadRequest Error.
 * Otherwise, attaches the listing to res.locals
 *
 */
const authedUserIsNotListingOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { listingId } = req.params
    const listing = await Listing.fetchListingById(listingId)

    if (listing.username === user.username) {
      throw new BadRequestError("User is not allowed to book their own listing.")
    }

    res.locals.listing = listing

    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Checks to make sure that the authenticated user is the host of the listing or
 * is the user that booked the listing.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the transaction to res.locals
 *
 */
const authedUserIsHostOrBookingUser = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { bookingId } = req.params
    const booking = await Booking.fetchBookingById(bookingId)

    if (![booking.username, booking.hostUsername].includes(user.username)) {
      throw new ForbiddenError("User is not allowed to access bookings for that listing.")
    }

    res.locals.booking = booking

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  authedUserIsListingOwner,
  authedUserIsNotListingOwner,
  authedUserIsHostOrBookingUser,
}