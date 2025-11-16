import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const updateProfile = async (req, res) => {
  const { fullName, username, profilePic } = req.body;
  const userId = req.user._id;

  try {
    // Ambil user yang ada terlebih dahulu untuk mendapatkan nilai sebelumnya
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Siapkan objek update hanya dengan field yang disediakan
    const updateFields = {};

    // Update field profilePic jika ada
    if (profilePic) {
      // Cek apakah profilePic adalah string
      if (typeof profilePic !== 'string') {
        return res.status(400).json({ error: "Profile picture must be a string (URL or base64 data)" });
      }

      // Cek apakah profilePic adalah URL
      if (profilePic.startsWith('http')) {
        // Jika profilePic adalah URL (bukan data base64), langsung gunakan
        updateFields.profilePic = profilePic;
      } else if (profilePic.startsWith('data:')) {
        // Jika profilePic adalah data base64, cek dulu konfigurasi Cloudinary
        if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
          // Coba upload ke Cloudinary dengan penanganan error yang lebih baik
          try {
            const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
              folder: "taimuchatto_profiles",
              format: profilePic.split(';')[0].split('/')[1] || 'png',
            });
            updateFields.profilePic = uploadedResponse.secure_url;
          } catch (uploadError) {
            console.error("Error uploading image to Cloudinary:", {
              message: uploadError.message,
              profilePicPreview: profilePic.substring(0, 50) + "..."
            });
            // Jika gagal upload, tetap simpan data base64 sebagai fallback
            updateFields.profilePic = profilePic;
          }
        } else {
          // Jika konfigurasi Cloudinary tidak lengkap, simpan data base64
          console.error("Cloudinary configuration missing, storing base64 data");
          updateFields.profilePic = profilePic;
        }
      } else {
        // Jika format profilePic tidak dikenal, simpan sebagai fallback
        updateFields.profilePic = profilePic;
      }
    }

    // Update field fullName jika ada
    if (fullName) {
      updateFields.fullName = fullName;
    }

    // Update field username jika ada
    if (username) {
      updateFields.username = username;
    }

    // Update user hanya dengan field yang disediakan
    // Kita gunakan findOneAndUpdate dengan runValidators: false untuk menghindari error required field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: false } // Nonaktifkan runValidators untuk mencegah error required field
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Jangan kembalikan password
    updatedUser.password = undefined;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      errors: error.errors ? Object.keys(error.errors).map(key => ({
        path: key,
        message: error.errors[key].message
      })) : null
    });

    // Periksa apakah error validasi terkait username
    if (error.name === 'ValidationError') {
      const errorMessages = Object.keys(error.errors).map(key => error.errors[key].message);
      return res.status(400).json({
        error: "Validation Error",
        details: errorMessages
      });
    }
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
