const LyricAssistant = require("../database/entity/LyricAssistant");

//new cave

module.exports.newLyric = async (req: any, res: any) => {
    // Stuff to be added later
    const { type, lyrics } = req.body;
    try {
        const newLyric = await LyricAssistant.create({
            userlyricid: req.user.id, type, lyrics
        });
        res.status(200).json({
            status: "Success",
            message: "Lyric created successfully!!",
            newLyric
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

//get all files
module.exports.getAllLyrics = async (req: any, res: any) => {

    try {
        const getAllLyrics = await LyricAssistant.find({userlyricid: req.user.id});
        res.status(200).json({
            status: "success",
            getAllLyrics,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
}
module.exports.getSingleLyric = async (req: any, res: any) => {

    try {
        const getLyric = await LyricAssistant.findOne({lyricid: req.params.id});
        res.status(200).json({
            status: "success",
            getLyric,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
}

// update Cave if a folder exists

module.exports.updateLyric = async (req: any, res: any) => {
    const { type, lyrics } = req.body;
    LyricAssistant.find({ lyricid: req.params.id }, async (err: any, docs: any) => {
        if (docs.length) {
            try {
                const updateLyric = await LyricAssistant.updateOne({lyricid: req.params.id}, {
                        type, lyrics});
                res.status(200).json({
                    status: "success",
                    message: "Lyric updated successfully!!",
                    updateLyric
                })
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(404).json({message: "Lyric not found!"});
        }
    })

}

module.exports.deleteLyric = async (req: any, res: any) => {
    LyricAssistant.find({ lyricid: req.params.id }, async (err: any, docs: any) => {
        if (docs.length) {
            try {
                const deleteLyrics = await LyricAssistant.deleteOne({lyricid: req.params.id});
                res.status(200).json({
                    status: "success",
                    message: "Lyric deleted successfully!!",
                    deleteLyrics
                })
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(404).json({message: "Lyric not found!"});
        }
    })

}