'use server';
/**
 * @fileOverview Generates CV content in Markdown format based on portfolio information.
 *
 * - generateCvContent - A function that generates CV text.
 * - GenerateCvContentInput - The input type for the CV generation.
 * - GenerateCvContentOutput - The output type for the CV generation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCvContentInputSchema = z.object({
  portfolioContext: z.string().describe('Comprehensive information about Brian Bentancourt, including his summary, skills, professional experience, education, and freelance projects.'),
});
export type GenerateCvContentInput = z.infer<typeof GenerateCvContentInputSchema>;

const GenerateCvContentOutputSchema = z.object({
  cvText: z.string().describe('The generated CV content in well-structured Markdown format.'),
});
export type GenerateCvContentOutput = z.infer<typeof GenerateCvContentOutputSchema>;

export async function generateCvContent(input: GenerateCvContentInput): Promise<GenerateCvContentOutput> {
  return generateCvContentFlow(input);
}

const cvPrompt = ai.definePrompt({
  name: 'generateCvContentPrompt',
  input: {schema: GenerateCvContentInputSchema},
  output: {schema: GenerateCvContentOutputSchema},
  prompt: `You are a professional CV writer. Based on the following comprehensive information about Brian Bentancourt, generate his CV content in well-structured Markdown format.

The CV should include the following sections, using the information provided in the portfolio context:
1.  **Full Name and Title** (e.g., Brian Bentancourt - Software Developer)
2.  **Contact Information** (e.g., Location | Phone | Website | Email)
3.  **Links** (e.g., LinkedIn, GitHub profiles)
4.  **Summary/About Me** (A concise professional summary)
5.  **Skills** (Categorize if possible, e.g., Programming Languages, Web Development, Databases, Cloud & DevOps, AI & Machine Learning, Business Intelligence, Other Tools)
6.  **Professional Experience** (For each role: Title, Company, Location, Dates. List key responsibilities and achievements as bullet points.)
7.  **Education** (For each entry: Degree/Title, Institution, Location, Completion Date/Period. List key learning points or relevant coursework if available.)
8.  **Freelance Projects** (For each project: Title, Live Link (if available), a brief description including key technologies or features.)

Ensure dates are formatted consistently. Use Markdown for headings (e.g., ## Skills), bullet points (e.g., * Item), and bolding for emphasis (e.g., **Tech Lead**).

Portfolio Context:
{{{portfolioContext}}}

Generated CV Text (Markdown):
`,
});

const generateCvContentFlow = ai.defineFlow(
  {
    name: 'generateCvContentFlow',
    inputSchema: GenerateCvContentInputSchema,
    outputSchema: GenerateCvContentOutputSchema,
  },
  async (input) => {
    const {output} = await cvPrompt(input);
    if (!output) {
      throw new Error('Failed to generate CV content.');
    }
    return output;
  }
);
