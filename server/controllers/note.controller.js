const Note = require("../models/notes.model");


module.exports = {
    addNote: async (req, res) => {
        const {
            title,
            content,
            tags
        } = req.body;
        const {
            user
        } = req.user; // User details from the token

        if (!title) {
            return res.status(400).json({
                message: "title is required"
            });
        }
        if (!content) {
            return res.status(400).json({
                message: "content is required"
            });
        }

        try {
            const note = new Note({
                title,
                content,
                tags: tags || [],
                userId: user._id,
            });

            await note.save();

            return res.json({
                error: false,
                note,
                message: "Note added successfully",
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Internal Server Error",
            });
        }
    },
    put: async (req, res) => {
        const noteId = req.params.noteId;
        const {
            title,
            content,
            tags,
            isPinned
        } = req.body;
        const {
            user
        } = req.user;

        if (!title && !content && !tags) {
            return res.status(400).json({
                message: "No change provided"
            })
        }

        try {
            const note = await Note.findOne({
                _id: noteId,
                userId: user._id
            });

            if (!note) {
                return res.status(400).json({
                    message: "note not found",
                    error: true
                });
            }

            if (title) note.title = title;
            if (content) note.content = content;
            if (tags) note.tags = tags;
            if (isPinned) note.isPinned = isPinned;

            await note.save();

            return res.json({
                error: true,
                note,
                message: "Note updated successfully"
            });

        } catch (error) {
            return res.status(500).json({
                error: false,
                message: "Note updated failed"
            });
        }
    },
    get: async (req, res) => {
        const {
            user
        } = req.user;

        try {
            const note = await Note.find({
                userId: user._id,
            }).sort({
                isPinned: -1
            });

            return res.json({
                error: false,
                note,
                message: 'All note retrieved'
            });
        } catch (error) {
            return res.status(500).json({
                error: false,
                message: 'All note not retrieve'
            });
        }
    },

    delete: async (req, res) => {
        const noteId = req.params.noteId;
        const {
            user
        } = req.user;

        try {
            const note = await Note.find({
                _id: noteId,
                userId: user._id
            })

            if (!note) {
                return res.status(404).json({
                    message: "Note undefinded"
                });
            }

            await Note.deleteOne({
                _id: noteId,
                userId: user._id
            });

            return res.json({
                message: 'Note deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: 'Internal Server error'
            });
        }
    },

    updatePin: async (req, res) => {
        const noteId = req.params.noteId;
        const { isPinned } = req.body;  // You will send `isPinned` as true/false to toggle it
        const { user } = req.user;
    
        try {
            // Find the note by ID and ensure it belongs to the correct user
            const note = await Note.findOne({
                _id: noteId,
                userId: user._id
            });
    
            // If note is not found, return an error
            if (!note) {
                return res.status(400).json({
                    message: "Note not found",
                    error: true
                });
            }
    
            // Toggle the isPinned status (flip it)
            note.isPinned = !note.isPinned;
    
            // Save the updated note
            await note.save();
    
            // Return success response with the updated note
            return res.json({
                error: false,  // Indicating success
                note,
                message: "Note pin updated successfully"
            });
    
        } catch (error) {
            return res.status(500).json({
                error: true,  // Indicating failure
                message: "Note update failed"
            });
        }
    },
    

    search: async (req, res) => {
        const {user} = req.user;
        const {query} = req.query;

        if(!query){
            return res.status(400).json({
                error:true,
                message: 'Search Query is required',
            });
        }

        try {
            const matchingNotes = await Note.find({
                userId: user._id,
                $or:[
                    {title:{$regex: new RegExp(query, 'i')}},
                    {content:{$regex: new RegExp(query, 'i')}},

                ]
            });

            return res.json({
                error:false,
                note:matchingNotes,
                message:"Notes Matching the search query retrieved successfully"
            });
        } catch (error) {
            return res.status(500).json({
                error:true,
                message:"Internal Server Error"
            });
        }
    }
}