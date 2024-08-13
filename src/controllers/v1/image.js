// const upload = require('../../config/multer');

// const imageUpdaload = async (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.send(`Error: ${err}`);
//     } else if (req.file === undefined) {
//       res.send('Error: No File Selected!');
//     } else {
//       res.status(200).json({
//         status: 200,
//         message: 'File Uploaded!',
//         file: `/public/${req.file.filename}`,
//       });
//     }
//   });
// };

// module.exports = { imageUpdaload };
