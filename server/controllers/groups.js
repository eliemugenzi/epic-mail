
import jwt from "jsonwebtoken";
import Group from "../models/groups";
import Db from "../db";

class GroupController {
    static groups(req, res) {
        const sql = "SELECT * FROM groups";
        Db.query(sql).then((result) => {
            res.json({
                status: 200,
                data: result.rows,
            });
        });
    }

    static group(req, res) {
        const { id } = req.params;
        const sql = `SELECT * FROM groups WHERE id='${id}'`;
        Db.query(sql).then((result) => {
            if (result.rows.length) {
                res.json({
                    status: 200,
                    data: result.rows,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "This group is not available",
                });
            }
        });
    }

    static createGroup(req, res) {
        const { name } = req.body;
        const sql1 = `SELECT * FROM users WHERE email='${req.user.email}'`;
        Db.query(sql1).then((result) => {
            if (result.rows.length) {
                console.log(req.user);
                const memberId = result.rows[0].id;
                const newGroup = [
                    name,
                    result.rows[0].id,
                    new Date(),
                ];
                const sql2 = "INSERT INTO groups(name,createdby,createdon) VALUES($1,$2,$3) RETURNING *";
                Db.query(sql2, newGroup).then((result) => {
                    console.log(result.rows);
                    const groupId = result.rows[0].id;
                    const newMember = [
                        groupId,
                        memberId,
                        "admin",
                    ];
                    const sql = "INSERT INTO group_members(groupId,memberId,role) VALUES($1,$2,$3)";
                    Db.query(sql, newMember).then(() => { });
                    res.status(201).json({
                        status: 201,
                        data: result.rows,
                    });
                }).catch(err => console.log(err));
            }
        });
    }

    static addMembers(req, res) {
        const { memberId } = req.body;
        const { groupId } = req.params;

        const sql1 = `SELECT * FROM users WHERE email='${req.user.email}'`;
        Db.query(sql1).then((result) => {
            const userId = result.rows[0].id;
            const sql2 = `SELECT * FROM groups WHERE id='${groupId}'`;
            Db.query(sql2).then((result) => {
                if (!result.rows.length) {
                    return res.status(404).json({
                        status: 404,
                        error: "This group does not exist!",
                    });
                }
                const sql3 = `SELECT * FROM group_members WHERE groupId=${groupId} AND memberId=${userId} AND role='admin'`;
                Db.query(sql3).then((result) => {
                    if (!result.rows.length) {
                        return res.status(400).json({
                            status: 400,
                            error: "You are not allowed to add a member",
                        });
                    }
                    const sqlx = `SELECT * FROM group_members WHERE groupId='${groupId}' AND memberId='${memberId}'`;
                    Db.query(sqlx).then((result) => {
                        if (result.rows.length) {
                            res.status(400).json({
                                status: 400,
                                error: "This user already exists",
                            });
                        } else {
                            const sql4 = "INSERT INTO group_members(groupId,memberId,role) VALUES($1,$2,$3) RETURNING *";
                            const member = [
                                groupId,
                                memberId,
                                "user",
                            ];
                            Db.query(sql4, member).then((result) => {
                                res.status(201).json({
                                    status: 201,
                                    data: result.rows,
                                });
                            });
                        }
                    });
                });
            });
        });
    }

    static sendGroupMessage(req, res) {
        const { groupId } = req.params;
        const { subject, message } = req.body;

        const sql1 = `SELECT * FROM users WHERE email='${req.user.email}'`;
        Db.query(sql1).then((result) => {
            if (result.rows.length) {
                const senderId = result.rows[0].id;
                const sql2 = `SELECT * FROM groups WHERE id='${groupId}'`;
                Db.query(sql2).then((result) => {
                    if (result.rows.length) {
                        const sql3 = `SELECT * FROM group_members WHERE memberId='${senderId}' AND groupId='${groupId}'`;
                        Db.query(sql3).then((result) => {
                            if (result.rows.length) {
                                const newMessage = [
                                    senderId,
                                    groupId,
                                    subject,
                                    message,
                                    "sent",
                                    new Date(),
                                ];
                                const sql = "INSERT INTO group_messages(senderId,groupId,subject,message,status,createdOn) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
                                Db.query(sql, newMessage).then((result) => {
                                    res.status(201).json({
                                        status: 201,
                                        data:result.rows,
                                    });
                                });
                            } else {
                                return res.status(400).json({
                                    status: 400,
                                    error: "You are not in this group",
                                });
                            }
                        });
                    } else {
                        return res.status(400).json({
                            status: 400,
                            error: "This group does not exist",
                        });
                    }
                });
            }
        });
    }

    static deleteUser(req, res) {
        const { groupId, memberId } = req.params;
        const sql1 = `SELECT * FROM users WHERE email='${req.user.email}'`;
        Db.query(sql1).then((result) => {
            const userId = result.rows[0].id;
            const sql2 = `SELECT * FROM groups WHERE id='${groupId}'`;
            Db.query(sql2).then((result) => {
                if (!result.rows.length) {
                    return res.status(404).json({
                        status: 404,
                        error: "This group does not exist",
                    });
                }
                const sql3 = `SELECT * FROM group_members WHERE memberId='${memberId}' AND groupId='${groupId}'`;
                Db.query(sql3).then((result) => {
                    if (!result.rows.length) {
                        return res.status(404).json({
                            status: 404,
                            error: "The group member you are trying to delete is not found",
                        });
                    }
                    const sql4 = `SELECT * FROM groups WHERE createdBy='${userId}' AND id='${groupId}'`;
                    Db.query(sql4).then((result) => {
                        if (!result.rows.length) {
                            return res.status(400).json({
                                status: 400,
                                error: "You are not allowed to delete anyone here",
                            });
                        }

                        const sql5 = `DELETE FROM group_members WHERE groupId=${groupId} AND memberId=${memberId} RETURNING *`;
                        Db.query(sql5).then((result) => {
                            res.status(200).json({
                                status: 200,
                                data: result.rows,
                            });
                        });
                    });
                });
            });
        });
    }

