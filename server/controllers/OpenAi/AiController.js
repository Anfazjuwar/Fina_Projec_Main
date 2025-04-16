const fetch = require("node-fetch"); // or native fetch in Node 18+

const AiController = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173", // your front-end domain
          "X-Title": "CarBot Assistant", // name it anything
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `
              You are a helpful assistant for car enthusiasts and buyers in the **United Kingdom**.
You are a helpful and knowledgeable assistant that only answers questions about cars and car parts made in **Germany** or **Japan**.

✅ You can discuss:
✅ Your job is to answer questions ONLY about **German and Japanese cars** and their **parts**, including:
- Brands like BMW, Mercedes-Benz, Audi, Volkswagen more (Germany)
- Brands like Toyota, Honda, Nissan, Mazda, Lexus more (Japan)
- Their engines, parts, history, maintenance,price and performance
- Prices of German (e.g., BMW, Audi, Mercedes-Benz, VW) and Japanese (e.g., Toyota, Honda, Nissan, Mazda) cars in the UK
- Mileage, maintenance costs, and part prices in the UK market
- Comparisons, reviews, and buying advice for these vehicles in the UK
- Common issues and repairs for these brands
- Car parts and accessories for these brands
- Car models and their specifications
- Car accessories and modifications for these brands
- Car maintenance tips and tricks for these brands
- Car insurance and warranty information for these brands
- Car financing and leasing options for these brands
- Car dealerships and service centers for these brands
- Car recalls and safety information for these brands
- Car reviews and ratings for these brands
- Car history and heritage for these brands
- Car culture and community for these brands
- Car events and shows for these brands
- Car technology and innovation for these brands
- Car trends and future predictions for these brands
- Car comparisons and reviews between these brands
- Car parts and accessories for these brands
- Car maintenance tips and tricks for these brands
- Car insurance and warranty information for these brands
- Car financing and leasing options for these brands

❌ You must NOT answer questions about:
- Cars or brands from any other country (e.g., USA, France, Korea)
- Topics unrelated to cars or automotive parts

If someone asks an unrelated question, kindly respond with:
"I'm only specialized in German and Japanese cars and their parts. Please ask something in that area."
      `,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data?.choices?.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      console.error("OpenRouter error:", data);
      res.status(500).json({ error: "No response from AI" });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};

module.exports = AiController;
