# Form Handling in Nextjs

## Objectives
Which method is considered to satisfy all necessary conditions during form handling?

## Form handling lifecycle
1. Payload : Getting user data from input
2. Validation : Validating inputs
3. Error Handling : Handling any errors 1. Incorrect inputs 2. Any server errors 3. 403,401, 409 errors
4. States : Pending, Sucess, failure
5. Feedback : After submission by user feedback can be in the form of 1. validation error message, 2. toast 3. redirect 4. refresh existing page

## How to test???

## TODO
1. Simple yet effective design 
2. Client side form implementation
3. Server side form implementation

## Requirements : Client-side form handling
1. React-hook-form
2. Zod -> validations


## Form Submission
- User signup flow
1. Input email and password
2. Validate input and password with zod -> Show errors in red text below input fields
3. Check if an user with same email exists in database -> Show toast("User already signed up")
4. Add user to database and then redirect them to /dashboard after showing toast ("Signup success")