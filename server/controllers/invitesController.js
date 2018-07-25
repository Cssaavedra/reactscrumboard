const db = require('../db/index.js');

const invitesController = {
   getInvites: (req, res) => {
      console.log('invites body', req.body)
      const query = `SELECT * FROM invites WHERE user_id=${parseInt(req.body.user_id)}`;
      db.query(query, '', (err, results) => {
         if (err) res.json(err);
         res.json(results.rows);
      })
   }
}

module.exports = invitesController;