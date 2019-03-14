
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import groupMembers from '../models/group-members';
import groups from '../models/groups';

class GroupController {
  static groups(req, res) {
    res.json({
      status: 200,
      data: groups,
    });
  }

  static group(req, res) {
    const { id } = req.params;
    const groupById = groups.find(group => parseInt(group.id, 10) === parseInt(id, 10));
    if (groupById) {
      const context = {
        status: 200,
        data: groupById,
      };
      res.json(context);
    } else {
      res.status(404).json({
        status: 404,
        error: '404 Not found!',
      });
    }
  }

  static createGroup(req, res) {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });
      } else {
        const { name } = req.body;
        const newGroup = {
          id: groups.length + 1,
          name,
        };
        groups.push(newGroup);
        fs.writeFileSync(
          path.resolve(__dirname, '../data/groups.json'),
          JSON.stringify(groups, null, 2),
        );
        res
          .json({
            status: 201,
            data: newGroup,
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
          error: 'Forbidden',
        });
      } else {
        const { memberId } = req.body;
        const { groupId } = req.params;

        const groupMember = {
          groupId: parseInt(groupId, 10),
          memberId: parseInt(memberId, 10),
        };

        groupMembers.push(groupMember);

        fs.writeFileSync(
          path.resolve(__dirname, '../data/group-members.json'),
          JSON.stringify(groupMembers, null, 2),
        );

        const currentGroup = groups.find(
          group => parseInt(group.id, 10) === parseInt(groupId, 10),
        );
        res.json({
          status: 200,
          data: currentGroup,
        });
      }
    });
  }

  static groupMembers(req, res) {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: 'Forbidden',
        });
      } else {
        const { groupId } = req.params;
        const groupById = groups.find(
          group => parseInt(group.id, 10) === parseInt(groupId, 10),
        );
        const members = groupById.members.forEach((member) => {
          const userInfo = users.find(user => parseInt(user.id, 10) === parseInt(member, 10));
          return userInfo;
        });
        const context = {
          status: 200,
          data: [
            {
              id: groupId,
              name: groupById.name,
              members,
            },
          ],
        };

        res.json(context);
      }
    });
  }
}

export default GroupController;
