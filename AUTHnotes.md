## OAuth flow: Implicit for Client-side apps

1. App sends user to Auth0 sign-in
2. Auth0 redirecte back to my app callback with tokens
3. App grabs tokens from URL

### Login will use Auth- Universal widget

most secure
already developed
single, centralized login

### Create Auth0 application

1. Create it and give a name
2. Pick Single-Page app option
3. In application page, enter a route under 'Allowed Callback URLs' (e.g. http://localhost:3000/auth-callback)

### Packages

pnpm i auth0-js auth0-lock
