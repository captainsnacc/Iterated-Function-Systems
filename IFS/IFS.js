// in this code, v always represents a vector

function IFS()
{
  this.funcs = []

  this.transformSet = function(vecs)
  {
    return vecs.map
           (
             (v) => this.funcs.map
             (
               f => f(v)
             )
           ) // this gives us an array of arrays containing the results of each funcs[i] applied to a specific vector
           .reduce((prev, cur) => prev.concat(cur), []) // this turns our array of arrays of vectors into an array of vectors
  }

  this.transformSetLimit = function(vecs, limit) // limits the size of the resulting array of transformSet to limit in such a way that if a point is removed is independant of its location
  {
    return this.transformSet(vecs)
           .filter((v, index, array) => (random() < limit / array.length))
  }
}
