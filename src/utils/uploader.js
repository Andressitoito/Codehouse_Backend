import multer from "multer";
import fs from "fs/promises";

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {

		try {
			console.log('asdasdasdasdas')
			const user_id = req.user._id;

			const destinationFolder = `uploads/${user_id}/documents`;

			await fs.mkdir(destinationFolder, { recursive: true });

			if (
				file.fieldname === "photo_ID" ||
				file.fieldname === "photo_profile" ||
				file.fieldname === "address_bill"
			) {
				cb(null, destinationFolder);
			} else {
				throw new Error("Please upload all required files");
			}
		} catch (error) {
			cb(error, null);
		}
	},
	filename: function (req, file, cb) {
		const uniqueFileName = `${req.user_id}_${file.fieldname}_${Date.now()}_${
			file.originalname
		}`;

		cb(null, uniqueFileName);
	},
});

const uploader = multer({ storage });

export { uploader };

