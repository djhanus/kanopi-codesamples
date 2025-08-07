<?php
// hook to wrap or change block content
add_filter( 'render_block', 'change_block_render_structure', 10, 2 );
function change_block_render_structure( $block_content, $block ) {

	// add grid tablet column class
	if ( $block['blockName'] === 'core/post-template' ) {
		$grid_desktop_column = $block['attrs']['layout']['columnCount'] ?? 0;
		$grid_tablet_column = $block['attrs']['columnsTablet'] ?? 2;
		$block_content = new WP_HTML_Tag_Processor( $block_content );

		if ( $grid_desktop_column && $block_content->next_tag('ul') ) {
			$block_content->add_class( "grid-tablet-column-{$grid_tablet_column}" );
			return $block_content->get_updated_html();
		}
	}

	return $block_content;
}
