"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { githubDark } from '@uiw/codemirror-theme-github'
import { EditorView } from "@codemirror/view"
import { Input } from "./input"
import { defaultTemplate } from "configs/frontmatter-template"
import { postData } from "lib/http-post"

const setupOptions: BasicSetupOptions = {
  lineNumbers: false,
  foldGutter: false
}

export default function Post(props: { 
  content: string
  fileName: string
  sha: string
  path: string 
}) {
  const [postMD, setPostMD] = useState(props.content || defaultTemplate)
  const [file, setFile] = useState<File>()
  const [slug, setSlug] = useState(props.fileName)
  const [sha, setSha] = useState(props.sha)

  const router = useRouter()

  const onSubmit = () => {
    const finalSlug = slug

    postData("/api/posts", {
      post: postMD,
      slug: finalSlug,
      sha: sha
    })
    
    router.refresh()
    router.push('/admin/posts')
  }

  const uploadImage = async (file: File | undefined) => {
    setFile(file)
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/images', {
        method: 'POST',
        body: data
      })
      
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <div className="container">
        Upload image
      <Input 
        className="w-50 justify-end" 
        id="file" 
        type="file" 
        name="file" 
        onChange={(e) => uploadImage(e.target.files?.[0])} 
      />

      <button 
        className="mt-2 mb-4 w-40 float-right" 
        onClick={() => onSubmit()}
      >
        Post
      </button>
      
      <div className="grid w-full items-center gap-1.5 mb-5">
        Slug
        <Input 
          type="slug" 
          id="slug" 
          placeholder="slug" 
          value={slug} 
          onChange={e => setSlug(e.target.value)}  
        />
      </div>
      
      <CodeMirror
        value={postMD}
        theme={githubDark}
        minHeight="400px"
        extensions={[
          markdown({ 
            base: markdownLanguage, 
            codeLanguages: languages 
          }), 
          EditorView.lineWrapping
        ]}
        basicSetup={setupOptions}
        onChange={e => setPostMD(e)}
      />
    </div>
  )
}