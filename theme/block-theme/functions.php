<?php

class JSXBlock {
  function __construct($name) {
    $this->name = $name;
    add_action('enqueue_block_assets', [$this, 'onEnqueueBlockAssets']);
  }

  function onEnqueueBlockAssets() {
    wp_enqueue_style('css', get_stylesheet_directory_uri() . "/build/{$this->name}.css");
    wp_enqueue_script('script', get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'), null, true);
  }
}

new JSXBlock('banner');