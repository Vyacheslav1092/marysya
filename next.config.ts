import type { NextConfig } from "next";


const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  /* config options here */
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						// Здесь вы можете добавить опции для настройки
					},
				},
			],
		});
		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cinemaguide.skillbox.cc',
				port: '',
				pathname: '/**',
			},
		],
	},
};
module.exports = withBundleAnalyzer(nextConfig)
