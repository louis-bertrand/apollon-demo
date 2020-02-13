export default async function() {
  
  function helloResolver() {
    return "Hello world";
  }

  this.Query.hello = helloResolver;
}
