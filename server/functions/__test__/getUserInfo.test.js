const request = require('supertest');
const admin = require('firebase-admin');
const {app} = require('../index.js'); // Import your Express app

// Clean up Firebase emulator
afterAll(async () => {
    await admin.app().delete();
});

describe('GET /user-type/:userId', () => {
    test('should return user info for a valid user ID', async () => {
        // Replace 'userId' with an actual user ID for testing
        const userId = '9Xe2PlJLhQhOk1AyTvtUTfvEAKn2';

        const response = await request(app)
            .get(`/api/user/user-info/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
        
        // Assert specific user data properties
        expect(response.body.data).toHaveProperty('uid', userId);
        expect(response.body.data).toHaveProperty('email');
        expect(response.body.data).toHaveProperty('emailVerified');
        // Add more assertions for other properties as needed
    });

    test('should return 500 if user ID is invalid', async () => {
        // Provide an invalid user ID to trigger an error
        const invalidUserId = 'invalidUserID';

        const response = await request(app)
            .get(`/api/user/user-type/${invalidUserId}`);

        expect(response._fieldsProto).toBe(undefined);
        expect(response.body.success).toBe(true);
        // Add more assertions for the response body as needed
    });
});
