import multer from "multer";
import fs from "fs/promises";

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		try {
			// Assuming you have user_id in the request
			const user_id = req.user_id;

			// Define the destination folder based on user_id
			const destinationFolder = `uploads/${user_id}/documents`;

			// Create the folder if it doesn't exist
			await fs.mkdir(destinationFolder, { recursive: true });

			// Check if all three required files are present
			if (
				file.fieldname === "photo_id" ||
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
		// Generate a unique filename (e.g., using Date.now())
		const uniqueFileName = `${req.user_id}_${file.fieldname}_${Date.now()}_${
			file.originalname
		}`;

		cb(null, uniqueFileName);
	},
});

const uploader = multer({ storage });

export { uploader };

// document > 3 para pasara user premium
// Router.post('api/users/:uid/documents', uploader.array('documents', 3), (req,res) => {
// req.file va a venir algo
// })

// User.document.length >= 3
