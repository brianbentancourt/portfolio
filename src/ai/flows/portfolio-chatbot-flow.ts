'use server';
/**
 * @fileOverview A portfolio chatbot AI agent for Brian Bentancourt.
 *
 * - portfolioChatbot - A function that handles chat interactions.
 * - PortfolioChatbotInput - The input type for the portfolioChatbot function.
 * - PortfolioChatbotOutput - The return type for the portfolioChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generateCvContent } from './generate-cv-content-flow'; // Import the new flow

const PortfolioChatbotInputSchema = z.object({
  userQuery: z.string().describe('The user question or message.'),
  portfolioContext: z.string().describe('Contextual information about Brian Bentancourt, his skills, projects, and experience.'),
});
export type PortfolioChatbotInput = z.infer<typeof PortfolioChatbotInputSchema>;

const PortfolioChatbotOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user query.'),
});
export type PortfolioChatbotOutput = z.infer<typeof PortfolioChatbotOutputSchema>;

export async function portfolioChatbot(input: PortfolioChatbotInput): Promise<PortfolioChatbotOutput> {
  const lowerCaseQuery = input.userQuery.toLowerCase();
  // Basic intent detection for CV request
  if (lowerCaseQuery.includes('cv') || lowerCaseQuery.includes('resume') || lowerCaseQuery.includes('curriculum')) {
    try {
      const cvResult = await generateCvContent({ portfolioContext: input.portfolioContext });
      return {
        response: `Here is the content for Brian Bentancourt's CV, formatted in Markdown:\n\n${cvResult.cvText}\n\nYou can copy and paste this text into a document editor (like Word or Google Docs) to finalize the formatting and save it as a PDF.`
      };
    } catch (error) {
      console.error("Error generating CV content:", error);
      return { response: "I encountered an issue while trying to generate the CV content. Please try asking something else." };
    }
  }
  // If not a CV request, proceed with the standard chatbot prompt
  return portfolioChatbotFlow(input);
}

const portfolioChatbotPrompt = ai.definePrompt({
  name: 'portfolioChatbotPrompt',
  input: {schema: PortfolioChatbotInputSchema},
  output: {schema: PortfolioChatbotOutputSchema},
  prompt: `You are a helpful AI assistant for Brian Bentancourt, a software developer.
  Your goal is to answer questions from potential clients or collaborators based on the information provided about Brian.
  Be friendly, professional, and concise. If you don't know the answer based on the provided context, politely state that you don't have that specific information.
  Do not make up information. Only use the context provided.
  When providing links (e.g., to projects, social media, email addresses like brianbentancourt9@gmail.com, or phone numbers like +59897313415), please format them as Markdown links.
  For example:
  - For a website: [Project Title](https://example.com)
  - For an email: [Email Brian](mailto:brianbentancourt9@gmail.com)
  - For a phone number like +59897313415: Provide two links: one to call and one for WhatsApp.
    - Call: [Call Brian](tel:+59897313415)
    - WhatsApp: [WhatsApp Brian](https://wa.me/59897313415) (Note: the WhatsApp number should not include '+' or spaces)

  Context about Brian Bentancourt:
  {{{portfolioContext}}}

  User's question: {{{userQuery}}}

  Your response:`,
   config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  }
});

const portfolioChatbotFlow = ai.defineFlow(
  {
    name: 'portfolioChatbotFlow',
    inputSchema: PortfolioChatbotInputSchema,
    outputSchema: PortfolioChatbotOutputSchema,
  },
  async input => {
    const {output} = await portfolioChatbotPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the chatbot prompt.');
    }
    return output;
  }
);
