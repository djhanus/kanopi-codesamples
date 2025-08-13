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
    <div {...blockProps} className="testimonial-card" role="region" aria-label={__('Customer testimonial', 'ta-gazelle')}>
      <RichText.Content
        tagName="blockquote"
        className="testimonial-text"
        value={attributes.testimonialText}
        role="blockquote"
        aria-label={__('Testimonial quote', 'ta-gazelle')}
      />
      <div className="author-info" role="group" aria-label={__('Author information', 'ta-gazelle')}>
        {attributes.authorImage?.url && (
          <img 
            src={attributes.authorImage.url} 
            alt={attributes.authorImage.alt || ''}
            className="author-image"
            role="img"
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