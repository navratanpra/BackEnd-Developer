const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const moment = require("moment");
// const { findOneAndUpdate} = require("../models/authorModel");
const today = moment();

const createBlog = async function (req, res) {
  try {
    let blogData = req.body;
    if (!blogData)
      return res
        .status(400)
        .send({ status: false, msg: "Request body can't be empty" });
    if (!blogData.title)
      return res.status(400).send({ status: false, msg: "Title is mandatory" });
    if (!blogData.body)
      return res.status(400).send({ status: false, msg: "Body is mandatory" });
    if (!blogData.category)
      return res
        .status(400)
        .send({ status: false, msg: "Category is mandatory" });

    if (!blogData.subcategory)
      return res
        .status(400)
        .send({ status: false, msg: "Subcategory is mandatory" });

    let authorId = req.body.authorId;
    if (!authorId)
      return res
        .status(400)
        .send({ status: false, msg: "AuthorId is a mandatory field" });
    let author = await authorModel.findById(authorId);
    if (!author)
      return res.status(400).send({
        status: false,
        msg: "Please confirm the AuthorId,No author found with this Id",
      });
    let savedBlog = await blogModel.create(blogData);
    return res
      .status(201)
      .send({ status: true, msg: "data created", data: savedBlog });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// =============================================================================================================================================
const getBlogs = async function (req, res) {
  try {
    let data = req.query;
    data.isDeleted = false;
    data.isPublished = true;
    let blog = await blogModel.find(data).count({isDeleted:false,isPublished:true});
    if (blog.length < 1)
      return res.status(404).send({ status: false, msg: "Blogs not found " });
    return res.status(200).send({ status: true, data: blog });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// =========================================================================================================================================

// const updateBlogs = async function (req, res) {
//   try {
//     const blogId = req.params.blogId;
//     const blogUpdatedData = req.body;

//     let paramsId = await blogModel.findById(blogId);
//     if (!paramsId) {
//       return res
//         .status(404)
//         .send({ status: false, msg: "blogId is not correct" });
//     }

//     let blog = await blogModel.findOneAndUpdate(
//       { _id: blogId, isDeleted: false },
//       {
//         $set: {
//           title: blogUpdatedData.title,
//           body: blogUpdatedData.body,
//           isPublished: true,
//           publishedAt: new Date(),
//         },
//         $push: {
//           tags: blogUpdatedData.tags,
//           subcategory: blogUpdatedData.subcategory,
//         },
//       },
//       { new: true }
//     );

//     if (!blog) {
//       return res.status(404).send({ status: false, msg: "blog not found" });
//     }
//     return res.status(200).send({ status: true, data: blog });
//   } catch (error) {
//     return res.status(500).send({ status: false, Error: error.message });
//   }
// };

const updateBlogs = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    const blogUpdatedData = req.body;
    let authorId = req.authorId;

    let paramsId = await blogModel.findById(blogId);
    if (paramsId.authorId != authorId)
      return res
        .status(403)
        .send({ msg: `You are not allowed to update ${paramsId._id} blogId` });
    if (!paramsId) {
      return res
        .status(404)
        .send({ status: false, msg: "blogId is not correct" });
    }

    let blog = await blogModel.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      {
        $set: {
          title: blogUpdatedData.title,
          body: blogUpdatedData.body,
          isPublished: true,
          publishedAt: new Date(),
        },
        $push: {
          tags: blogUpdatedData.tags,
          subcategory: blogUpdatedData.subcategory,
        },
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).send({ status: false, msg: "blog not found" });
    }
    return res.status(200).send({ status: true, data: blog });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

// ****************************************************************************************

// const deleteBlogs = async function (req, res) {
//   try {
//     let blogIdData = req.params.blogId;
//     //  if(blogIdData.length<1) return res.status(404).send({status:false, msg:"Blog id required"})

//     let blog = await blogModel.findById(blogIdData);

//     if (blog.isDeleted === true) {
//       return res.status(404).send({ status: false, message: "No blog exists" });
//     }

//     let deletedBlog = await blogModel.findOneAndUpdate(
//       { _id: blogIdData },
//       { isDeleted: true, deletedAt: new Date(), new: true }
//     );
//     res.status(200).send({ status: true, data: deletedBlog });
//   } catch (error) {
//     res.status(500).send({ status: false, Error: error.message });
//   }
// };

const deleteBlogs = async function (req, res) {
  try {
    let blogIdData = req.params.blogId;
    let authorId = req.authorId;

    //  if(blogIdData.length<1) return res.status(404).send({status:false, msg:"Blog id required"})

    // this is my dbcall
    let blog = await blogModel.findById(blogIdData); //blog= {_id:skfjlsdjfl, authorId:skldfjsklf}

    if (blog.isDeleted === true) {
      return res.status(404).send({ status: false, message: "No blog exists" });
    }

    if (blog.authorId != authorId)
      return res
        .status(403)
        .send({ msg: `You are not allowed to update ${blog._id} blogId` });
    let deletedBlog = await blogModel.findOneAndUpdate(
      { _id: blogIdData },
      { isDeleted: true, deletedAt: new Date(), new: true }
    );
    res.status(200).send({ status: true, data: deletedBlog });
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};

//*******************Delete by query****************

const deleteBlogsByQuery = async function (req, res) {
  try {
    let data = req.query;
    let loggedInUserAuthorId = req.putAuthorId;

    if (Object.keys(data).length < 1)
      return res
        .status(400)
        .send({ status: false, msg: "Please provide query params" });

    data.isDeleted = false;
    if (
      data.authorId === "" ||
      data.category === "" ||
      data.tags === "" ||
      data.subcategory === "" ||
      data.isPublished === ""
    )
      return res
        .status(400)
        .send({ status: false, msg: "Query filters cant Be Blank" });

    // here get all data which is matched {data} this particular condition
    let matchedBlog = await blogModel.find(data);

    if (matchedBlog.length == 0)
      return res.status(404).send({ msg: "no records matched" });

    // here i am getting blog with loggedin authorID
    const particularIdBlog = matchedBlog.map((blog) => {
      if (blog.authorId.toString() == loggedInUserAuthorId) return blog._id;
    });

    if (particularIdBlog.length == 0)
      return res.status(404).send({ msg: "no records matched" });

    await blogModel.updateMany(
      { _id: { $in: particularIdBlog } },
      { $set: { isDeleted: true, deletedAt: new Date() } }
    );
    return res
      .status(200)
      .send({ status: true, data: "Blogs deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// const deleteBlogsByQuery = async function (req, res) {
//   try {
//     let data = req.query;
//     if (Object.keys(data).length < 1)
//       return res
//         .status(400)
//         .send({ status: false, msg: "Please provide query params" });

//     data.isDeleted = false;
//     if (
//       data.authorId === "" ||
//       data.category === "" ||
//       data.tags === "" ||
//       data.subcategory === "" ||
//       data.isPublished === ""
//     )
//       return res
//         .status(400)
//         .send({ status: false, msg: "Query filters cant Be Blank" });
//     let deletedBlog = await blogModel.updateMany(
//       data,
//       { isDeleted: true },
//       { new: true }
//     );
//     if (!deletedBlog)
//       return res
//         .status(404)
//         .send({ status: false, msg: "the blog is deleted or not present" });
//     return res.status(200).send({ status: true, data: deletedBlog });
//   } catch (error) {
//     return res.status(500).send({ status: false, msg: error.message });
//   }
// };

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteBlogs = deleteBlogs;
module.exports.deleteBlogsByQuery = deleteBlogsByQuery;
