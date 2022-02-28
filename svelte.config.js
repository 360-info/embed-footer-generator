import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'docs',
			assets: 'docs',
			fallback: null,
			precompress: false
		})
	}
};
