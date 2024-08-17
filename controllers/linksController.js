const userModel = require("../models/user");

async function getAllLinks(req, res) {
    const id = req.params.userId;
    try {
        const user = await userModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        return res.status(200).json({ allLinks: user.links });
    } catch (error) {
        console.log("error fetching links", error);
        res.status(500).send('Internal server error.');
    }

}
async function addLink(req, res) {
    const { id, platformName, Url } = req.body;
    console.log(id,platformName,Url);
    try {
        await userModel.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    links: {
                        platformName: platformName,
                        Url: Url,
                        timestamps: new Date()
                    }
                }
            },
            { new: true }
        );
        console.log('Link added');
        res.status(200).json({ _id: id, platformName: platformName });
    } catch (error) {
        console.error('Error adding link:', error);
        res.status(500).send('Internal server error.');
    }
}

async function editLink(req, res) {
    const { id, linkId, platformName, Url } = req.body;
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: id, "links._id": linkId },
            {
                $set: {
                    "links.$.platformName": platformName,
                    "links.$.Url": Url,
                    "links.$.timestamps": new Date()
                }
            },
            { new: true, useFindAndModify: false }
        );

        return res.status(200).json({ message: "updated link successfully.", updated: updatedUser })
        console.log('Updated User with specific link', updatedUser);
    } catch (err) {
        console.error('Update error', err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

async function removeLink(req, res) {
    const { id, linkId } = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { $pull: { links: { _id: linkId } } },
            { new: true, useFindAndModify: false }
        );
        console.log('link removed', updatedUser);
        return res.status(200).json({ message: "removed link successfully.", updated: updatedUser })

    } catch (err) {
        console.error('error removing link', err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addLink,
    editLink,
    removeLink,
    getAllLinks
}