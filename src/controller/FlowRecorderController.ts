const FlowRecorder = require("../database/entity/FlowRecorder");

//new cave

module.exports.newRecord = async (req: any, res: any) => {
    // Stuff to be added later
    const { name } = req.body;
    try {
        const newRecord = await FlowRecorder.create({userrecordid: req.user.id, name, record: req.file.originalname});
        res.status(200).json({
            status: "Success",
            message: "Note created successfully!!",
            newRecord
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

//get all Records
module.exports.getAllRecords = async (req: any, res: any) => {

    try {
        const records = await FlowRecorder.find({
            userrecordid: req.user.id
        });
        res.status(200).json({
            status: "success",
            records,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
}

// Get single record
module.exports.getSingleRecord = async (req: any, res: any) => {

    try {
        const record = await FlowRecorder.findOne({
            recordid: req.params.id
        });
        res.status(200).json({
            status: "success",
            record,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
}

// update Cave if a folder exists and update record
module.exports.replaceRecord = async (req: any, res: any) => {
    const { name } = req.body;
    FlowRecorder.find({ recordid: req.params.id }, async (err: any, docs: any) => {
        if (docs.length) {
            try {
                const replaceRecord = await FlowRecorder.updateOne({
                    recordid: req.params.id
                }, {name, record: req.file.originalname});
                res.status(200).json({
                    status: "success",
                    message: "Record replaced successfully!!",
                    replaceRecord
                })
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(404).json({message: "Record not found!"})
        }
    })

}


// Delete a record from the database
module.exports.deleteRecord = async (req: any, res: any) => {
    const { name } = req.body;
    FlowRecorder.find({ recordid: req.params.id }, async (err: any, docs: any) => {
        if (docs.length) {
            try {
                const deleteRecords = await FlowRecorder.deleteOne({recordid: req.params.id});
                res.status(200).json({
                    status: "success",
                    message: "Record deleted successfully!!",
                    deleteRecords
                })
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(404).json({message: "Record not found!"})
        }
    })

}