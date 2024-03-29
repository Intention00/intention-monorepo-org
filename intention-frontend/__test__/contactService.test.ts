// Example generated with help of openai to understand jest testing better
// Might be useful to leverage openai to generate our future automatic tests

import * as Contacts from 'expo-contacts';
import { saveContactsFromUser } from '../Components/ContactsTab/DisplayContacts/contactService';

// Mocking expo-contacts methods with explicit types
const mockRequestPermissionsAsync = jest.spyOn(Contacts, 'requestPermissionsAsync') as jest.MockedFunction<typeof Contacts.requestPermissionsAsync>;
const mockGetContactsAsync = jest.spyOn(Contacts, 'getContactsAsync') as jest.MockedFunction<typeof Contacts.getContactsAsync>;

describe('saveContactsFromUser Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Permission Denied Test', async () => {
    // Mocking requestPermissionsAsync to return denied status
    mockRequestPermissionsAsync.mockResolvedValueOnce({ status: 'denied' } as PermissionResponse);

    await expect(saveContactsFromUser()).rejects.toThrow('Contact permission denied!');
  });

  test('Permission Granted, No Contacts Test', async () => {
    // Mocking requestPermissionsAsync to return granted status
    mockRequestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' } as PermissionResponse);

    // Mocking getContactsAsync to return an empty array
    mockGetContactsAsync.mockResolvedValueOnce({ data: [] });

    const result = await saveContactsFromUser();

    expect(result).toEqual([]);
  });

  test('Permission Granted, Contacts Found Test', async () => {
    // Mocking requestPermissionsAsync to return granted status
    mockRequestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' } as PermissionResponse);

    // Mocking getContactsAsync to return an array with some contacts
    const mockContacts = [
      {
        id: '1',
        name: 'John Doe',
        phoneNumbers: [
          { number: '1234567890', label: Contacts.Fields.PhoneNumbers.Mobile },
        ],
      },
    ];
    mockGetContactsAsync.mockResolvedValueOnce({ data: mockContacts });

    const result = await saveContactsFromUser();

    expect(result).toEqual(mockContacts);
  });

  test('Error during Contacts Retrieval Test', async () => {
    // Mocking requestPermissionsAsync to return granted status
    mockRequestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' } as PermissionResponse);

    // Mocking getContactsAsync to throw an error
    mockGetContactsAsync.mockRejectedValueOnce(new Error('Mocked error during contact retrieval'));

    await expect(saveContactsFromUser()).rejects.toThrow('Error requesting contact information');
  });
});
