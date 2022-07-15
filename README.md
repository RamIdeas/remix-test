# Remix + Cloudflare Workers (module format)

This is a reproduction of a issue with using Remix and Cloudflare Workers in the module format (rather than the addEventListener format).

I've had to fight the framework to use modules by:

1.  not using `createEventHandler`, and reimplementing it using it's constituent parts: `createRequestHandler` and `handleAsset`
1.  passing in `ASSET_NAMESPACE` and `ASSET_MANIFEST` manually since env vars are no longer globals in the module format of Cloudflare Workers

## Reproduce

Run `npm run dev` and you'll notice http://localhost:8787 loads locally

Run `npm run deploy` and you'll notice the deployed worker on workers.dev will return the Cloudflare Worker exception "Error 1101" page
