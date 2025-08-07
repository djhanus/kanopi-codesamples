import { 
  useBlockProps, 
  RichText, 
  MediaUpload, 
  InspectorControls,
  PanelColorSettings 
} from '@wordpress/block-editor';
import { 
  PanelBody, 
  Button 
} from '@wordpress/components';

// Custom testimonial card block for client testimonials
export default function Edit({ attributes, setAttributes }) {
  const { 
    testimonialText, 
    authorName, 
    authorTitle, 
    authorImage, 
    backgroundColor 
  } = attributes;

  const blockProps = useBlockProps({
    style: { backgroundColor }
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Settings">
          <MediaUpload
            onSelect={(media) => setAttributes({ 
              authorImage: { 
                url: media.url, 
                alt: media.alt 
              }
            })}
            allowedTypes={['image']}
            render={({ open }) => (
              <Button onClick={open} variant="secondary">
                {authorImage.url ? 'Change Image' : 'Select Image'}
              </Button>
            )}
          />
        </PanelBody>
        <PanelColorSettings
          title="Color Settings"
          colorSettings={[
            {
              value: backgroundColor,
              onChange: (color) => setAttributes({ backgroundColor: color }),
              label: 'Background Color'
            }
          ]}
        />
      </InspectorControls>

      <div {...blockProps} className="testimonial-card">
        <RichText
          tagName="blockquote"
          className="testimonial-text"
          value={testimonialText}
          onChange={(value) => setAttributes({ testimonialText: value })}
          placeholder="Enter testimonial text..."
        />
        
        <div className="author-info">
          {authorImage.url && (
            <img 
              src={authorImage.url} 
              alt={authorImage.alt}
              className="author-image"
            />
          )}
          
          <div className="author-details">
            <RichText
              tagName="cite"
              className="author-name"
              value={authorName}
              onChange={(value) => setAttributes({ authorName: value })}
              placeholder="Author name..."
            />
            <RichText
              tagName="span"
              className="author-title"
              value={authorTitle}
              onChange={(value) => setAttributes({ authorTitle: value })}
              placeholder="Job title, Company..."
            />
          </div>
        </div>
      </div>
    </>
  );
}