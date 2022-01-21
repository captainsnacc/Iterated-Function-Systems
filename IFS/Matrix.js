// A simple object prototype for 2x2 matrices

// in this code, v always represents a vector, m always represents a matrix

function Matrix(a11 = 0, a12 = 0, a21 = 0, a22 = 0)
{
  //
  //  represents the matrix:
  //  this.a11    this.a12
  //  this.a21    this.a22
  //
  this.a11 = a11
  this.a12 = a12
  this.a21 = a21
  this.a22 = a22

  this.set = function(a11, a12, a21, a22)
  {
    this.a11 = a11
    this.a12 = a12
    this.a21 = a21
    this.a22 = a22
    return this
  }

  // multiplies this * v, with v being a p5.Vector object
  this.multVec = function(v)
  {
    return createVector(v.x * this.a11 + v.y * this.a12, v.x * this.a21 + v.y * this.a22)
  }

  // computes this + m, and mutates this
  this.add = function(m)
  {
    this.a11 += m.a11
    this.a12 += m.a12
    this.a21 += m.a21
    this.a22 += m.a22
    return this
  }

  // tests if 'this' is a contraction mapping
  this.isContractionMapping = function()
  {
    // a contraction mapping is a function f defined on a metric space M, f: M -> M s.t. d(f(x),f(y))<=kd(x,y) for some k \in [0,1)
    return(
            Matrix.mult(
              Matrix.transpose(this),
              this
            ) // multiply the matrix by it's transpose,
            .eigenValues() // get its eigenvalues
            .every((lambda) => (lambda < 1)) // test if all eigenvalues of this^T * this are in [0,1) (the eigenvalues will always be nonegative)
          )  // if they are, the matrix represents a contraction mapping, so we're done with the method.
  }

  // computes determinant
  this.det = function()
  {
    return this.a11 * this.a22 - this.a21 * this.a12
  }

  // computes trace
  this.tr = function()
  {
    return this.a11 + this.a22
  }

  // computes transpose and mutates this
  this.transpose = function()
  {
    let temp = this.a21
    this.a21 = this.a12
    this.a12 = temp
  }

  // multiplies this * m
  this.multRight = function(m)
  {
    this.set(this.a11 * m.a11 + this.a12 * m.a21, this.a11 * m.a12 + this.a12 * m.a22,
             this.a21 * m.a11 + this.a22 * m.a21, this.a21 * m.a12 + this.a22 * m.a22)
    return this
  }

  this.multLeft = function(m)
  {
    this.set(m.a11 * this.a11 + m.a12 * this.a21, m.a11 * this.a12 + m.a12 * this.a22,
             m.a21 * this.a11 + m.a22 * this.a21, m.a21 * this.a12 + m.a22 * this.a22)
    return this
  }

  // computes characteristic polynomial and returns it as a function
  this.characteristicPolynomial = function()
  {
    let deg0 = this.det()
    let deg1 = - this.tr()
    return (lambda) => lambda * lambda + deg1 * lambda + deg0
  }

  // gives the eigenvalues in a list
  this.eigenValues = function()
  {
    let t = this.tr()
    let d = this.det()
    let delta = t * t - 4 * d // discriminant
    if (delta < 0)
    {
      throw(`Imaginary eigenvalues!`)
    }
    return [(t + sqrt(delta)) / 2, (t - sqrt(delta)) / 2]
  }
}

// static methods of Matrix

// v is a p5.Vector object, m is a matrix, multiplies m * v
Matrix.multVec = function(m, v)
{
  return createVector(v.x * m.a11 + v.y * m.a12, v.x * m.a21 + v.y * m.a22)
}

Matrix.add = function(m1, m2)
{
  // just adding two matrices
  return new Matrix(m1.a11 + m2.a11, m1.a12 + m2.a12, m1.a21 + m2.a21, m1.a22 + m2.a22)
}

// multiplies m1 * m2, and returns a new matrix
Matrix.mult = function(m1, m2)
{
  return new Matrix(m1.a11 * m2.a11 + m1.a12 * m2.a21, m1.a11 * m2.a12 + m1.a12 * m2.a22,
                    m1.a21 * m2.a11 + m1.a22 * m2.a21, m1.a21 * m2.a12 + m1.a22 * m2.a22)
}

// calculates the transpose of m
Matrix.transpose = function(m)
{
  return new Matrix(m.a11, m.a21, m.a12, m.a22)
}


// These are functions which generate certain types of matrices

// theta is angle, m is an optional parameter of a matrix that should be rotated theta degrees. If it is not given, we just give the rotation matrix of an angle theta
Matrix.rotation = function(theta, m)
{
  if (m === undefined)
  {
    return new Matrix(cos(theta), -sin(theta), sin(theta), cos(theta))
  }
  return (new Matrix(cos(theta), -sin(theta), sin(theta), cos(theta))).multRight(m)
}

Matrix.scale = function(s, m)
{
  if (m === undefined)
  {
    return new Matrix(s, 0, 0, s)
  }
  return (new Matrix(s, 0, 0, s)).multRight(m)
}
