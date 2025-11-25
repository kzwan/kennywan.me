export const defaultTemplate = `---
title: "New Post Title"
description: "Post description here"
publishedAt: "${new Date().toISOString().split('T')[0]}"
status: "draft"
slug: "new-post-${Date.now()}"
tags: "nextjs, blog"
featured: "no"
---

# Your Post Title

Start writing your content here...

## Section 1

Content goes here.

## Section 2

More content...
`