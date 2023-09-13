import PostModel from '../models/post.js';


export const getAll = async (req, res) => {
try {
 const posts = await PostModel.find().populate('user').exec();

res.json(posts);
} catch (err) {
console.log(err);
res.status(500).json({
message: 'impossible de recevoir des articles',
});
}
};
export const getOne = async (req, res) => {
    try {
      const postsId = req.params.id;
  
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postsId },
        { $inc: { viewsCount: 1 } },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: "article not found" });
      }
  
      res.json(updatedPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "failed to find the article" });
    }
  };

    
  
    export const remove = async (req, res) => {
        try {
          const postsId = req.params.id;
      
          const deletedPost = await PostModel.findOneAndDelete(
            { _id: postsId },
            
          );
      
          if (!deletedPost) {
            return res.status(500).json({ message: "the article is not found" });
          }
      
          res.json(deletedPost);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "failed to get the article" });
        }
      };


      
export const create = async  (req, res ) => {
    try{
const doc = new PostModel({
    title: req.body.title,
    text: req.body.title,
    imageUrl: req.body.imageUrl,
    tags: req.body.tags,
    user: req.userId,
});
const post = await doc.save();
res.json(post);
    } catch(err)
    {
        console.log(err);
        res.status(500).json({
      message: 'impossible de creer un article',
        });
    }
}



export const update = async (req, res) => {
    try {
      const postId = req.params.id;
  
      await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          user: req.userId,
          tags: req.body.tags,
          
        },
      );
  
      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'failed to update',
      });
    }
  };