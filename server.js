import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = "DEIN_BOT_TOKEN";
const CHAT_ID = "DEIN_CHAT_ID";

app.post("/order", async (req, res) => {

    const { cart, total, orderId, date } = req.body;

    const message =
`🛒 NEUE BESTELLUNG

🆔 ID: ${orderId}
📅 Datum: ${date}

📦 Produkte:
${cart.map(i => `• ${i.name} x${i.qty} (€${i.price})`).join("\n")}

💰 Gesamt: €${total}
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    });

    res.json({ ok: true });
});

app.listen(3000, () => console.log("Server läuft 🚀"));
