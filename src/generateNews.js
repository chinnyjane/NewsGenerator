// src/generateNews.js

import axios from "axios";

const generateNews = async (formData, setNewsOutput) => {
  const apiKey = "YOUR_OPENAI_API_KEY";

  const prompt = `
    Gumawa ng isang pormal na artikulo para sa "Church News" ng Iglesia Ni Cristo gamit ang sumusunod na detalye.  
    Isulat ito sa wikang Filipino.

    Pangalan ng Gawain: ${formData.eventName}
    Petsa: ${formData.date}
    Lugar: ${formData.venue}
    Resource Person: ${formData.resourcePerson}
    Karagdagang Detalye: ${formData.note}

    Ilagay ang Extro Script
    "Mula po dito sa " ${formData.venue}
    "Ako po si Kapatid na " ${formData.reporterName}
    "Para sa Iglesia ni Cristo News Network"

    Isara ang artikulo sa pamamagitan ng pagbibigay ng kredito sa:
    - Tagapag-ulat: ${formData.reporterName}
    - Cameraman: ${formData.cameramanName}
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("GPT Response:", response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "Error calling OpenAI API:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default generateNews;
