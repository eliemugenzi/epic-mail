import groups from "../models/groups";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import users from "../models/users";
import groupMembers from "../models/group-members";
class GroupController {
  static groups(req, res) {
    res.json({
      status: 200,
      data: groups
    });
  }

  static group(req, res) {
    let { id } = req.params;
    const groupById = groups.find(group => parseInt(group.id) === parseInt(id));
    if (groupById) {
      let context = {
        status: 200,
        data: groupById
      };
      res.json(context);
    } else {
      res.status(404).json({
        status: 404,
        error: "404 Not found!"
      });
    }
  }

  static createGroup(req, res) {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: "Forbidden"
        });
      } else {
        let { name } = req.body;
        let newGroup = {
          id: groups.length + 1,
          name
        };
        groups.push(newGroup);
        fs.writeFileSync(
          path.resolve(__dirname, "../data/groups.json"),
          JSON.stringify(groups, null, 2)
        );
        res
          .json({
            status: 201,
            data: newGroup
          })
          .status(201);
      }
    });
  }

  static addMembers(req, res) {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: "Forbidden"
        });
      } else {
        let { memberId } = req.body;
        let { groupId } = req.params;

        let groupMember = {
          groupId: parseInt(groupId),
          memberId: parseInt(memberId)
        };

        groupMembers.push(groupMember);

        fs.writeFileSync(
          path.resolve(__dirname, "../data/group-members.json"),
          JSON.stringify(groupMembers, null, 2)
        );

        const currentGroup = groups.find(
          group => parseInt(group.id) === parseInt(groupId)
        );
        res.json({
          status: 200,
          data: currentGroup
        });
      }
    });
  }

  static groupMembers(req, res) {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: "Forbidden"
        });
      } else {
        let { groupId } = req.params;
        let groupById = groups.find(
          group => parseInt(group.id) === parseInt(groupId)
        );
        let members = groupById.members.forEach(member => {
          let user = users.find(user => parseInt(user.id) === parseInt(member));
          return user;
        });
        let context = {
          status: 200,
          data: [
            {
              id: groupId,
              name: groupById.name,
              members
            }
          ]
        };

        res.json(context);
      }
    });
  }
}

export default GroupController;
