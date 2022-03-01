import adapter from '@sveltejs/adapter-static';

const prod = process.env.NODE_ENV === "production";

export default {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'docs',
			assets: 'docs',
			fallback: null,
			precompress: false
		}),
		paths: {
			base: prod ? "/embed-footer-generator" : "",
		},
	}
};
