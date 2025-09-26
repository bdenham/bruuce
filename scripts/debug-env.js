#!/usr/bin/env node

console.log('🔍 Environment Debug Information');
console.log('================================');

console.log('\n📊 Environment Variables:');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
console.log(`GITHUB_PAGES: ${process.env.GITHUB_PAGES || 'undefined'}`);
console.log(`VERCEL: ${process.env.VERCEL || 'undefined'}`);
console.log(`NETLIFY: ${process.env.NETLIFY || 'undefined'}`);

console.log('\n⚙️  Astro Config Simulation:');
const site = process.env.GITHUB_PAGES ? 'https://bdenham.github.io' : 'https://bruuce.com';
const base = undefined; // Your current config
console.log(`Site: ${site}`);
console.log(`Base: ${base || 'undefined'}`);

console.log('\n🔗 Expected Asset Paths:');
const assetPath = `${base || ''}/_astro/style.CLrIkJR8.css`;
console.log(`CSS: ${assetPath}`);
console.log(`Full URL: ${site}${assetPath}`);

console.log('\n✅ This configuration should work for bruuce.com');
