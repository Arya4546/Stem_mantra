import { Request, Response, NextFunction } from 'express';
import blogService from '../services/blog.service';
import { asyncHandler, sendSuccess, sendPaginated, sendCreated } from '../utils/response';

// ============ BLOG POSTS ============

export const getAllPosts = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const category = req.query.category as string;
  const tag = req.query.tag as string;
  const search = req.query.search as string;

  const result = await blogService.getAllPosts({ page, limit, category, tag, search });
  
  sendPaginated(res, result.posts, page, limit, result.meta.total, 'Blog posts fetched successfully');
});

export const getPostBySlug = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { slug } = req.params;
  const post = await blogService.getPostBySlug(slug);

  // Get related posts
  const relatedPosts = await blogService.getRelatedPosts(slug, 3);
  
  sendSuccess(res, { post, relatedPosts }, 'Blog post fetched successfully');
});

export const createPost = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const post = await blogService.createPost(req.body);
  sendCreated(res, post, 'Blog post created successfully');
});

export const updatePost = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const post = await blogService.updatePost(id, req.body);
  sendSuccess(res, post, 'Blog post updated successfully');
});

export const deletePost = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await blogService.deletePost(id);
  sendSuccess(res, null, 'Blog post deleted successfully');
});

export const getPostSEO = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { slug } = req.params;
  const post = await blogService.getPostBySlug(slug);
  const seoData = blogService.generateSEOData({
    title: post.title,
    excerpt: post.excerpt || '',
    featuredImage: post.featuredImage,
    slug: post.slug
  });
  sendSuccess(res, seoData, 'SEO data fetched successfully');
});

// ============ CATEGORIES ============

export const getAllCategories = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const categories = await blogService.getAllCategories();
  sendSuccess(res, categories, 'Categories fetched successfully');
});

export const getCategoryBySlug = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { slug } = req.params;
  const category = await blogService.getCategoryBySlug(slug);
  sendSuccess(res, category, 'Category fetched successfully');
});

export const createCategory = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const category = await blogService.createCategory(req.body);
  sendCreated(res, category, 'Category created successfully');
});

export const updateCategory = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const category = await blogService.updateCategory(id, req.body);
  sendSuccess(res, category, 'Category updated successfully');
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await blogService.deleteCategory(id);
  sendSuccess(res, null, 'Category deleted successfully');
});

// ============ AUTHORS ============

export const getAllAuthors = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  const authors = await blogService.getAllAuthors();
  sendSuccess(res, authors, 'Authors fetched successfully');
});

export const getAuthorById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const author = await blogService.getAuthorById(id);
  sendSuccess(res, author, 'Author fetched successfully');
});

export const createAuthor = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const author = await blogService.createAuthor(req.body);
  sendCreated(res, author, 'Author created successfully');
});

export const updateAuthor = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const author = await blogService.updateAuthor(id, req.body);
  sendSuccess(res, author, 'Author updated successfully');
});

export const deleteAuthor = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await blogService.deleteAuthor(id);
  sendSuccess(res, null, 'Author deleted successfully');
});

// ============ COMMENTS ============

export const getPostComments = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { postId } = req.params;
  const comments = await blogService.getComments(postId);
  sendSuccess(res, comments, 'Comments fetched successfully');
});

export const createComment = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { postId } = req.params;
  const userId = (req as any).user?.id;
  
  const comment = await blogService.createComment({
    ...req.body,
    postId,
    userId
  });
  
  sendCreated(res, comment, 'Comment created successfully');
});

export const approveComment = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const comment = await blogService.approveComment(id);
  sendSuccess(res, comment, 'Comment approved successfully');
});

export const deleteComment = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await blogService.deleteComment(id);
  sendSuccess(res, null, 'Comment deleted successfully');
});
