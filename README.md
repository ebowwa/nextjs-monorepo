# Next.js Monorepo

This monorepo consolidates 15 Next.js projects into a single repository for easier management.

## Structure

```
nextjs-monorepo/
├── apps/
│   ├── acceleration-blog/      # Next.js blog
│   ├── alchemist/             # Next.js app
│   ├── app-router-pmndrs/     # Next.js app router example
│   ├── dockerized-nextjs/     # Dockerized Next.js example
│   ├── edesia-next/           # Next.js app
│   ├── giannacollectables/    # Next.js e-commerce
│   ├── goldson/               # Next.js app
│   ├── https-x-workers-bots/  # Next.js with workers
│   ├── next-client-yolo/      # Next.js client
│   ├── resmp.dev/             # Next.js portfolio
│   ├── solana-site/           # Solana Next.js example
│   ├── threejs-nextjs/        # Three.js integration (nueralink)
│   ├── r3f-example/           # React Three Fiber example
│   ├── synth-next/            # Next.js with FastAPI
│   └── blog-starter/          # Blog starter template
├── packages/               # Shared packages
└── config/                # Shared configuration
```


## Getting Started

```bash
# Install dependencies
npm install

# Run all apps in development
npm run dev

# Build all apps
npm run build

# Run linting
npm run lint
```

## Individual App Development

To work on a specific app:

```bash
cd apps/[app-name]
npm run dev
```

## Notes

- All apps maintain their original git history
- Shared dependencies can be added to the root package.json
- Each app can still be deployed independently