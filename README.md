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

- [ ] Simple yet effective design

- [ x ] Client side form implementation (signup form)
- [ x ] Server side form implementation (login form)
- [ x ] My own authentication system (But you can't Logout! xdd)
- [ ] Logout button
- [ ] Feedback form
- [ ] Writing the blog

## Requirements : Client-side form handling

1. React-hook-form
2. Zod -> validations

## Form Submission

- User signup flow

1. Input email and password
2. Validate input and password with zod -> Show errors in red text below input fields
3. Check if an user with same email exists in database -> Show toast("User already signed up")
4. Add user to database and then redirect them to /dashboard after showing toast ("Signup success")

## Client Side : Possible Approaches

1. React-hook-form + Zod + fetch request to API route handler
2. React-hook-form + Zod + server action
3. HTML form elements + server action + zod

## APPROACH 01

1. Client side form handling -> React-hook_form + zod (using resolver) + API call + no validations in DAL
