export default async function() {
  // Query implementations
  function getPersons(root, params, { connectors: { localDB } }) {
    return localDB.getAll(localDB._types.USERS);
  }
  function getPerson(root, { id }, { connectors: { localDB } }) {
    return localDB.get(localDB._types.USERS, id);
  }

  // Mutation implementations
  function addPerson(
    root,
    { firstName, lastName, age },
    { connectors: { localDB } }
  ) {
    return localDB.add(localDB._types.USERS, { firstName, lastName, age });
  }
  function removePerson(root, { id }, { connectors: { localDB } }) {
    return localDB.remove(localDB._types.USERS, id);
  }

  //Field implementations
  function generateFullName(root, params, context) {
    return root.firstName + " " + root.lastName;
  }
  function personGetPosts({ id }, params, { connectors: { localDB } }) {
    return localDB.find(localDB._types.POSTS, post =>
      post.authors.includes(id)
    );
  }

  // Schema linking
  this.Query.persons = getPersons;
  this.Query.person = getPerson;

  this.Mutation.person_add = addPerson;
  this.Mutation.person_remove = removePerson;

  this.Person = {};
  this.Person.fullName = generateFullName;
  this.Person.posts = personGetPosts;
}
