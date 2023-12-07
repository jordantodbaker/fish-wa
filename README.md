This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Tech used

- Nextjs
- React
- Typescript
- Apollo
- Docker with Mysql
  - Originally started with a docker imagine that contained a mysql server. This proved difficult to deploy with nextjs in a cloud environment.
- DBVisualizer
- Auth0
- Vercel
- PlanetScalecd f
- Twilio
- node-parser

## Expored deployments using:

- AWS
  - EC2
    - Started on EC2, learned how to create an instance, SSH in, install node, npm, nginx, etc. Couldn't figure out how to expose my application on AWS using nginx or pm2 following various tutorials. Looked at other solutions and saw:
  - Amplify
    - More out of the box, "just works" with nextjs programs. Couldn't find an easy way to deploy my docker container with my mysql database in it.
- Buddy CICD
  - On push will run tests
- Vercel
  - Doesn't support containerized mysql docker - Will have to replace backend
- Planetscale
  - Out of the box support for vercel integration
  - Had to use their mysql driver, backend refactor
  - Supports branching for database changes

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
