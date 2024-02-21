import {
    sendContactsToBackend,
    receiveContactsFromBackend,
    sendNotesToBackend,
    sendFinalNotesToBackend,
    receiveUserIDBackend,
    recieveUserEmailBackend,
} from '../app/(auth)/Components/ContactSync/backendService';

// Mock the fetch function
//   jest.mock('node-fetch');

// Mock the response data
const mockResponseData = {
data: 'Mocked data',
};

// Mock the fetch implementation
(global as any).fetch = jest.fn().mockResolvedValue({
ok: true,
json: jest.fn().mockResolvedValue(mockResponseData),
});

describe('Backend Service Tests', () => {
    it('should send contacts to the backend', async () => {
        const userID = 123;
        const contactsData = [{ firstName: 'John', lastName: 'Doe', phoneNumbers: [{number: "1234567890"}]}];
        const contactsEndFormat = [{ firstName: 'John', lastName: 'Doe', number: "1234567890"}];
        await sendContactsToBackend(userID, contactsData);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/contacts'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userID, contacts: contactsEndFormat}),
        });
    });

    it('should receive contacts from the backend', async () => {
        const userID = 123;
        await receiveContactsFromBackend(userID);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/api/contacts?userID=${userID}`), {
        method: 'GET',
        });
    });

    it('should send notes to the backend', async () => {
        const uri = 'mocked-uri';
        const mockBlob = new Blob();
        global.fetch = jest.fn().mockResolvedValue({
            blob: jest.fn().mockResolvedValue(mockBlob),
            ok: true,
            json: jest.fn().mockResolvedValue({ data: 'Mocked data' }),
        });

        await expect(sendNotesToBackend(uri)).resolves.toBe('Mocked data');

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/api/transcribe'),
            expect.objectContaining({
            method: 'POST',
            headers: {
                'Content-Type': 'audio/mp4',
            },
            body: mockBlob,
        }));
    });

    it('should send final notes to the backend', async () => {
        const note = 'Mocked final note';
        const contactID = 'mocked-contact-id';
        await sendFinalNotesToBackend(note, contactID);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/note'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ note, contactID }),
        });
    });

    it('should receive user ID from the backend', async () => {
        const email = 'user@example.com';
        await receiveUserIDBackend(email);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/api/users?email=${email}`), {
        method: 'GET',
        });
    });

    it('should receive user email from the backend', async () => {
        const userID = 'mocked-user-id';
        await recieveUserEmailBackend(userID);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/api/users/emailcheck?user_id=${userID}`), {
        method: 'GET',
        });
    });
});
