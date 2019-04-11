<?php
/**
 * MIT License
 * Copyright (c) 2019 Electronic Student Services @ Appalachian State University
 * 
 * See LICENSE file in root directory for copyright and distribution permissions.
 * 
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license https://opensource.org/licenses/MIT
 */
$active = true;
foreach ($slides as $id => $s) {
    switch ($s['caption_zone']) {
        case 0:
            $vertical = 'bottom';
            $horizontal = 'center';
            break;
        case 1:
            $vertical = 'top';
            $horizontal = 'left';
            break;
        case 2:
            $horizontal = 'right';
            $vertical = 'top';
            break;
        case 3:
            $horizontal = 'left';
            $vertical = 'bottom';
            break;
        case 4:
            $horizontal = 'right';
            $vertical = 'bottom';
            break;
    }
    if (!empty($s['url']) && !empty($s['title'])) {
        $caption_title = '<a href="' . $s['url'] . '">' . $s['title'] . '</a>';
    } else {
        $caption_title = $s['title'];
    }
    
    ?>
    <div class="carousel-item <?= $active ? 'active' : null; ?>" data-slide-number='<?= $id ?>'>
      <img class="carousel-slide-image d-block w-100" src="<?= $s['filepath'] ?>" alt="<?= $s['title'] ?>" data-url="<?= $s['url'] ?>" />
      <noscript><img src="<?= $s['filepath'] ?>" alt="<?= $s['title'] ?>" /></noscript>
      <?php if (!empty($s['caption'])): ?>
          <div class="carousel-caption <?= $vertical ?>">
            <div class="carousel-container <?= $horizontal ?>">
                <?php if ($s['show_title']): ?>
                  <div class="title">
                    <h3><?= $caption_title ?></h3>
                  </div>
              <?php endif; ?>
              <div class="content">
                <?= $s['caption'] ?>
              </div>
            </div>
          </div>
      <?php endif; ?>
    </div>
    <?php
    $active = false;
}
