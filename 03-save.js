import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save component for testimonial card block
 * 
 * @param {Object} props - Component props  
 * @param {Object} props.attributes - Block attributes
 * @return {JSX.Element} Save component JSX
 */

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
        {attributes.authorImage?.url && (
          <img 
            src={attributes.authorImage.url} 
            alt={attributes.authorImage.alt || ''}
            className="author-image"
          />
        )}
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