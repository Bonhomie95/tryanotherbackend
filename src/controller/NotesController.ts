const Notes = require("../database/entity/Notes");

//new cave

module.exports.newNote = async (req: any, res: any) => {
    // Stuff to be added later
    const { title, note } = req.body;
    try {
        const newNote = await Notes.create({
            usernoteid: req.user.id, title, note
        });
        res.status(200).json({
            status: "Success",
            message: "Note created successfully!!",
            newNote
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

//get all files
module.exports.getAllNotes = async (req: any, res: any) => {

    try {
        const notes = await Notes.find({
            usernoteid: req.user.id
        });
        res.status(200).json({
            status: "success",
            notes,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
}
module.exports.getSingleNote = async (req: any, res: any) => {

    try {
        const note = await Notes.find({
            noteid: req.params.id
        });
        res.status(200).json({
            status: "success",
            note,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
}

// update Cave if a folder exists

module.exports.updateNote = async (req: any, res: any) => {
    const { title, note } = req.body;
    Notes.find({ noteid: req.params.id }, async (err: any, docs: any) => {
        if (docs.length) {
            
            try {
                
            console.log(title, note)
                const updateNotes = await Notes.updateOne({noteid: req.params.id}, {title, note});
                res.status(200).json({
                    status: "success",
                    message: "Note updated successfully!!",
                    updateNotes
                })
            } catch (err) {
                res.status(500).json(err);
            }
        }
    })

}

module.exports.deleteNote = async (req: any, res: any) => {
    Notes.find({ noteid: req.params.id }, async (err: any, docs: any) => {
        if (docs.length) {
            try {
                const deleteNotes = await Notes.deleteOne({noteid: req.params.id});
                res.status(200).json({
                    status: "success",
                    message: "Note deleted successfully!!",
                    deleteNotes
                })
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(404).json({message: "Note not found!"});
        }
    })

}