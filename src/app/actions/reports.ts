'use server';

import { generateInsightsFromData as generateInsightsFlow } from '@/ai/flows/generate-insights-from-data';

export async function generateReport(query: string, salesData: string, expensesData: string) {
    if (!query) {
        return { error: 'Query is required.' };
    }

    try {
        const result = await generateInsightsFlow({
            query,
            salesData,
            expensesData,
        });
        return { data: result };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to generate report.' };
    }
}
