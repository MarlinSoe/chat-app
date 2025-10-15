import Message from "../models/Message.js"

export async function establishMessageConnection(req, res) {

    const combinedUsername = req.params.combinedUsername

    try {
        // Check if connection already exists
        const existConnection = await Message.findOne({ owners: combinedUsername });

        if (existConnection) {
            return res.status(200).json({ message: 'Connection already established.' });
        }

        // Create new message connection
        const newConnection = new Message({
            owners: combinedUsername,
        });

        await newConnection.save();

        return res.status(201).json({ message: 'New message connection established.', data: newConnection });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error. Could not establish connection.', error });
    }
}

export async function addMessage(req, res) {

    const { messageContent, ownerUsername } = req.body;
    const combinedUsername = req.params.combinedUsername;

    if (!messageContent.trim()) {
        return res.status(400).json({message: "All fields are required."})
    }

    try {
        const existConnection = await Message.findOne({ owners: combinedUsername });

        if (!existConnection) {
            return res.status(404).json({ message: 'Message thread not found.' });
        }

        // Create new message
        const newMessage = {
            content: messageContent,
            owner: ownerUsername,
            createdAt: new Date() // Optional, since schema sets default
        };

        // Push new message to the messages array
        existConnection.messages.push(newMessage);

        // Save the updated document
        await existConnection.save();

        return res.status(200).json({ message: 'Message added successfully.', data: existConnection });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error in addMessage Controller', error });
    }
}


export async function fetchMessage(req, res) {
    const combinedUsername = req.params.combinedUsername

    try {
        const existConnection = await Message.findOne({ owners: combinedUsername });
        if (!existConnection){
            return res.status(500).json({message: 'Server error. Could not fetch messages.', error})
        }

        const Messages = existConnection
        res.status(201).json({Messages})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server Error in fetchMessage Controller', error})
    }
         
        
}