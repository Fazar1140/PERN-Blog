const express = require('express')
const tutorials = require('../controllers/tutorial.controller')
const account = require('../controllers/Auth.controller')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'uploads/'})


router.post('/signup',account.singup)
router.post('/signin',account.singin)
router.post('/logout',account.logout)
router.get('/profile',account.getProfile)
 

router.post('/',upload.single('file'),tutorials.create)

 
router.get('/',tutorials.findAll)
router.get('/published',tutorials.findAllPublished)
router.get('/:id',tutorials.findOne)
router.get('/uploads/:cover',tutorials.findImage)
 

router.put('/:id',upload.single('file'),tutorials.update)
router.delete('/:id',tutorials.Delete)
router.delete('/',tutorials.deleteAll)
 

module.exports = router;