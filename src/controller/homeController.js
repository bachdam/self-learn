import pool from "../configs/connectDB";

let getHomePage = async (req, res) => { //if we have await in the function, the function has to have async (phuong trinh bat dong bo)

      const [rows, fields] = await pool.execute('SELECT * FROM users');
      return res.render('./index.ejs', {dataUser: rows, test: "abc string test"});
}

let getDetailPage = async (req, res) => {
  let userId = req.params.userId;
  let user = await pool.execute('select * from users where id = ?', [userId]);

  return res.send(JSON.stringify(user[0]));
}

let createNewUser = async (req, res) => {
  console.log(">>>check new user data:", req.body);
  let {firstName, lastName, email, address} = req.body;

  await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', 
    [firstName, lastName, email, address]);
  return res.redirect('/');
};

let getEditPage = async (req, res) => {
  let userId = req.params.userId;
  let [user] = await pool.execute('Select * from users where id =?', [userId]); // has to be [user] or it will take both user and fields 
  //return res.send(JSON.stringify(user));
  return res.render(`update.ejs`, {dataUser: user[0]});
}
let deleteUser =  async (req, res) => {
  let userId = req.body.userId;
  await pool.execute(`delete from users where id = ?`, [userId]);
  return res.redirect('/');
}

let postUpdateUser = async (req, res) => {
  let {firstName, lastName, email, address, userId} = req.body;
  await pool.execute('update users set firstname = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, userId]);
  console.log('>>>check data: ', req.body );
  return res.redirect('/');
}
//use this objects export to export many elements at once
module.exports = {
    getHomePage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}