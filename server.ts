import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: 'Sweet box', timestamp: new Date().toISOString() });
  });

  // Gemini AI Mascot Assistant Route
  app.post('/api/mascot/recommend', async (req, res) => {
    try {
      const { userQuery, cartContext, preferredCategory } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          reply: "👋 Coucou ! Je suis la petite mascotte Sweetie ! Je te conseille notre fameuse **Crêpe Kinder** (3 000 F) ou notre délicieuse crêpe salée **Poulet Fromage** (3 500 F) !",
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `
You are "La Petite Boîte Sweetie", the charming and energetic mascot for "Sweet box", a gourmet crêperie specializing in sweet and savory artisanal crêpes.
Your tagline is: "LE BONHEUR TIENT DANS UNE BOÎTE".

Menu details:
Nos crêpes sucrées:
- Crêpe chocolat : 2 000 F
- Oreo chocolat : 3 000 F
- Milo Oreo : 3 000 F
- Nature : 3 000 F
- Spéculos : 3 000 F
- Pure chocolat Oreo : 3 000 F
- Kinder : 3 000 F
- Multi saveurs : 3 000 F
Note: Tout supplément chocolat ou autre est facturé à 500 F.

Nos crêpes salées:
- Poulet fromage : 3 500 F
- Viande hachée fromage : 3 000 F

Instructions de commande:
- WhatsApp & Wave: 0594375827
- Paiement: Dépôt total sur Wave au 0594375827
- Livraison: YANGO (frais à la charge du client)
- TikTok: @sweetboxee0

Rules:
1. Speak in friendly, warm French with appetizing emojis (📦, 🍫, 🥞, 🧀, ✨, ❤️).
2. Keep responses concise, playful, and maximum 2 to 3 sentences long.
3. Recommend items with exact prices in FCFA / F.
4. Always reinforce the core brand concept: "Le bonheur tient dans une boîte".
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Client Question: "${userQuery || 'Que me conseilles-tu aujourd’hui ?'}" (Context: ${
          preferredCategory || 'général'
        }, Cart items count: ${cartContext?.length || 0})`,
        config: {
          systemInstruction,
          temperature: 0.85,
        },
      });

      const reply = response.text || "📦 Tout le bonheur tient dans une boîte ! Je te recommande notre Crêpe Multi saveurs à 3 000 F ou Poulet Fromage à 3 500 F ! 🍫✨";

      return res.json({ reply });
    } catch (error) {
      console.error('Error in mascot recommendation route:', error);
      return res.json({
        reply: "📦 👋 Hop ! Je te conseille de tester la **Crêpe Kinder** (3 000 F) ou la crêpe salée **Poulet Fromage** (3 500 F) ! Un vrai régal !",
      });
    }
  });

  // Order Submission Endpoint
  app.post('/api/order/submit', (req, res) => {
    const { items, customerName, phone, deliveryType } = req.body;

    const orderId = 'SWB-' + Math.floor(100000 + Math.random() * 900000);
    const estimatedMinutes = 30;

    let totalAmount = 0;
    let message = `Bonjour Sweet box ! 📦✨\nJe souhaite passer la commande N° *${orderId}*\n\n*Client:* ${customerName || 'Gourmand'}\n*Téléphone:* ${phone || '0594375827'}\n\n*Contenu:*\n`;

    if (items && Array.isArray(items)) {
      items.forEach((item: any) => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        message += `• ${item.quantity}x ${item.name} (${itemTotal.toLocaleString('fr-FR')} F)\n`;
      });
    }

    message += `\n*Total:* ${totalAmount.toLocaleString('fr-FR')} F\n`;
    message += `*Paiement:* Dépôt Wave de ${totalAmount.toLocaleString('fr-FR')} F au 0594375827\n`;
    message += `*Livraison:* Yango (frais à ma charge)\n\n*Slogan:* Le bonheur tient dans une boîte ❤️`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/594375827?text=${encodedMessage}`;

    return res.json({
      success: true,
      orderId,
      estimatedMinutes,
      whatsappUrl,
      phone: '0594375827',
      totalAmount,
    });
  });

  // Vite Middleware Setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
