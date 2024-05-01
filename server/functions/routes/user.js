const routes = require("express").Router();
const userControl = require("../controllers/user");

routes.get("/jwtVerification", userControl.jwtVerification);


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: The unique identifier of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         emailVerified:
 *           type: boolean
 *           description: Indicates whether the user's email has been verified.
 *         disabled:
 *           type: boolean
 *           description: Indicates whether the user account is disabled.
 *         metadata:
 *           type: object
 *           properties:
 *             lastSignInTime:
 *               type: string
 *               format: date-time
 *               description: The date and time of the user's last sign-in.
 *             creationTime:
 *               type: string
 *               format: date-time
 *               description: The date and time when the user account was created.
 *             lastRefreshTime:
 *               type: string
 *               format: date-time
 *               description: The date and time when the user account was last refreshed.
 *         passwordHash:
 *           type: string
 *           description: The hashed password of the user.
 *         passwordSalt:
 *           type: string
 *           description: The salt used for hashing the user's password.
 *         tokensValidAfterTime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user's tokens become valid.
 *         providerData:
 *           type: array
 *           description: Array of provider data associated with the user.
 *           items:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: The unique identifier provided by the authentication provider.
 *               email:
 *                 type: string
 *                 description: The email address associated with the provider.
 *               providerId:
 *                 type: string
 *                 description: The ID of the authentication provider (e.g., password, Google).
 */

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                   description: List of users.
 *                 dataCount:
 *                   type: integer
 *                   description: Number of users returned.
 */

routes.get("/all", userControl.getAllUsers);

/**
 * @swagger
 * /api/user/users/{userId}:
 *   post:
 *     summary: Create user type
 *     description: Creates a user type for the specified user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to create the user type for.
 *     responses:
 *       200:
 *         description: User type created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _writeTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds part of the timestamp when the user type was created.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds part of the timestamp when the user type was created.
 *               description: Response containing information about the created user type.
 */
routes.post("/users/:userId", userControl.createUserType);

/**
 * @swagger
 * /api/user/user-type/{userId}:
 *   get:
 *     summary: Get user type
 *     description: Retrieves the user type for the specified user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve the user type for.
 *     responses:
 *       200:
 *         description: User type retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _fieldsProto:
 *                       type: object
 *                       description: The fields of the user type.
 *                     _ref:
 *                       type: object
 *                       description: Reference to the user in Firestore.
 *                     _serializer:
 *                       type: object
 *                       description: Serializer information.
 *                     _readTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds part of the timestamp when the user type was read.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds part of the timestamp when the user type was read.
 *                       description: The timestamp when the user type was read.
 *                     _createTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds part of the timestamp when the user type was created.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds part of the timestamp when the user type was created.
 *                       description: The timestamp when the user type was created.
 *                     _updateTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds part of the timestamp when the user type was last updated.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds part of the timestamp when the user type was last updated.
 *                       description: The timestamp when the user type was last updated.
 *               description: Response containing information about the user type.
 */

routes.get("/user-type/:userId", userControl.getUserType);

/**
 * @swagger
 * /api/user/user-info/{userId}:
 *   get:
 *     summary: Get user information by user ID
 *     description: Retrieves the information for a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       description: The unique identifier of the user.
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                     emailVerified:
 *                       type: boolean
 *                       description: Indicates whether the user's email has been verified.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 error:
 *                   type: string
 *                   description: Error message indicating why the user was not found.
 */

routes.get("/user-info/:userId", userControl.getUserInfo);

/**
 * @swagger
 * /api/user/user-reservation/{userId}:
 *   post:
 *     summary: Create user reservation
 *     description: Creates a new reservation for the specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user for whom the reservation is being created.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the reservation.
 *               tableSize:
 *                 type: string
 *                 description: The size of the table for the reservation (e.g., "Small", "Medium", "Large").
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the reservation in the format YYYYMMDD (e.g., "20240220").
 *               startTimeHours:
 *                 type: string
 *                 description: The hour of the reservation start time (12-hour format).
 *               startTimeMinute:
 *                 type: string
 *                 description: The minute of the reservation start time.
 *               startTimePeriod:
 *                 type: string
 *                 description: The period of the day for the reservation start time (e.g., "AM", "PM").
 *               endTimeHours:
 *                 type: string
 *                 description: The hour of the reservation end time (12-hour format).
 *               endTimeMinute:
 *                 type: string
 *                 description: The minute of the reservation end time.
 *               endTimePeriod:
 *                 type: string
 *                 description: The period of the day for the reservation end time (e.g., "AM", "PM").
 *               description:
 *                 type: string
 *                 description: Additional description for the reservation.
 *               sts:
 *                 type: string
 *                 description: The status of the reservation (e.g., "Pending", "Confirmed", "Cancelled").
 *     responses:
 *       200:
 *         description: Reservation created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _writeTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds part of the timestamp when the reservation was written.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds part of the timestamp when the reservation was written.
 *                       description: The timestamp when the reservation was written.
 *               description: Response containing information about the created reservation.
 */

