const db = require('../db/index.js');

const boardController = {
  getBoards: (req, res) => {
    const query = `SELECT
    board.board_id,
    title
    FROM board
    INNER JOIN permissions ON permissions.board_id = board.board_id
    WHERE permissions.user_id = ${req.body.userId}`;
    //const query2 = `SELECT * FROM board WHERE user_id=${req.body.userId}`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    })
  },

  deleteBoard: (req, res) => {
    console.log('inside of deleteBoard ',req.body);
    const query = `BEGIN;
    DELETE FROM story WHERE board_id = ${req.body.board_id}; 
    DELETE FROM task WHERE board_id = ${req.body.board_id};
    DELETE FROM permissions WHERE board_id= ${req.body.board_id};
    DELETE FROM invites WHERE board_id= ${React.body.board_id};
    DELETE FROM board WHERE board_id=${req.body.board_id};
    COMMIT;`;
    //const query = `DELETE FROM board WHERE board_id=${req.body.board_id} RETURNING *`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      console.log(results);
      res.json(results.rows);
    })
  },

  addBoard: (req, res) => {

    const query = 'INSERT INTO board (user_id, title) VALUES($1, $2) RETURNING *';
    const values = [`${req.body.userId}`, `${req.body.title}`];
    db.query(query, values, (err, results) => {
      if (err) console.log('THIS IS ERROR ', err);
      else {
        console.log('I am in addboard',results.rows[0]);
        const innerQuery = 'INSERT INTO permissions (board_id, user_id) VALUES ($1, $2) RETURNING *';
        const innerVals = [`${results.rows[0].board_id}`, `${req.body.userId}`];
        db.query(innerQuery, innerVals , (err, innerResults)=>{
          if (err) console.log('This is ERROR: ', err);
        
        });

        res.json(results.rows[0]);
      }
    });

  },
  checkInvites: (req,res) =>{
    const query = 'SELECT * FROM invites WHERE user_id =$1';
    const values = [`${req.body.userId}`];
    db.query(query, values, (err, results) =>{
      if (err) return err;
      if (results.rows) res.json(results.rows);
    })
  },

  sendInvite:  (req, res) => {
    const query = `INSERT INTO invites (board_id, user_id) VALUES ($1, $2) RETURNING *`;
    const values = `[${req.body.board_id}, ${req.body.userId}]`;
    db.query( query, values, (err, results) =>{
      if (err) return err;
      res.json(results.rows[0]);
    });
  },

  rejectInvite: (req, res) => {

    const query = `DELETE FROM invites WHERE board_id =${req.body.board_id} AND user_id = ${req.body.userId}`;
    db.query( query, '', (err, results) =>{
      if (err) return err;
      res.json(results.rows); //might throw error, will need to check what rows is. -Chris
    });
  },
  acceptInvite: (req, res) => {
    this.rejectInvite(req);
    const queryAddPermissions = 'INSERT INTO permissions (board_id, user_id) VALUES ($1, $2)';
    const values = [`${req.body.board_id}`, `${req.body.userId}`];
    db.query(queryAddPermissions, values, (err, results) =>{
        if (err) console.log('ERROR! ', err);
      res.json(results.row);
    });
  },

}

module.exports = boardController;
