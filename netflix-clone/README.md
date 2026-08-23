# Netflix-Style Login Clone

A full-stack login flow (React + Node/Express) that visually replicates Netflix's
sign-in screen: dark hero background, floating-label inputs, red CTA button, and
inline field validation. Branded as "StreamFlix" to keep the project free of
Netflix's actual trademarked logo/name while matching its layout and styling.

## Structure

```
netflix-clone/
├── backend/          Express API with mock credential checking
│   ├── server.js
│   └── package.json
└── frontend/         React app (Vite)
    ├── src/
    │   ├── pages/Login.jsx
    │   ├── pages/Dashboard.jsx
    │   ├── styles/
    │   ├── api.js
    │   └── App.jsx
    └── package.json
```

## Run it

**1. Backend** (http://localhost:5000)
```bash
cd backend
npm install
npm start
```

**2. Frontend** (http://localhost:5173)
```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000`
(see `frontend/vite.config.js`), so no CORS setup is needed while developing.

## Demo credentials

| Email               | Password    |
|---------------------|-------------|
| user@netflix.com    | password123 |
| test@example.com    | test1234    |

## How it works

- **Frontend validation**: empty email/password, and malformed email, are
  caught in `Login.jsx` before any network call is made, with inline error
  text under each field (styled like Netflix's orange error state).
- **API call**: on submit, valid input is POSTed to `/api/login` via Axios
  (`src/api.js`).
- **Backend validation**: `server.js` re-validates on the server (never trust
  the client), checks credentials against an in-memory mock user list, and
  returns a JSON `{ success, message, token?, user? }` payload.
- **Error handling**: any `success: false` response is rendered as a banner
  above the form (e.g. wrong password, server unreachable).
- **Success redirect**: on `success: true`, a fake token is stored in
  `sessionStorage` and the user is redirected to `/dashboard`, a protected
  route that redirects back to `/` if no token is present.

## Notes / next steps for a real app

- Passwords are compared in plain text against an in-memory array — fine for
  a demo, but a real backend would hash passwords (bcrypt) and use a real
  database.
- The "auth token" is a base64 string with no real security — swap in JWTs
  or session cookies for anything production-bound.
- Tailwind wasn't wired in; the UI uses plain CSS (`src/styles/*.css`) that
  mirrors Netflix's color tokens (`#e50914` red, `#141414`/`#000` backgrounds).
  Swapping to Tailwind utility classes is a drop-in replacement if preferred.
