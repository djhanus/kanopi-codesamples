import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    style: { backgroundColor: attributes.backgroundColor }
  });

  return (
    <div {...blockProps} className="testimonial-card">
      <RichText.Content
        tagName="blockquote"
        className="testimonial-text"
        value={attributes.testimonialText}
      />
      <div className="author-info">
        <RichText.Content
          tagName="cite"
          className="author-name"
          value={attributes.authorName}
        />
        <RichText.Content
          tagName="span"
          className="author-title"
          value={attributes.authorTitle}
        />
      </div>
    </div>
  );
}