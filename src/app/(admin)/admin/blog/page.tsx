import Link from 'next/link'

const placeholderPosts = [
  {
    id: '1',
    title: '5 Meal Prep Tips for Busy Professionals',
    category: 'MEAL_PREP_TIPS',
    isPublished: true,
    publishedAt: '10 Feb 2026',
  },
  {
    id: '2',
    title: 'High-Protein Breakfast Ideas Under 10 Minutes',
    category: 'RECIPE',
    isPublished: true,
    publishedAt: '5 Feb 2026',
  },
  {
    id: '3',
    title: 'Understanding Macros: A Beginner\'s Guide',
    category: 'NUTRITION',
    isPublished: false,
    publishedAt: null,
  },
]

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-lg bg-sage px-4 py-2.5 text-sm font-medium text-white hover:bg-sage-dark transition-colors"
        >
          + New Post
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left bg-muted/30">
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Title
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {placeholderPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {post.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-sage/10 px-2.5 py-0.5 text-xs font-medium text-sage">
                      {post.category.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.isPublished
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {post.publishedAt || 'Not published'}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-sm font-medium text-sage hover:text-sage-dark transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
