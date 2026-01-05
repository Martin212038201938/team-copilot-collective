#!/usr/bin/env node

/**
 * Test Script - Verify .env.local loading
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

console.log('\n🧪 Testing .env.local Configuration\n');
console.log('='.repeat(50));

// Test 1: Check if API key is loaded
const apiKey = process.env.OPENAI_API_KEY;
console.log('\n1️⃣  API Key Loading:');
if (apiKey) {
    console.log('   ✅ API Key loaded successfully');
    console.log(`   📏 Length: ${apiKey.length} characters`);
    console.log(`   🔑 Preview: ${apiKey.substring(0, 20)}...${apiKey.substring(apiKey.length - 10)}`);
} else {
    console.log('   ❌ API Key NOT found');
    console.log('   ⚠️  Check if .env.local exists and contains OPENAI_API_KEY');
}

// Test 2: Check API key format
console.log('\n2️⃣  API Key Format:');
if (apiKey) {
    const isValidFormat = apiKey.startsWith('sk-proj-') || apiKey.startsWith('sk-');
    if (isValidFormat) {
        console.log('   ✅ Valid OpenAI API key format');
    } else {
        console.log('   ⚠️  Unexpected format (should start with sk- or sk-proj-)');
    }
} else {
    console.log('   ⏭️  Skipped (no API key)');
}

// Test 3: Check other environment variables
console.log('\n3️⃣  Optional Configuration:');
const model = process.env.OPENAI_MODEL || 'gpt-4o (default)';
const maxTokens = process.env.OPENAI_MAX_TOKENS || '24000 (default)';
const temperature = process.env.OPENAI_TEMPERATURE || '0.6 (default)';

console.log(`   🤖 Model: ${model}`);
console.log(`   📊 Max Tokens: ${maxTokens}`);
console.log(`   🌡️  Temperature: ${temperature}`);

// Test 4: Verify file exists
console.log('\n4️⃣  File System Check:');
import fs from 'fs';
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    console.log('   ✅ .env.local file exists');
    console.log(`   📁 Path: ${envPath}`);
} else {
    console.log('   ❌ .env.local file NOT found');
    console.log(`   📁 Expected path: ${envPath}`);
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('🎯 TEST SUMMARY:\n');

let allPassed = true;

if (!apiKey) {
    console.log('❌ FAILED: API Key not loaded');
    allPassed = false;
} else if (!apiKey.startsWith('sk-')) {
    console.log('⚠️  WARNING: API Key format unexpected');
    allPassed = false;
} else {
    console.log('✅ ALL TESTS PASSED!');
}

if (allPassed) {
    console.log('\n🚀 Ready to generate content!');
    console.log('   Run: npm run generate:interactive');
} else {
    console.log('\n⚠️  Please fix the issues above before generating content');
}

console.log('\n' + '='.repeat(50) + '\n');
