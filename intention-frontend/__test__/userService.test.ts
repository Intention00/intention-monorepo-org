import { handleUser } from "../app/(auth)/Components/UserSync/userService";
import { receiveUserIDBackend } from "../app/(auth)/Components/ContactSync/backendService";
import renderer from "react-test-renderer";

// tells jest to mock the backend service module, specificually the recieveUserID func. 
jest.mock('../app/(auth)/Components/ContactSync/backendService.ts', () => ({
  receiveUserIDBackend: jest.fn(),
}));

//typescript way to show func is now mocked as jest would 
const mockedReceiveUserIDBackend = receiveUserIDBackend as jest.Mock;

//descibe is how you start a test suite for a function 
describe('handleUser', () => {
    // sets the user ID to negative 1 in function then runs it, checking 
    // to see if it would handle itself correctly
  it('handles new users correctly', async () => {
    mockedReceiveUserIDBackend.mockResolvedValue({ UserID: -1 });

    const result = await handleUser('newuser@example.com');
    expect(result).toBe(1);
  });

     // sets the user ID to negative 123 in function then runs it, checking 
    // to see if it would handle itself correctly given that the dummy email
    // is linked to the userID 123
  it('handles existing users correctly', async () => {
    mockedReceiveUserIDBackend.mockResolvedValue({ UserID: 123 });

    const result = await handleUser('existinguser@example.com');
    expect(result).toBe(123);
  });
});
