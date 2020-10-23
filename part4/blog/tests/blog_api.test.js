const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token = '';

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.listWithMultipleBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  await User.deleteMany({})
  
	const passwordHash = await bcrypt.hash('secret', 10)
	const user = new User({
	  	username: 'root',
	 	passwordHash
	})
	await user.save() 
})



describe('The correct amount of blog posts are returned in the JSON format and the unique identifier property is named id', () => {

	test('blogs are returned as json', async () => {
	  await api
	    .get('/api/blogs')
	    .expect(200)
	    .expect('Content-Type', /application\/json/)
	})

	test('there are six blogs', async () => {
	  const response = await api.get('/api/blogs')

	  expect(response.body).toHaveLength(helper.listWithMultipleBlogs.length)
	})

	test('The unique identifier property is named id', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0].id).toBeDefined()
})
})






describe('When posting to /api/blogs...', () => {

	beforeEach(async () => {
		const response = await await api
					.post('/api/login')
					.send({username: 'root', password: 'secret'})
		token = response.body.token
	})

	test('HTTP POST without a token results in 401 not authorized', async () => {
		const newBlog = {
			title: 'New Blog',
	    	author: 'blogger',
	    	url: 'https://blog.com/',
	    	likes: 10
		}
		await api.post('/api/blogs')
			.send(newBlog)
			.expect(401)
	})

	test('HTTP POST successfully creates a new blog post', async () => {
		const newBlog = {
			title: 'New Blog',
	    	author: 'blogger',
	    	url: 'https://blog.com/',
	    	likes: 10
		}
		

		await api.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.listWithMultipleBlogs.length+1)

		const titles = blogsAtEnd.map(n => n.title)
		expect(titles).toContain('New Blog')
	})

	test('If likes property is missing from request, it defaults to 0', async  () => {
		const noLikesBlog = {
			title: 'A blog without likes',
			author: 'me',
			url: 'myblog.com'
		}

		await api.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(noLikesBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		const blogLikes = blogsAtEnd.map(n => n.likes)
		expect(blogLikes[blogLikes.length-1]).toEqual(0)

	})

	test('If url is missing, 400 is returned', async  () => {
		const noUrlBlog = {
			title: 'A blog without likes',
			author: 'me',
			likes: 27
		}

		await api.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(noUrlBlog)
			.expect(400)

	})

	test('If title is missing, 400 is returned', async  () => {
		const noTitleBlog = {
			author: 'me',
			url: 'www.ghostblogs.com',
			likes: 27
		}

		await api.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(noTitleBlog)
			.expect(400)

	})

})


afterAll(() => {
  mongoose.connection.close()
})