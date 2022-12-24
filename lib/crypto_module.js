const crypto = require("crypto");

exports.module = {
  encodePassword : function(plainPassword){
	return new Promise(async (resolve, reject) => {
		const salt = await createSalt();
		crypto.pbkdf2(plainPassword, salt, 121687, 64, "sha512", (err, key) => {
			if (err) reject(err);
			resolve({ hashedPassword: key.toString("base64"), salt });
		});
	});
  },

	getUserHashedPassword : function(salt, plainPassword){
		return new Promise(async (resolve, reject) => {
			crypto.pbkdf2(plainPassword, salt, 121687, 64, "sha512", (err, key) => {
				if (err) reject(err);
				resolve(key.toString("base64"));
			});
		});
	}


}

exports.createSalt = () => {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(64, (err, buf) => {
			if (err) reject(err);
			resolve(buf.toString("base64"));
		});
	});
}
