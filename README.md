## How to Started Locally

> **First, clone this repo:**

```bash
git clone https://github.com/Jefries/legal-tech.git
```

and then install the dependencies:
```bash
npm install
# or
yarn install
```

<br>

> **Configure environment variables:**

Create a ``.env.local`` file in the root directory with the following variables:
```
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000
```

Here's how to generate your own ``NEXTAUTH_SECRET`` for local development:

*Open your terminal and run one of these commands to generate a secure random string:*
```
# Using openssl (built into macOS)
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

<br>


> **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the homepage.

Open [http://localhost:3000/admin](http://localhost:3000/admin) it will redirect to login admin page.

<br>

> **use this credentials, for sign-in into admin dashboard:**
```bash
username: admin
password: 123
```

<br>

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
