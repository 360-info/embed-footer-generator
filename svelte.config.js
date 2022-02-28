import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

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
			base: dev ? '' : '/embed-footer-generator',
		},
	}
};
