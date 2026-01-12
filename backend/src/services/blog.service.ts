import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';
import { PostStatus, Prisma } from '@prisma/client';

interface BlogQuery {
  page?: number;
  limit?: number;
  status?: string; // 'all' or PostStatus values
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
}

interface CreateBlogPostDto {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  status?: PostStatus;
  publishedAt?: Date;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  readTime?: number;
  categoryIds?: string[];
  authorIds?: string[];
}

interface UpdateBlogPostDto extends Partial<CreateBlogPostDto> {}

class BlogService {
  // ==========================================
  // Blog Posts
  // ==========================================
  
  async getAllPosts(query: BlogQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.BlogPostWhereInput = {};

    // Status filter - 'all' means no filter, otherwise default to PUBLISHED for public
    if (query.status && query.status !== 'all') {
      where.status = query.status as PostStatus;
    } else if (!query.status) {
      // Default to published for public queries
      where.status = PostStatus.PUBLISHED;
    }
    // When status === 'all', we don't add any status filter

    if (query.category) {
      where.categories = {
        some: {
          category: {
            slug: query.category,
          },
        },
      };
    }

    if (query.tag) {
      where.tags = {
        has: query.tag,
      };
    }

    if (query.author) {
      where.authors = {
        some: {
          author: {
            slug: query.author,
          },
        },
      };
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { excerpt: { contains: query.search, mode: 'insensitive' } },
        { content: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          authors: {
            include: {
              author: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return {
      posts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getPostBySlug(slug: string) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        authors: {
          include: {
            author: true,
          },
        },
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' },
          include: {
            replies: {
              where: { isApproved: true },
            },
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundError('Blog post not found');
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    });

    return post;
  }

  async createPost(data: CreateBlogPostDto) {
    const { categoryIds, authorIds, ...postData } = data;

    const post = await prisma.blogPost.create({
      data: {
        ...postData,
        categories: categoryIds
          ? {
              create: categoryIds.map((categoryId) => ({
                category: { connect: { id: categoryId } },
              })),
            }
          : undefined,
        authors: authorIds
          ? {
              create: authorIds.map((authorId) => ({
                author: { connect: { id: authorId } },
              })),
            }
          : undefined,
      },
      include: {
        categories: { include: { category: true } },
        authors: { include: { author: true } },
      },
    });

    return post;
  }

  async updatePost(id: string, data: UpdateBlogPostDto) {
    const { categoryIds, authorIds, ...postData } = data;

    // Check if post exists
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Blog post not found');
    }

    // Update categories if provided
    if (categoryIds) {
      await prisma.blogPostCategory.deleteMany({ where: { postId: id } });
      await prisma.blogPostCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          postId: id,
          categoryId,
        })),
      });
    }

    // Update authors if provided
    if (authorIds) {
      await prisma.blogPostAuthor.deleteMany({ where: { postId: id } });
      await prisma.blogPostAuthor.createMany({
        data: authorIds.map((authorId) => ({
          postId: id,
          authorId,
        })),
      });
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: postData,
      include: {
        categories: { include: { category: true } },
        authors: { include: { author: true } },
      },
    });

    return post;
  }

  async deletePost(id: string) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Blog post not found');
    }

    await prisma.blogPost.delete({ where: { id } });
    return { message: 'Blog post deleted successfully' };
  }

  async getRelatedPosts(slug: string, limit: number = 3) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        categories: true,
      },
    });

    if (!post) {
      throw new NotFoundError('Blog post not found');
    }

    const categoryIds = post.categories.map((c) => c.categoryId);

    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        id: { not: post.id },
        status: PostStatus.PUBLISHED,
        categories: {
          some: {
            categoryId: { in: categoryIds },
          },
        },
      },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      include: {
        categories: { include: { category: true } },
        authors: { include: { author: true } },
      },
    });

    return relatedPosts;
  }

  async getFeaturedPosts(limit: number = 5) {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: PostStatus.PUBLISHED,
      },
      take: limit,
      orderBy: { viewCount: 'desc' },
      include: {
        categories: { include: { category: true } },
        authors: { include: { author: true } },
      },
    });

    return posts;
  }

  // ==========================================
  // Categories
  // ==========================================

  async getAllCategories() {
    const categories = await prisma.blogCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return categories;
  }

  async getCategoryBySlug(slug: string) {
    const category = await prisma.blogCategory.findUnique({
      where: { slug },
      include: {
        _count: { select: { posts: true } },
      },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  async createCategory(data: { name: string; slug: string; description?: string; icon?: string; color?: string }) {
    const category = await prisma.blogCategory.create({ data });
    return category;
  }

  async updateCategory(id: string, data: Partial<{ name: string; slug: string; description: string; icon: string; color: string; isActive: boolean }>) {
    const category = await prisma.blogCategory.update({
      where: { id },
      data,
    });
    return category;
  }

  async deleteCategory(id: string) {
    await prisma.blogCategory.delete({ where: { id } });
    return { message: 'Category deleted successfully' };
  }

  // ==========================================
  // Authors
  // ==========================================

  async getAllAuthors() {
    const authors = await prisma.blogAuthor.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { posts: true } },
      },
    });

    return authors;
  }

  async getAuthorBySlug(slug: string) {
    const author = await prisma.blogAuthor.findUnique({
      where: { slug },
      include: {
        posts: {
          include: {
            post: {
              include: {
                categories: { include: { category: true } },
              },
            },
          },
        },
        _count: { select: { posts: true } },
      },
    });

    if (!author) {
      throw new NotFoundError('Author not found');
    }

    return author;
  }

  async createAuthor(data: { name: string; slug: string; email: string; bio?: string; avatar?: string; designation?: string; social?: object }) {
    const author = await prisma.blogAuthor.create({ data });
    return author;
  }

  async getAuthorById(id: string) {
    const author = await prisma.blogAuthor.findUnique({
      where: { id },
      include: {
        _count: { select: { posts: true } },
      },
    });

    if (!author) {
      throw new NotFoundError('Author not found');
    }

    return author;
  }

  async updateAuthor(id: string, data: Partial<{ name: string; slug: string; email: string; bio: string; avatar: string; designation: string; social: object; isActive: boolean }>) {
    const author = await prisma.blogAuthor.update({
      where: { id },
      data,
    });
    return author;
  }

  async deleteAuthor(id: string) {
    await prisma.blogAuthor.delete({ where: { id } });
    return { message: 'Author deleted successfully' };
  }

  // Generate SEO data for a blog post
  generateSEOData(post: { title: string; excerpt: string; featuredImage: string | null; slug: string }) {
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.featuredImage ? [{ url: post.featuredImage }] : [],
        url: `/blog/${post.slug}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.featuredImage ? [post.featuredImage] : [],
      },
    };
  }

  // ==========================================
  // Comments
  // ==========================================

  async getComments(postId: string) {
    const comments = await prisma.blogComment.findMany({
      where: {
        postId,
        isApproved: true,
        parentId: null, // Only top-level comments
      },
      orderBy: { createdAt: 'desc' },
      include: {
        replies: {
          where: { isApproved: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return comments;
  }

  async createComment(data: { postId: string; content: string; authorName: string; authorEmail: string; parentId?: string }) {
    const comment = await prisma.blogComment.create({
      data,
    });

    return comment;
  }

  async approveComment(id: string) {
    const comment = await prisma.blogComment.update({
      where: { id },
      data: { isApproved: true },
    });

    return comment;
  }

  async deleteComment(id: string) {
    await prisma.blogComment.delete({ where: { id } });
    return { message: 'Comment deleted successfully' };
  }

  // ==========================================
  // SEO Helpers
  // ==========================================

  async generateSitemap() {
    const posts = await prisma.blogPost.findMany({
      where: { status: PostStatus.PUBLISHED },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const categories = await prisma.blogCategory.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    return {
      posts: posts.map((p) => ({
        url: `/blog/${p.slug}`,
        lastmod: p.updatedAt,
      })),
      categories: categories.map((c) => ({
        url: `/blog/category/${c.slug}`,
        lastmod: c.updatedAt,
      })),
    };
  }

  async getAllTags() {
    const posts = await prisma.blogPost.findMany({
      where: { status: PostStatus.PUBLISHED },
      select: { tags: true },
    });

    const tagCounts: Record<string, number> = {};
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }
}

export default new BlogService();
