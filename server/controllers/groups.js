
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

        const sql1 = `SELECT * FROM groups WHERE id='${groupId}'`;
        Db.query(sql1).then((result) => {
            if (result.rows.length) {
                const sql2 = `SELECT * FROM users WHERE id='${memberId}'`;
                Db.query(sql2).then((result) => {
                    if (result.rows.length) {
                        const groupMember = [
                            groupId,
                            memberId,
                            "member",
                        ];
                        const sql3 = "INSERT INTO group_members(groupId,memberId,role) VALUES($1,$2,$3)";
                        Db.query(sql3, groupMember).then(() => {
                            res.status(201).json({
                                status: 201,
                                success: "A new member is joined the group!",
                            });
                        });
                    } else {
                        return res.status(404).json({
                            status: 404,
                            error: "This member does not exist!",
                        });
                    }
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    error: "This group does not exist!",
                });
            }
        });
    }

    static sendGroupMessage(req, res) {
        const { groupId } = req.params;
        const { subject, message } = req.body;

        const sql1 = `SELECT * FROM users WHERE email='${userData.user.email}'`;
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
                                const sql = "INSERT INTO group_messages(senderId,groupId,subject,message,status,createdOn) VALUES($1,$2,$3,$4,$5,$6)";
                                Db.query(sql, newMessage).then(() => {
                                    res.status(201).json({
                                        status: 201,
                                        success: "Message sent to the group",
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
        const sql1 = `SELECT * FROM group_members WHERE groupId='${groupId}' AND memberId='${memberId}'`;
        Db.query(sql1).then((result) => {
            if (result.rows.length) {
                const sql2 = `DELETE FROM group_members WHERE groupId='${groupId}' AND memberId='${memberId}'`;
                Db.query(sql2).then(() => {
                    res.json({
                        status: 200,
                        success: "This user is removed successfully",
                    });
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "This member is not in this group",
                });
            }
        });
    }

    static editName(req, res) {
        const { name } = req.body;
        const { id } = req.params;
        Group.editName({ id, name });

        res.json({
            status: 200,
            success: "Name edited!",
        });
    }

    static deleteGroup(req, res) {
        const { id } = req.params;
        Group.remove(id);
        res.json({
            status: 200,
            success: "Deleted!",
        });
    }
}

export default GroupController;
