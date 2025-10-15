import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: '3d' });
}

export async function signupUser (req, res)  {
    const {username, password, bio, birthYear} = req.body;

    try {
        const user = await User.signup(username, password, bio, birthYear);
        const token = createToken(user._id)
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

export async function loginUser (req, res) {
    const {username, password} = req.body;

    try {
        const user = await User.login(username, password);
        const token = createToken(user._id)
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export async function userSuggestion (req, res) {
    try {
        const users = await User.find()
        res.status(200).json(users)
        
    } catch (error) {
        console.log('Error in userSuggestion controller', error);
        res.status(500).json({message:'Internal server failure.'});
    }
}

export async function userSpecificSuggestion(req, res) {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found!' });
        
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in userSpecificSuggestion controller:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export async function myInfo(req, res) {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: 'My Info not found!' });
        }

        // Only return safe fields
        const safeUser = {
            _id: user._id,
            username: user.username,
            birthYear: user.birthYear,
            createdAt: user.createdAt,
            bio: user.bio,
            friends: user.friends
            // Add other non-sensitive fields here
        };

        res.status(200).json(safeUser);

    } catch (error) {
        console.error('Error in MyInfo controller:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export async function friendAdd(req, res) {
  try {
    const myUsername = req.params.myUsername;
    const friendUsername = req.params.friendUsername;


    // Find the friend by username
    const friendUser = await User.findOne({ username: friendUsername });
    if (!friendUser) {
      return res.status(404).json({ message: "Friend user not found." });
    }

    // Prevent user from adding themselves
    if (friendUsername === myUsername) {
      return res.status(400).json({ message: "You cannot add yourself as a friend." });
    }

    // Add friendUsername to the user's friends list (no duplicates due to $addToSet)
    const updatedUser = await User.findOneAndUpdate(
    { username: myUsername }, // ✅ FIXED
    { $addToSet: { friends: friendUsername } },
    { new: true }
    );

    const friendUserList = await User.findOneAndUpdate(
    { username: friendUsername }, // ✅ FIXED
    { $addToSet: { friends: myUsername } },
    { new: true }
    );






    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a sanitized user object to return
    const safeUser = {
      _id: updatedUser._id,
      username: updatedUser.username,
      birthYear: updatedUser.birthYear,
      createdAt: updatedUser.createdAt,
      bio: updatedUser.bio,
      friends: updatedUser.friends
    };

    res.status(200).json(safeUser);

  } catch (error) {
    console.error('Error in friendAdd controller:', error);
    res.status(500).json({ message: 'Internal server failure.' });
  }
}

