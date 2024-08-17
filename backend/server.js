import express, { response } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { AImodel } from "./controllers/geminiAi.js"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()
const httpserver = createServer(app)

const all_products = {
    "products": [
        {
            "id": 1,
            "name": "Classic Purple T-Shirt",
            "description": "A soft, breathable purple T-shirt made from 100% premium cotton. Perfect for everyday wear with a tailored fit and crew neckline.",
            "price": 20.00,
            "ratingAverage": 4.5,
            "ratingCount": 150,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/products%2Faryan1720700350437%2Fpurple%2F4?alt=media&token=5d6ddf63-976a-41e6-b0cf-4b850946d335"
        },
        {
            "id": 2,
            "name": "High-Performance Laptop",
            "description": "A sleek, powerful laptop with a fast processor, ample storage, and stunning display. Ideal for work, gaming, and multimedia.",
            "price": 1200.00,
            "ratingAverage": 4.7,
            "ratingCount": 320,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Flaptop.jpeg?alt=media&token=125a40ce-b7d6-415b-a4da-f0176c67911a"
        },
        {
            "id": 3,
            "name": "Smartphone Pro",
            "description": "A cutting-edge smartphone with a crystal-clear display, long battery life, and a professional-grade camera. Designed for the modern user.",
            "price": 999.00,
            "ratingAverage": 4.6,
            "ratingCount": 890,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Fsmartphone.jpeg?alt=media&token=79b3a429-93df-4789-928d-9d669c46f572"
        },
        {
            "id": 4,
            "name": "Precision Screwdriver Set",
            "description": "A durable screwdriver set with multiple heads for precision tasks. Perfect for electronics repair, DIY projects, and household needs.",
            "price": 15.99,
            "ratingAverage": 4.8,
            "ratingCount": 200,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Fscrew.jpg?alt=media&token=b8a42d29-fa5d-4bd1-8447-f24e1ccc8746"
        },
        {
            "id": 5,
            "name": "Wireless Earbuds",
            "description": "Compact and lightweight wireless earbuds with superior sound quality and noise cancellation. Includes a portable charging case.",
            "price": 59.99,
            "ratingAverage": 4.4,
            "ratingCount": 540,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Fwirelessjpeg.jpeg?alt=media&token=91ad12f3-ea5e-45a6-9a3b-b8a006a9e1e3"
        },
        {
            "id": 6,
            "name": "Stainless Steel Water Bottle",
            "description": "A 24oz stainless steel water bottle with double-wall insulation to keep drinks cold for up to 24 hours or hot for up to 12 hours.",
            "price": 25.00,
            "ratingAverage": 4.9,
            "ratingCount": 300,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Fbottle.jpeg?alt=media&token=65edc9c0-df21-4f3d-979f-56e4872788b0"
        },
        {
            "id": 7,
            "name": "Graphic Black T-Shirt",
            "description": "Stylish black T-shirt featuring a unique graphic print. Made from high-quality cotton for a comfortable and durable fit.",
            "price": 22.00,
            "ratingAverage": 4.7,
            "ratingCount": 180,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/products%2F9198765432101720681307252%2Fblack%2F1?alt=media&token=e3351037-7b7b-46c6-8b41-d73594842701"
        },
        {
            "id": 8,
            "name": "V-Neck White T-Shirt",
            "description": "Simple yet elegant white T-shirt with a flattering V-neck design. Soft, breathable fabric perfect for layering or standalone wear.",
            "price": 18.00,
            "ratingAverage": 4.6,
            "ratingCount": 220,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Fvneck.jpeg?alt=media&token=350c4c55-5fa2-4c9e-a08b-26705435b6d3"
        },
        {
            "id": 9,
            "name": "Long Sleeve Navy T-Shirt",
            "description": "Classic navy T-shirt with long sleeves. Made from a soft cotton blend for extra comfort. Perfect for cooler weather.",
            "price": 25.00,
            "ratingAverage": 4.8,
            "ratingCount": 140,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Flongsleeve.jpeg?alt=media&token=167ce93d-687b-4d20-ad34-2ac6ddfe1d27"
        },
        {
            "id": 10,
            "name": "Cordless Power Drill",
            "description": "A versatile cordless power drill with variable speed settings and a rechargeable battery. Perfect for both professional and DIY projects.",
            "price": 85.00,
            "ratingAverage": 4.7,
            "ratingCount": 420,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Fpowerdrill.jpeg?alt=media&token=c6e6dfbb-00bb-4e7e-8c80-c8a8135fd3ca"
        }
    ]
}

