import { createEventHandler, createRequestHandler, handleAsset } from '@remix-run/cloudflare-workers';
import * as build from '@remix-run/dev/server-build';

const loadContext = { env: null };
const handleRemixRequest = createRequestHandler({
	build,
	mode: process.env.NODE_ENV,
	getLoadContext: () => loadContext,
});

export default {
	async fetch(request, env, context) {
		loadContext.env = env; // env vars only available in handler, whereas remix expects the loadContext earlier

		const event = {
			request,
			waitUntil(promise) {
				return ctx.waitUntil(promise);
			},
		};

		let response = await handleAsset(event, build, {
			ASSET_NAMESPACE: env.__STATIC_CONTENT,
			ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
		});

		if (!response) {
			response = await handleRemixRequest(event);
		}

		return response;
	},
};
