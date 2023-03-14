const commentTemplate = ({author,body}:{author:string | undefined, body: string | undefined}) =>
`---
author: ${author}
---
${body}
`

export default commentTemplate