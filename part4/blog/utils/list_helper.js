const _ = require('lodash');

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((acc, val) => acc + val.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null
	}
	const maxBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

	return {
		title: maxBlog.title,
		author: maxBlog.author,
		likes: maxBlog.likes
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null
	}
	const countBlogs = _.chain(_.map(blogs, "author"))
					.countBy()
					.toPairs()
					.maxBy(_.last)
					.value()

	return {
		author: countBlogs[0],
		blogs: countBlogs[1]
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}