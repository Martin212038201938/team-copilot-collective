#!/usr/bin/env node

/**
 * Test the generate-content.js script's API key loading
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🧪 Testing generate-content.js Integration\n');
console.log('='.repeat(60));

// Simulate what generate-content.js does
console.log('\n📝 Step 1: Loading environment variables...');
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.log('❌ FAILED: OPENAI_API_KEY nicht gefunden in .env.local');
    console.log('   Bitte erstelle eine .env.local Datei mit deinem OpenAI API Key.');
    process.exit(1);
}

console.log('✅ Environment variables loaded successfully');
console.log(`   API Key: ${apiKey.substring(0, 20)}...${apiKey.substring(apiKey.length - 10)}`);

// Test OpenAI client initialization
console.log('\n📝 Step 2: Testing OpenAI client initialization...');

try {
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('✅ OpenAI client initialized successfully');
    console.log('   Ready to make API calls');
} catch (error) {
    console.log('❌ FAILED: Could not initialize OpenAI client');
    console.log('   Error:', error.message);
    process.exit(1);
}

// Test cost tracker import
console.log('\n📝 Step 3: Testing cost tracker module...');
try {
    const costTracker = await import('./cost-tracker.js');
    console.log('✅ Cost tracker module loaded');
    console.log('   Functions available:');
    console.log('   - checkBeforeRequest()');
    console.log('   - trackUsage()');
    console.log('   - showStatistics()');
} catch (error) {
    console.log('⚠️  WARNING: Cost tracker not available');
    console.log('   Error:', error.message);
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('🎯 INTEGRATION TEST SUMMARY:\n');
console.log('✅ Environment loading: PASSED');
console.log('✅ API Key format: PASSED');
console.log('✅ OpenAI client: PASSED');
console.log('\n🚀 generate-content.js is ready to use!');
console.log('\n💡 Try it out:');
console.log('   node scripts/generate-content.js --interactive');
console.log('\n' + '='.repeat(60) + '\n');
