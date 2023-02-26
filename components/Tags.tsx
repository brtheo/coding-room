export default function Tags({tags, className}: {tags: string[], className?: string}) {

  return (
    <div class={className ? "relative " + className : "relative"}>
      <dl data-tags class="flex h-[min-content] max-w-[110px] overflow-x-auto">
        {tags.map((tag, i) => <dt style={`--idx:${i}`}>{tag}</dt>)}
      </dl>
    </div>
  )
}