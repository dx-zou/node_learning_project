const getBlogList = (author, keyword) => {
  return [
    {
      id: 1,
      title: "1111",
      content: "111111",
      author: "feng",
      createTime: "2019-11-30 17:29:31"
    },
    {
      id: 2,
      title: "223",
      content: "2222",
      author: "feng",
      createTime: "2019-11-30 17:29:31"
    }
  ];
};
const getBlogDetail = id => {
  return {
    id: 1,
    title: "1111",
    content: "111111",
    author: "feng",
    createTime: "2019-11-30 17:29:31"
  };
};
const newBlog = (blogData = {}) => {
  console.log(blogData);
  return {
    id: 1
  };
};
module.exports = {
  getBlogList,
  getBlogDetail,
  newBlog
};
