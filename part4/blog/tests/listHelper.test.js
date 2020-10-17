const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')




test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => { 

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.listWithMultipleBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('of empty list is null', () => {
  	const result = listHelper.favoriteBlog([])
  	expect(result).toEqual(null)
  })

  test('of a list with a single blog is the title, author and likes of the blog', () => {
  	const result = listHelper.favoriteBlog(helper.listWithOneBlog)
  	const singleResult = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
  	}
  	expect(result).toEqual(singleResult)
  })
  
  test('of list of multiple blogs is the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(helper.listWithMultipleBlogs)
    const testResult = {
    	title: "Canonical string reduction",
    	author: "Edsger W. Dijkstra",
    	likes: 12
    }
    expect(result).toEqual(testResult)
  })

})

describe('most blogs', () => {

  test('of an empty list is null', () => {
  	const result = listHelper.mostBlogs([])
  	expect(result).toEqual(null)
  })

  test('of a list with a single blog is the author', () => {
  	const result = listHelper.mostBlogs(helper.listWithOneBlog)
  	const singleBlog = {
      author: "Edsger W. Dijkstra",
      blogs: 1
  	}
  	expect(result).toEqual(singleBlog)
  })

  test('of a list with multiple blogs to be the author with the most blogs and the count of blogs', () => {
	const result = listHelper.mostBlogs(helper.listWithMultipleBlogs)
	const mostBlogs = {
      author: "Robert C. Martin",
      blogs: 3
	}
	expect(result).toEqual(mostBlogs)
  })
})