routes.post("/user-reservation/:userId", userControl.postUserReservation);

/**
 * @swagger
 * /api/user/user-reservation:
 *   get:
 *     summary: Get user reservations
 *     description: Retrieves a list of reservations made by users.
 *     responses:
 *       200:
 *         description: List of user reservations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: The date of the reservation.
 *                       endTimeHours:
 *                         type: string
 *                         description: The end time hours of the reservation.
 *                       description:
 *                         type: string
 *                         description: Description of the reservation.
 *                       startTimeHours:
 *                         type: string
 *                         description: The start time hours of the reservation.
 *                       startTimePeriod:
 *                         type: string
 *                         description: The start time period (AM/PM) of the reservation.
 *                       userId:
 *                         type: string
 *                         description: The ID of the user making the reservation.
 *                       endTimePeriod:
 *                         type: string
 *                         description: The end time period (AM/PM) of the reservation.
 *                       endTimeMinutes:
 *                         type: string
 *                         description: The end time minutes of the reservation.
 *                       startTimeMinute:
 *                         type: string
 *                         description: The start time minutes of the reservation.
 *                       reservationId:
 *                         type: string
 *                         description: The unique ID of the reservation.
 *                       tableSize:
 *                         type: string
 *                         description: The size of the table reserved.
 *                       name:
 *                         type: string
 *                         description: The name of the user making the reservation.
 *                       sts:
 *                         type: string
 *                         description: The status of the reservation (e.g., confirmed, waiting).
 *       404:
 *         description: No reservations found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 error:
 *                   type: string
 *                   description: Error message indicating that no reservations were found.
 */

routes.get("/user-reservation", userControl.getUserReservation);

routes.post(
  "/update-reservation-status/:reservationId",
  userControl.updateReservation
);


/**
 * @swagger
 * /api/user/user-profile/{userId}:
 *   post:
 *     summary: Update user profile information
 *     description: Updates the profile information for the specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose profile information is being updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number of the user.
 *               address:
 *                 type: string
 *                 description: The address of the user.
 *     responses:
 *       200:
 *         description: Profile information updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _writeTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds part of the timestamp when the profile information was written.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds part of the timestamp when the profile information was written.
 *                       description: The timestamp when the profile information was written.
 *               description: Response containing information about the updated profile.
 */

routes.post("/user-profile/:userId", userControl.postUserInformation);

/**
 * @swagger
 * /api/user/user-profile/{userId}:
 *   get:
 *     summary: Get user profile information
 *     description: Retrieves the profile information of a user based on the user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose profile information is to be retrieved.
 *     responses:
 *       200:
 *         description: User profile information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _ref:
 *                       type: object
 *                       properties:
 *                         _firestore:
 *                           type: object
 *                           properties:
 *                             projectId:
 *                               type: string
 *                               description: The project ID associated with Firestore.
 *                         _path:
 *                           type: object
 *                           properties:
 *                             segments:
 *                               type: array
 *                               items:
 *                                 type: string
 *                               description: The segments of the document path.
 *                         _converter: {}
 *                     _serializer:
 *                       type: object
 *                       properties:
 *                         allowUndefined:
 *                           type: boolean
 *                           description: Indicates if undefined fields are allowed.
 *                     _readTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds part of the read time.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds part of the read time.
 *       404:
 *         description: User profile not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the user profile was not found.
 */

routes.get("/user-profile/:userId", userControl.getUserProfileInformation);


/**
 * @swagger
 * /api/user/send-otp/{user_email}:
 *   post:
 *     summary: Send OTP to user's email
 *     description: Sends a one-time password (OTP) to the specified user's email address for verification purposes.
 *     parameters:
 *       - in: path
 *         name: user_email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email address of the user to whom the OTP will be sent.
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the OTP sending process.
 *                 genOtp:
 *                   type: integer
 *                   description: The generated OTP that was sent to the user's email address.
 *               description: Response indicating the status of the OTP sending process.
 */

routes.post("/send-otp/:user_email", userControl.sendOtp);

/**
 * @swagger
 * /api/user/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     description: Verify the provided OTP against the generated OTP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 description: The OTP provided by the user for verification.
 *               generatedOtp:
 *                 type: string
 *                 description: The OTP that was generated and sent to the user for verification.
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the OTP verification was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the OTP verification process.
 *               description: Response indicating the status of the OTP verification process.
 *       400:
 *         description: OTP verification failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the OTP verification failed.
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the OTP verification failure.
 *               description: Response indicating the status of the OTP verification process.
 */

routes.post("/verify-otp", userControl.verifyOtp);

module.exports = routes;
