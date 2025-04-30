// src/generateNews.js

import axios from "axios";

const generateNews = async (formData, setNewsOutput) => {
  const apiKey =
    "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";

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
