import MdxRender from "../../components/mdx-render";

export default function Halo() {
    return (
        <div className="prose">
            <MdxRender content={`# Hello World`} />
        </div>
    );
}