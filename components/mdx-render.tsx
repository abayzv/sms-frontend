import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

export default function MdxRender({ content }: { content: string }) {
    const [mdxContent, setContent] = useState('')

    const convert = async () => {
        const processedContent = await remark()
            .use(html)
            .process(content);
        return processedContent.toString();
    }

    useEffect(() => {
        convert().then(setContent)
    }, [content])

    return (
        <div className='prose' dangerouslySetInnerHTML={{ __html: mdxContent }} />
    )
}