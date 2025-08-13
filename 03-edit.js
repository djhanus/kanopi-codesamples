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
import { __ } from '@wordpress/i18n';


/**
 * Save component for testimonial card block
 * 
 * @param {Object} props - Component props  
 * @param {Object} props.attributes - Block attributes  
 * @return {JSX.Element} Save component JSX
 */

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
                alt: media.alt,
                id: media.id
              }
            })}
            allowedTypes={['image']}
            render={({ open }) => (
              <Button onClick={open} variant="secondary" aria-describedby="author-image-helper">
                {authorImage.url ? 'Change Image' : 'Select Image'}
              </Button>
            )}
          />
          <p id="author-image-helper" className="screen-reader-text">
            {__('Upload an image for the testimonial author', 'ta-gazelle')}
          </p>
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