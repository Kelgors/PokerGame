function _identity(d) {return d;}
export default {
  uniq(array, predicate = _identity) {
    var output = [];
    var ids = [];
    array.forEach(function (d) {
      const id = predicate(d);
      if (ids.indexOf(id) === -1) {
        output.push(d);
        ids.push(id);
      }
    });
    return output;
  }
};