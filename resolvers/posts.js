export default async function() {
  // Query implementations
  function getPosts(root, params, { connectors: { localDB } }) {
    return localDB.getAll(localDB._types.POSTS);
  }
  function getPost(root, { id }, { connectors: { localDB } }) {
    return localDB.get(localDB._types.POSTS, id);
  }

  // Mutation implementations
  function addPost(root, { name, authors }, { connectors: { localDB } }) {
    return localDB.add(localDB._types.POSTS, { name, authors });
  }
  function removePost(root, { id }, { connectors: { localDB } }) {
    return localDB.remove(localDB._types.POSTS, id);
  }

  // Schema linking
  this.Query.posts = getPosts;
  this.Query.post = getPost;

  this.Mutation.post_add = addPost;
  this.Mutation.post_remove = removePost;

  this.Post = {};
}