    static editName(req, res) {
        const { name } = req.body;
        const { id } = req.params;
        const sql = `SELECT * FROM users WHERE email='${req.user.email}'`;
        Db.query(sql).then((result) => {
            const memberId = result.rows[0].id;
            const sql2 = `SELECT * FROM groups WHERE id='${id}'`;
            Db.query(sql2).then((result) => {
                if (!result.rows.length) {
                    return res.status(404).json({
                        status: 404,
                        error: "This group is not found",
                    });
                }

                const sql3 = `SELECT * FROM group_members WHERE groupId='${id}' AND memberId='${memberId}'`;
                Db.query(sql3).then((result) => {
                    if (result.rows[0].role === "admin") {
                        const sql4 = `UPDATE groups SET name='${name}' WHERE id='${id}' RETURNING *`;
                        Db.query(sql4).then((result) => {
                            res.status(200).json({
                                status: 200,
                                data: result.rows,
                            });
                        });
                    } else {
                        res.status(400).json({
                            status: 400,
                            error: "You are not allowed to edit this group",
                        });
                    }
                });
            });
        });
    }

    static deleteGroup(req, res) {
        const { id } = req.params;
        const sql1 = `SELECT * FROM users WHERE email='${req.user.email}'`;
        Db.query(sql1).then((result) => {
            const userId = result.rows[0].id;
            const sql2 = `SELECT * FROM groups WHERE id='${id}'`;
            Db.query(sql2).then((result) => {
                if (!result.rows.length) {
                    return res.status(404).json({
                        status: 404,
                        error: "This group does not exist",
                    });
                }
                if (result.rows[0].createdBy !== userId) {
                    return res.status(400).json({
                        status: 400,
                        error: "You are not allowed to delete this group",
                    });
                }
                const sql3 = `DELETE FROM group_members WHERE groupId='${id}' RETURNING *`;
                Db.query(sql3).then((result) => {
                    res.json({
                        status: 200,
                        data: result.rows,
                    });
                });
            });
        });
    }

    static viewGroupMessages = (req, res) => {
        const { groupId } = req.params;
        const sql = `SELECT * FROM users WHERE email='${req.user.email}'`;
        Db.query(sql).then((result) => {
            const userId = result.rows[0].id;
            const sql2 = `SELECT * FROM group_members WHERE memberId='${userId}'`;
            Db.query(sql2).then((result) => {
                if (!result.rows.length) {
                    return res.status(400).json({
                        status: 400,
                        error: "You are not a member of this group"
                    });
                }
                const sql3 = `SELECT * FROM group_messages WHERE groupId='${groupId}'`;
                Db.query(sql3).then((result) => {
                    res.json({
                        status: 200,
                        data: result.rows
                    });
                });
            });
        });
    }

    static singleGroupMessage = (req, res) => {
        const { groupId, messageId } = req.params;
        const sql = `SELECT * FROM users WHERE email='${
          req.user.email
        }'`;
        Db.query(sql).then(result => {
          const userId = result.rows[0].id;
          const sql2 = `SELECT * FROM group_members WHERE memberId='${userId}'`;
          Db.query(sql2).then(result => {
            if (!result.rows.length) {
              return res.status(400).json({
                status: 400,
                error: "You are not a member of this group"
              });
            }
            const sql3 = `SELECT * FROM group_messages WHERE groupId='${groupId}' AND id='${messageId}'`;
              Db.query(sql3).then((result) => {
                  if (!result.rows.length) {
                      res.status(404).json({
                          status: 404,
                          error: "This message is not found!"
                      });
                  }
              res.json({
                status: 200,
                data: result.rows
              });
            });
          });
        });
    }

    static searchGroup(req, res) {
        const { q } = req.query;
        const sql = `SELECT * FROM groups WHERE name LIKE '${q}'`;
        Db.query(sql).then((result) => {
            if (result.rows.length) {
                return res.json({
                    status: 200,
                    data: result.rows
                });
            }

            res.status(404).json({
                status: 404,
                error: "Group not found"
            });
        });
    }

    static getMembers(req, res) {
        const { id } = req.params;
        const sql = `SELECT * FROM group_members WHERE groupId='${id}'`;
        Db.query(sql).then((result) => {
            res.json({
                status: 200,
                data: result.rows
            })
        
        })
    }

    static getmember(req, res) {
        const { groupId, memberId } = req.params;
        const sql = `SELECT * FROM group_members WHERE groupId='${groupId}' AND memberId='${memberId}'`;
        Db.query(sql).then((result) => {
            if(result.rows.length){
                res.json({
                    status:200,
                    data:result.rows
                })
            }
            else {
                res.status(404).json({
                    status:404,
                    error:"This user is not a member"
                })
            }
        })
    }
}

export default GroupController;
