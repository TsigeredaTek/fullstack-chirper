import { Router } from "express";
import db from "../db";

const router = Router();

// GET /api/chirps/1 or GET /api/chirps
router.get("/:id?", async (req, res, next) => {
  const id = Number(req.params.id);
  if (id) {
    try {
      const [chirp] = await db.chirps.one(id);
      res.json(chirp);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const chirps = await db.chirps.all();
      res.json(chirps);
    } catch (error) {
      next(error);

      // query(
      //   `SELECT 
      //       ch.id as id, 
      //       ch._created as time,
      //       users.name as user,
      //       ch.text as content 
      //   FROM chirps ch 
      //   JOIN users ON userid =users.id
      //    id, (error, results, fields) => {
      //           release();

      //           if (error) {
      //               throw (error);
      //           } else if (results.length === 0) {
      //               res.sendStatus(404);
      //               throw new Error('Invalid Chirp id')
      //           }
      //           res.json(results);
  
    }
  }
});

// POST /api/chirps/
router.post("/", async (req, res, next) => {
  console.log("fnjsndfj")
  const chirp = req.body;
  try {
    const newUser = await db.users.newuser(chirp.user);
    const result = await db.chirps.insert(chirp.content, newUser.insertId);
    res.json(result);
  } catch (error) {
    next(error);

    // query(
    //   `INSERT INTO chirps (_created,userid,text)  
    //   Values(?,?,?)`, [time, user, content], (error, results, fields) => {
    //       connection.release();
    //       if (error) {
    //           throw (error);
    //       };
    //       res.json({ id:results.insertId,time, user, content });
  }
});

// PUT /api/chirps/1
router.put("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  const chirp = req.body;
  try {
    await db.chirps.update(id, chirp.content);
    res.json({ msg: "edited", id });
  } catch (error) {
    next(error);

    // query(
    //   `UPDATE chirps
    //   SET _created = ?,userid=?,text= ? 
    //   WHERE id = ?`, [time, user, content, id], (error, results, fields) => {
    //       connection.release();
    //       if (error) {
    //           throw (error);
    //       } else if (results.affectedRows === 0) {
    //           res.sendStatus(404);
    //           throw new Error('Invalid Chirp id')
    //       }
    //       res.sendStatus(200);

  }
});

// DELETE /api/chirps/1
router.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    await db.chirps.destroy(id);
    res.json({ msg: "destroyed" });
  } catch (error) {
    next(error);

    // query(
    //   `DELETE FROM chirps
    //   WHERE id = ?`, id, (error, results, fields) => {
    //       connection.release();
    //       if (error) {
    //           throw (error);
    //       } else if (results.affectedRows === 0) {
    //           res.sendStatus(404);
    //           throw new Error('Invalid Chirp id')
    //       }
    //       res.sendStatus(200);

  }
});

export default router;



// router.post('/:id/user/:userid', (req, res) => {
//   let chirpId = req.params.id;
//   let userId = req.params.userid;
//   pool.getConnection((err, connection) => {
//       if (err) throw err;

//       connection.query(
//           `INSERT INTO mentions (userid,chirpid)
//           Values(?,?)`, [userId,chirpId], (error, results, fields) => {
//               connection.release();
//               if (error) {
//                   res.sendStatus(404);
//                   throw (error);
//               };
//               res.json({ userId,chirpId });
//           });



//   });
  


// });

// router.get('/user/:id', (req, res) => {
//   let id = req.params.id;
//   pool.getConnection((err, connection) => {
//       if (err) {
//           throw err

//       } else {
      

//           connection.query(
//               `CALL spUserMentions(?)`, id,
//                (error, results, fields) => {
//                       connection.release();
//                       if (error) {
//                           throw error;
//                       } else if (results[0].length === 0) {
//                           res.sendStatus(404);
//                           console.log('Invalid user id');
//                       }
//                       else{
//                           res.json(results[0]);
//                       }
