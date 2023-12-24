const express = require('express')
const app = express()
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')

app.use(cors())
app.use(express.static('uploads'));
const upload = multer({ dest: 'uploads' })
app.post('/api/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    const file = req.file
    // 文件重命名
    const oldpath = file.path
    const newpath = 'uploads/' + file.originalname
    fs.rename(oldpath, newpath, (err) => {
        if (err) return console.log(err)
        console.log('文件重命名成功', newpath)
    })
    res.send({
        status: 0,
        url: newpath
    })
})




app.listen(3000, () => {
    console.log('server running at 127.0.0.1:3000')
})