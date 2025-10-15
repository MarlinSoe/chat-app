import express from 'express';
import { loginUser, signupUser, userSuggestion, userSpecificSuggestion, myInfo, friendAdd} from '../controllers/usersControllers.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();


// login route
router.post('/login', loginUser)

// sign up route
router.post('/signup', signupUser)


router.use(requireAuth);
router.get('/suggestion', userSuggestion)
router.get('/suggestion/:username', userSpecificSuggestion)
router.get('/myinfo/:username', myInfo)
router.post('/friend/add/:myUsername/:friendUsername', friendAdd)

export default router;