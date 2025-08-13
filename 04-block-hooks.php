<?php
/**
 * Block Hooks
 *
 * Custom block modifications using WordPress block filters.
 *
 * @package TA_Gazelle
 * @since 1.0.0
 */

/**
 * Modify block render output to add responsive grid classes
 *
 * Specifically adds tablet column classes to core/post-template blocks
 * for improved responsive design when desktop columns are different
 * from desired tablet columns.
 *
 * @since 1.0.0
 *
 * @param string $block_content The block content
 * @param array $block The full block including attributes
 * @return string Modified block content with additional CSS
 */
function change_block_render_structure( $block_content, $block ) {

	// Verify if using core/post-template block
	if ( $block['blockName'] === 'core/post-template' ) {

		// Get column count from block attributes
		$grid_desktop_column = $block['attrs']['layout']['columnCount'] ?? 0;
		$grid_tablet_column = $block['attrs']['columnsTablet'] ?? 2;

		// Process the block content
		$block_content = new WP_HTML_Tag_Processor( $block_content );

		// Identify first <ul> tag
		if ( $grid_desktop_column && $block_content->next_tag('ul') ) {

			// Add tablet column class
			$block_content->add_class( "grid-tablet-column-{$grid_tablet_column}" );

			return $block_content->get_updated_html();

		}
	}

	return $block_content;
}

// Hook to modify block rendering
add_filter( 'render_block', 'change_block_render_structure', 10, 2 );
