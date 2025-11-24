import { Octokit } from 'octokit'

const githubToken = process.env.GITHUB_TOKEN
const owner = process.env.GITHUB_OWNER
const repo = process.env.GITHUB_REPO

export async function getAllPosts() {
  const octokit = new Octokit({ auth: githubToken })
  
  const response = await octokit.request(
    `GET /repos/${owner}/${repo}/contents/content/posts`,
    {
      owner,
      repo,
      path: 'content/posts',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  return response.data.filter((file: any) => 
    file.name.endsWith('.md')
  )
}

export async function getPost(fileName: string) {
  const octokit = new Octokit({ auth: githubToken })
  
  const response = await octokit.request(
    `GET /repos/${owner}/${repo}/contents/content/posts/${fileName}`,
    {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  const content = Buffer.from(
    response.data.content, 
    'base64'
  ).toString('utf-8')

  return {
    content,
    fileName,
    path: response.data.path,
    sha: response.data.sha
  }
}

export async function upsertPost(
  slug: string, 
  content: string, 
  sha?: string
) {
  const octokit = new Octokit({ auth: githubToken })
  const base64Content = Buffer.from(content).toString('base64')

  const response = await octokit.request(
    `PUT /repos/${owner}/${repo}/contents/content/posts/${slug}`,
    {
      owner,
      repo,
      message: `Update post: ${slug}`,
      content: base64Content,
      sha,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  return response
}

export async function deletePost(fileName: string, sha: string) {
  const octokit = new Octokit({ auth: githubToken })
  
  const response = await octokit.request(
    `DELETE /repos/${owner}/${repo}/contents/content/posts/${fileName}`,
    {
      owner,
      repo,
      message: `Delete post: ${fileName}`,
      sha,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  return response
}