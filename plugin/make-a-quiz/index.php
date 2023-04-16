<?php

/*
  Plugin Name: Make A Quiz
  Description: Give your readers a multiple choice question.
  Version: 1.0
  Author: Me
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class MakeAQuiz {
  function __construct() {
    add_action('init', array($this, 'adminAssets'));
  }

  function adminAssets() {
    wp_register_style('quizcss', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_script('quiz', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks','wp-element','wp-editor'));
    register_block_type('plugin/make-a-quiz', array(
      'editor_script' => 'quiz',
      'editor_style' => 'quizcss',
      'render_callback' => array($this, 'theHTML')
    ));
  }

  function theHTML($attributes) {
    if(!is_admin()){
      wp_enqueue_script('quizfrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
      wp_enqueue_style('quizfrontendcss', plugin_dir_url(__FILE__) . 'build/frontend.css');
    }
    
    ob_start(); ?>
    <div class="quiz-frontend"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre></div>
    <?php return ob_get_clean();
  }
}

$makeAQuiz = new MakeAQuiz();