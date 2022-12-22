const express = require('express')
const uuid = require('uuid')
const router = express.Router();
const members = require('../../Members')


router.get('/', (req, res) => {
    res.json(members);
})

router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json(members.filter((mem) => mem.id === parseInt(req.params.id))[0]);
    } else {
        res.status(404).json({msg: `Member ${req.params.id} not found`});
    }
})

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        res.status(400).json({msg: "please include a name and email"});
    } else {
        members.push(newMember);
        res.json(newMember)
    }
});

// Update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const upd = req.body;
        members.forEach((mem) => {
            if (mem.id === parseInt(req.params.id)) {
                mem.name = req.body.name || mem.name;
                mem.email = req.body.email || mem.email;
                res.json(mem);
            } 
        });
    } else {
        res.status(404).json({msg: `Member ${req.params.id} not found`});
    }
})

router.delete('/:id', (req, res) => {
    const found = members.findIndex(member => member.id === parseInt(req.params.id));
    if(found !== -1) {
        const mem = members[found]
        members.splice(found, 1)
        res.json(mem)
    } else {
        res.status(404).json({msg: `Member ${req.params.id} not found`});
    }
})

module.exports = router;