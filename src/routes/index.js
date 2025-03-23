const exprees = require('express');
const { apiKey,permission } = require('../auth/checkAuth');
const router = exprees.Router();

//check api
router.use(apiKey)
//check permission
router.use(permission('0000'))

router.use('/v1/api',require('./access'))



module.exports = router;