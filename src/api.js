import { OpenAI } from 'openai';

// Initialize the OpenAI client
// We'll use environment variables for the API key
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // This is required for client-side usage
});

export const generateBrochureText = async (propertyData) => {
  try {
    // Create a prompt for OpenAI based on the property data
    const prompt = createPrompt(propertyData);
    
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo" if you prefer
      messages: [
        {
          role: "system",
          content: "You are a professional property brochure writer for Henderson Connellan estate agents. Create elegant, formal, and appealing property descriptions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating brochure text:", error);
    return "Error generating brochure. Please try again or contact support.";
  }
};

// Helper function to create the prompt
const createPrompt = (data) => {
  // Start with instructions
  let prompt = `
Create a professional property brochure for Henderson Connellan estate agents with the following sections:

1. A headline (2-6 words) that summarizes the property
2. An overall summary (200-300 words)
3. Bullet points for each room and feature

Follow these style rules:
- Use formal, descriptive, and positive language
- Always use "Principal Bedroom" not "Master Bedroom"
- Always capitalize room names (e.g., "Living Room" not "living room")
- Don't start room descriptions with descriptive words like "generous"
- Write numbers as words (e.g., "two cars" not "2 cars")
- Don't mention thermal efficiency of UPVC windows unless specifically noted

Here is the property information:
`;

  // Add each property section if it exists
  if (data.property_bullets) prompt += `\nProperty Overview: ${data.property_bullets}`;
  if (data.entrance) prompt += `\nEntrance: ${data.entrance}`;
  if (data.kitchen) prompt += `\nKitchen: ${data.kitchen}`;
  if (data.living_room) prompt += `\nLiving Room: ${data.living_room}`;
  if (data.heating) prompt += `\nHeating: ${data.heating}`;
  if (data.glazing) prompt += `\nGlazing: ${data.glazing}`;
  if (data.bedrooms) prompt += `\nBedrooms: ${data.bedrooms}`;
  if (data.bathrooms) prompt += `\nBathrooms: ${data.bathrooms}`;
  if (data.outside) prompt += `\nOutside: ${data.outside}`;
  if (data.other_key_features) prompt += `\nOther Key Features: ${data.other_key_features}`;
  if (data.study) prompt += `\nStudy: ${data.study}`;
  if (data.dining_room) prompt += `\nDining Room: ${data.dining_room}`;
  if (data.drawing_room) prompt += `\nDrawing Room: ${data.drawing_room}`;
  if (data.additional_reception) prompt += `\nAdditional Reception: ${data.additional_reception}`;
  if (data.shower_room) prompt += `\nShower Room: ${data.shower_room}`;
  if (data.guest_cloakroom) prompt += `\nGuest Cloakroom: ${data.guest_cloakroom}`;
  if (data.utility_room) prompt += `\nUtility Room: ${data.utility_room}`;

  return prompt;
};