const cart = {
    "cart_products": [
        {
            "id": 1,
            "name": "Classic Purple T-Shirt",
            "description": "A soft, breathable purple T-shirt made from 100% premium cotton. Perfect for everyday wear with a tailored fit and crew neckline.",
            "price": 20.00,
            "ratingAverage": 4.5,
            "ratingCount": 150,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/products%2Faryan1720700350437%2Fpurple%2F4?alt=media&token=5d6ddf63-976a-41e6-b0cf-4b850946d335"
        },
        {
            "id": 2,
            "name": "High-Performance Laptop",
            "description": "A sleek, powerful laptop with a fast processor, ample storage, and stunning display. Ideal for work, gaming, and multimedia.",
            "price": 1200.00,
            "ratingAverage": 4.7,
            "ratingCount": 320,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Flaptop.jpeg?alt=media&token=125a40ce-b7d6-415b-a4da-f0176c67911a"
        }]
}

const wishlist = {
    "wishlist_products": [
        {
            "id": 3,
            "name": "Smartphone Pro",
            "description": "A cutting-edge smartphone with a crystal-clear display, long battery life, and a professional-grade camera. Designed for the modern user.",
            "price": 999.00,
            "ratingAverage": 4.6,
            "ratingCount": 890,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Fsmartphone.jpeg?alt=media&token=79b3a429-93df-4789-928d-9d669c46f572"
        },
        {
            "id": 4,
            "name": "Precision Screwdriver Set",
            "description": "A durable screwdriver set with multiple heads for precision tasks. Perfect for electronics repair, DIY projects, and household needs.",
            "price": 15.99,
            "ratingAverage": 4.8,
            "ratingCount": 200,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Fscrew.jpg?alt=media&token=b8a42d29-fa5d-4bd1-8447-f24e1ccc8746"
        }
    ]
}

const profile = {
    "name": "Aryan Maurya",
    "contact": "9967855432",
    "gender": "Male",
    "address": "Wadala East, Mumbai-400037",
    "email": "aryan@gmail.com",
    "previous_orders": [{
        "id": 9,
        "name": "Long Sleeve Navy T-Shirt",
        "description": "Classic navy T-shirt with long sleeves. Made from a soft cotton blend for extra comfort. Perfect for cooler weather.",
        "price": 25.00,
        "ratingAverage": 4.8,
        "ratingCount": 140,
        "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Flongsleeve.jpeg?alt=media&token=167ce93d-687b-4d20-ad34-2ac6ddfe1d27"
    },
    {
        "id": 10,
        "name": "Cordless Power Drill",
        "description": "A versatile cordless power drill with variable speed settings and a rechargeable battery. Perfect for both professional and DIY projects.",
        "price": 85.00,
        "ratingAverage": 4.7,
        "ratingCount": 420,
        "imgUrl": "https://firebasestorage.googleapis.com/v0/b/maulikecommerceintern.appspot.com/o/Converge%2Fpowerdrill.jpeg?alt=media&token=c6e6dfbb-00bb-4e7e-8c80-c8a8135fd3ca"
    }]
}

function searchbyKeyword(keyword) {
    console.log(all_products)
    const search_list = all_products.products
    const search_result = []
    for (let i = 0; i < search_list.length; i++) {
        // Check if the product name contains the keyword (case-insensitive)
        if (search_list[i].name.toLowerCase().includes(keyword.toLowerCase())) {
            search_result.push(search_list[i]);
        }
    }

    console.log(search_result)
    return search_result

}

