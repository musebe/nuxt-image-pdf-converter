require('dotenv').config()

const app = require('express')()

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.NUXT_ENV_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

app.all('/generate-pdf', async (req, res) => {
    const pdf = await cloudinary.v2.uploader.multi(
        req.query.tag,
        { format: "pdf" },
    );

    res.json({ pdf: pdf })
})

module.exports = app
