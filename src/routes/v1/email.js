const router = require('express').Router();
const { sendVerificationCode, verifyCode } = require('../../controllers/v1/email');

router.post('/send-verification-code', sendVerificationCode);
router.post('/verify-code', verifyCode);

module.exports = router;