const io = new Server(httpserver, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.use((socket, next) => {
    const user_name = socket.handshake.auth.user_name;
    console.log(user_name)
    socket.user_name = user_name
    next()
});


io.on('connection', (socket) => {
    console.log(socket.id, socket.user_name)

    const actual_history = [{
        role: "user",
        parts: [
            {
                text: `You are a personal shopping assistant named Mark, and your responses should be plain text, free of any emojis. If the user asks to go to or open a particular location, reply with "open LOCATION NAME," substituting "LOCATION NAME" with the name of the location they want to visit. For commands related to ordering or adding an item to the wishlist, respond with "order PRODUCT NAME," "wishlist PRODUCT NAME," or "cart PRODUCT NAME," depending on whether the user wants to place an order, add the item to their wishlist, or add the item to their cart. Do not add any regular expressions in the response. Respond in plain text

There are only four pages available on the website: the home page, cart page, wishlist page, and profile page. When the user asks to navigate to or open a page, try to map their input to the closest matching page. If the user explicitly mentions the word "page," slice that part out, and do not include it in the response. Your command should simply be "open LOCATION NAME," without including the word "page." For example, if the user says "open home page," your response should be "open home."

If the user inquires about a particular product, initially provide them with the name, rating, and price of the product, making sure to include the price in dollars. If the user expresses interest, follow up with additional details such as the description of the product. Ensure your interactions are concise and ask questions to the user, replying accordingly based on their responses.

When the user wants to search for a product, look for matching products from the given list of products and generate the response in JSON format as follows:{
  "data-type": "JSON",
  "search_result": [{product1}, {product2}, ...],
  "summary": ""
}
  The summary should be based on the products in the search result to give the user a quick overview. Ensure that the response strictly adheres to this JSON format, with no additional comments, text, or formatting included. `
            },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(profile) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(all_products) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(cart) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(wishlist) },
        ],
    },
    {
        role: "model",
        parts: [
            { text: "Hello, I am your personal shopping assistant. How may I assist you?" },
        ],
    },]
    const chatSession = AImodel.startChat({

        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: actual_history
    });

    socket.on('prompt', async (response) => {
        console.log(response)

        actual_history.push({
            role: "user",
            parts: [
                { text: `${response}` }
            ]
        })

        try {
            const result = await chatSession.sendMessage(response);
            const Airesponse = result.response.text();

            if (Airesponse) {
                actual_history.push({
                    role: "model",
                    parts: [
                        { text: `${Airesponse}` }
                    ]
                })
            }
            socket.emit("response", Airesponse)

        }
        catch (err) {
            socket.emit("error", "some internal error occured")
            console.error(err)
        }

    })
})

app.use(cors())
app.use(bodyParser.json())
app.get("/all_products", (req, res) => {
    res.status(200).send(all_products)
})

app.get("/profile", (req, res) => {
    res.status(200).send(profile)
})

app.get("/cart", (req, res) => {
    res.status(200).send(cart)
})

app.get("/wishlist", (req, res) => {
    res.status(200).send(wishlist)
})

app.post("/add_to_cart", (req, res) => {
    const keyword = req.body.product_name
    console.log(keyword)
    const str_keyword = String(keyword)
    const search_list = all_products.products

    let search_result
    for (let i = 0; i < search_list.length; i++) {
        console.log("product ", search_list[i])
        // Check if the product name contains the keyword (case-insensitive)

        if (search_list[i].name.toLowerCase() == str_keyword.toLowerCase()) {
            search_result = search_list[i];
            break
        }
    }
    console.log("search result", search_result)
    const isInCart = cart.cart_products.some(product => product.id === search_result.id);

    if (!isInCart) {
        // Add the product to the cart if it is not already present
        cart.cart_products.push(search_result);
        res.status(200).send(`${search_result.name} added successfully to cart`);
    } else {
        // Send a response indicating that the product is already in the cart
        res.status(200).send(`${search_result.name} is already present in cart`);
    }

})

app.post("/add_to_wishlist", (req, res) => {
    const keyword = req.body.product_name
    console.log(keyword)
    const str_keyword = String(keyword)
    const search_list = all_products.products

    let search_result
    for (let i = 0; i < search_list.length; i++) {
        console.log("product ", search_list[i])
        // Check if the product name contains the keyword (case-insensitive)

        if (search_list[i].name.toLowerCase() == str_keyword.toLowerCase()) {
            search_result = search_list[i];
            break
        }
    }
    console.log("search result", search_result)
    const isInwishlist = wishlist.wishlist_products.some(product => product.id === search_result.id);

    if (!isInwishlist) {
        // Add the product to the cart if it is not already present
        wishlist.wishlist_products.push(search_result);
        res.status(200).send(`${search_result.name} added successfully to wishlist`);
    } else {
        // Send a response indicating that the product is already in the cart
        res.status(200).send(`${search_result.name} is already present in wishlist`);
    }

})

httpserver.listen(3000, () => {
    console.log("server is running on port 3000")
})

export { io }
