'''
DELETE /api/users/:id

Purpose: 

Input parameters:
- id (int): The userid of the person whose data we want to delete from DB
- full (bool): Whether we want a full deletion of the user, or only all data except account

Output:
- type (string): "Full" or "Partial"
- msg (string): "User was successfully deleted"

Example usage:

DELETE /api/users/22?full=true

Output:
{
    "type": "Full",
    "msg": "User was successfully deleted"
}
'''