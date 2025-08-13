/**
 * qwen.js
 * AI provider implementation for Qwen models using Alibaba Cloud DashScope API
 * via OpenAI-compatible interface through Vercel AI SDK.
 */

import { createOpenAI } from '@ai-sdk/openai';
import { BaseAIProvider } from './base-provider.js';

export class QwenAIProvider extends BaseAIProvider {
	constructor() {
		super();
		this.name = 'Qwen';
	}

	/**
	 * Returns the environment variable name required for this provider's API key.
	 * @returns {string} The environment variable name for the Qwen API key
	 */
	getRequiredApiKeyName() {
		return 'QWEN_API_KEY';
	}

	/**
	 * Creates and returns a Qwen client instance using DashScope's OpenAI-compatible API.
	 * @param {object} params - Parameters for client initialization
	 * @param {string} params.apiKey - Qwen API key from Alibaba Cloud DashScope
	 * @param {string} [params.baseURL] - Optional custom API endpoint (defaults to DashScope)
	 * @returns {Function} OpenAI-compatible client function for DashScope
	 * @throws {Error} If API key is missing or initialization fails
	 */
	getClient(params) {
		try {
			const { apiKey, baseURL } = params;

			if (!apiKey) {
				throw new Error('Qwen API key is required.');
			}

			// Use DashScope's OpenAI-compatible endpoint as default
			const defaultBaseURL = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1';
			
			return createOpenAI({
				apiKey,
				baseURL: baseURL || defaultBaseURL
			});
		} catch (error) {
			this.handleError('client initialization', error);
		}
	}
}
