//import sqlite3
const sqlite3 = require("sqlite3");

//create db
const db = new sqlite3.Database(__dirname + "/myDB.sqlite", (err) => {
  if (err) console.log("Cannot connect to database", err);
});

//keys
const config = {
  secretKey: "SecretKey",
};

//node in-built encryption framework
const crypto = require("crypto");

//generate token
const jwt = require("jsonwebtoken");

class myDB {
  constructor() {
    this.createTable();
  }
  createTable() {
    // create table
    db.serialize(() => {
      // Queries scheduled here will be serialized.

      //users table
      db.run(
        `CREATE TABLE IF NOT EXISTS users(
          userId INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email  UNIQUE NOT NULL,
          password TEXT NOT NULL,
          salt TEXT NOT NULL,
          gender TEXT CHECK(gender in ('Male', 'Female')) NOT NULL,
          dob DATE NOT NULL,
          mobile TEXT,
          address TEXT,
          city TEXT,
          state TEXT,
          country TEXT,
          maritalstatus TEXT,
          role VARCHAR(10) NOT NULL DEFAULT 'local',
          joined DATETIME DEFAULT (datetime('now','localtime'))
      )`,
        (err, row) => {
          if (err) {
            console.log("User Table Error:", err);
          }
        }
      );
    });
  }

  addUser(
    $uname,
    $email,
    $upass,
    $gender,
    $dob,
    $mobile = null,
    $address = null,
    $city = null,
    $state = null,
    $country = null,
    $maritalstatus = null,
    $role = "local"
  ) {
    return new Promise((resolve, reject) => {
      const $salt = crypto.randomBytes(128).toString("base64");
      const $pass = crypto
        .createHash("SHA256")
        .update($upass + $salt)
        .digest("base64");
      db.serialize(() => {
        db.run(
          `INSERT INTO users(username, email, password, salt, gender, dob, mobile, address, city, state, country, maritalstatus, role) VALUES($uname, $email, $pass, $salt, $gender, $dob, $mobile, $address, $city, $state, $country, $maritalstatus, $role)`,
          {
            $uname,
            $email,
            $pass,
            $salt,
            $gender,
            $dob,
            $mobile,
            $address,
            $city,
            $state,
            $country,
            $maritalstatus,
            $role,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              console.log("New User Added successfully");
              resolve("New User Added successfully");
            }
          }
        );
        db.all(
          `select * from users where username = $uname`,
          { $uname },
          (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              console.log(rows);
              resolve(rows);
            }
          }
        );
      });
    });
  }

  delUser($userId) {
    return new Promise((resolve, reject) => {
      db.run(`delete from users where userId = $userId`, { $userId }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("User deleted successfully");
        }
      });
    });
  }

  getUser($uname, $upass) {
    return new Promise((resolve, reject) => {
      db.all(
        `select * from users where username = $uname`,
        { $uname },
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const hash = crypto
              .createHash("SHA256")
              .update($upass + rows[0].salt)
              .digest("base64");
            const payload = {
              id: rows[0].userId,
              username: rows[0].username,
              email: rows[0].email,
            };
            if (rows[0].password === hash) {
              jwt.sign(
                payload,
                config.secretKey,
                // { expiresIn: 3600 },
                (err, encoded) => {
                  if (err) throw err;
                  resolve({
                    success: true,
                    token: "Bearer " + encoded,
                  });
                }
              );
            } else {
              reject({ success: false, error: "Invalid username or password" });
            }
          }
        }
      );
    });
  }

  getProfile($userId, $username, $email) {
    return new Promise((resolve, reject) => {
      db.all(
        `select * from users where userId = $userId and username = $username and email = $email`,
        {
          $userId,
          $username,
          $email,
        },
        (err, rows) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rows);
            resolve(rows);
          }
        }
      );
    });
  }

  editProfile(
    $profileId,
    $skills,
    $handle,
    $occupation,
    $website,
    $company,
    $location,
    $fb,
    $insta,
    $github
  ) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(
          `UPDATE profile
            SET skills = $skills,
              handle = $handle,
              occupation = $occupation, 
              website = $website, 
              company = $company, 
              location = $location, 
              fb = $fb, 
              insta = $insta, 
              github = $github 
            WHERE profileId = $profileId`,
          {
            $profileId,
            $skills,
            $handle,
            $occupation,
            $website,
            $company,
            $location,
            $fb,
            $insta,
            $github,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              console.log("User Profile Updated successfully");
              resolve("User Profile Updated successfully");
            }
          }
        );
        db.all(`select * from profile`, (err, rows) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(rows);
            resolve(rows);
          }
        });
      });
    });
  }
}

module.exports = myDB;
