import Post from "../model/Post.js";

const DEFAULT_PAGE_VALUE = 1;
const DEFAULT_LIMIT_VALUE = 10;

export const getAllPosts = async (req, res) => {
    const { page = DEFAULT_PAGE_VALUE, limit = DEFAULT_LIMIT_VALUE } = req.query;

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json({ message: 'Invalid page or limit' });
    }

    try {
        const posts = await Post.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ date: -1 });

        const totalPosts = await Post.countDocuments();

        res.status(200).json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalCount: totalPosts,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

export const createPost = async (req, res) => {
    try {
        const { src, image, creator, date, timeToRead, title, description, feedSrc } = req.body;

        if (!src || !creator || !date || !title || !timeToRead || !description || !feedSrc) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newPost = new Post({
            src,
            image,
            creator,
            timeToRead,
            title,
            date,
            feedSrc,
            description
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
