import {nodeResolve} from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)
import commonjs from '@rollup/plugin-commonjs';
//import { terser } from "rollup-plugin-terser"; // code minification (optional)
export default [
	{
	input: 'themes/ciata-theme/assets/scripts/main.js',
	output: [
		{
			format: 'iife',
			name: 'SIMPLEAPP',
			file: 'themes/ciata-theme/static/js/bundle.js'
		}
	],
	plugins: [ nodeResolve(),commonjs() ]
	}
];