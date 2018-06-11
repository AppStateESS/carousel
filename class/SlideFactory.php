<?php

namespace carousel;

/**
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */
class SlideFactory {

    public static function save(Resource\Slide $slide)
    {
        if (!$slide->isSaved()) {
            $db = \phpws2\Database::newDB();
            $t1 = $db->addTable('caro_slide');
            $q = $t1->addField('queue');
            $t1->addField('id');
            $ex = $db->getExpression("max($q)", 'max');
            $db->addExpression($ex);
            $db->setGroupBy(array('id'));
            $max = $db->selectOneRow();
            if (!$max) {
                $slide->setQueue(0);
            } else {
                $slide->setQueue($max['max'] + 1);
            }
        }

        \phpws2\ResourceFactory::saveResource($slide);
    }

    public static function getSlidesFromDB($active = null, $id = null)
    {
        $db = \phpws2\Database::newDB();
        $t1 = $db->addTable('caro_slide');
        if (isset($active)) {
            $t1->addFieldConditional('active', (int) (bool) $active);
        }

        if ($id) {
            $t1->addFieldConditional('id', (int) $id);
        }
        $t1->addOrderBy($t1->getField('queue'));
        return $db->select();
    }

    public static function showKeySlide($row)
    {
        javascript('jquery');
        \Layout::addStyle('carousel');
        $slides = self::getSlidesFromDB(null, $row);
        if (empty($slides)) {
            return null;
        }

        $tpl['slide'] = array_pop($slides);
        $tpl['controls'] = false;
        $template = new \phpws2\Template($tpl);

        $template->setModuleTemplate('carousel', 'single_slide.html');
        \Layout::add($template->get(), 'carousel', 'slides');
    }

    public static function display()
    {
        javascript('jquery_ui');
        \Layout::addStyle('carousel');

        \Layout::addJSHeader("<script type='text/javascript' src='" .
                PHPWS_SOURCE_HTTP . "javascript/responsive_img/responsive-img.min.js'></script>",
                81);


        $slides = self::getSlidesFromDB(true);
        if (empty($slides)) {
            return null;
        }

        $iteration = \phpws2\Settings::get('carousel', 'iteration');
        $time_interval = \phpws2\Settings::get('carousel', 'time_interval');

        $time_interval = $time_interval * 1000;

        $script = '<script type="text/javascript">var slide_interval = ' . $time_interval . ';</script>';
        \Layout::addJSHeader($script, 'c_interval');

        if ($iteration) {
            $count_to = $iteration * count($slides);
            $script = '<script type="text/javascript">var iteration = ' . $count_to . ';</script>';
            \Layout::addJSHeader($script, 'iteration');
        }

        $script2 = '<script type="text/javascript" src="' . PHPWS_SOURCE_HTTP . 'mod/carousel/javascript/onclick.js"></script>';
        \Layout::addJSHeader($script2, 'url-onclick');
        $script3 = '<script type="text/javascript" src="' . PHPWS_SOURCE_HTTP . 'mod/carousel/javascript/slide_navigation.js"></script>';
        \Layout::addJSHeader($script3, 'url-nav');


        if (\phpws2\Settings::get('carousel', 'transition')) {
            $tpl['fade'] = 'carousel-fade';
            \Layout::addStyle('carousel', 'fade.css');
        } else {
            $tpl['fade'] = null;
        }

        foreach ($slides as $k => $s) {
            $slides[$k]['tn'] = preg_replace('/(.*)\.(png|jpeg|jpg)$/i',
                    '\\1_tn.\\2', $s['filepath']);
        }

        if (\phpws2\Settings::get('carousel', 'indicator')) {
            $tpl['indicators'] = self::thumbnailIndicator($slides);
        } else {
            $tpl['indicators'] = self::bulletIndicator($slides);
        }

        $tpl['slides'] = $slides;
        $tpl['controls'] = true;
        $template = new \phpws2\Template($tpl);

        $template->setModuleTemplate('carousel', 'slides.html');
        return $template->get();
    }

    private static function bulletIndicator($slides)
    {
        $count = count($slides);
        if (empty($count)) {
            return null;
        }
        for ($i = 0; $i < $count; $i++) {
            $tpl['rows'][] = array('class' => null, 'count' => $i);
        }
        $tpl['rows'][0]['class'] = 'active';
        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('carousel', 'bullet.html');
        return $template->get();
    }

    private static function thumbnailIndicator($slides)
    {
        $i = 0;
        foreach ($slides as $s) {
            $tpl['rows'][$i] = $s;
            $tpl['rows'][$i]['count'] = $i;
            if (!$i) {
                $tpl['rows'][$i]['selected'] = 'selected';
            } else {
                $tpl['rows'][$i]['selected'] = null;
            }
            $i++;
        }

        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('carousel', 'thumbnail.html');
        return $template->get();
    }

    private function getSlides($id = null)
    {
        $result = \carousel\SlideFactory::getSlides(true, $id);

        if (empty($result)) {
            return null;
        }

        foreach ($result as $slide) {
            $tpl[$slide['id']] = $slide;
        }
        return $tpl;
    }

    public static function getById($id)
    {
        $slide = new Resource\Slide;
        if ($id) {
            \phpws2\ResourceFactory::loadById($slide, $id);
            return $slide;
        } else {
            return $slide;
        }
    }

    public static function delete(Resource\Slide $slide)
    {
        self::deleteImages($slide);
        \phpws2\ResourceFactory::deleteResource($slide);
        self::reorderSlides();
    }

    public static function reorderSlides()
    {
        $db = \phpws2\Database::newDB();
        $t1 = $db->addTable('caro_slide');
        $t1->addField('id');
        $t1->addOrderBy($t1->getField('queue'));
        $count = 1;
        while ($id = $db->selectColumn()) {
            $db2 = \phpws2\Database::newDB();
            $t2 = $db2->addTable('caro_slide');
            $t2->addValue('queue', $count);
            $t2->addFieldConditional('id', $id);
            $db2->update();
            $count++;
        }
    }

    public static function deleteImages(Resource\Slide $slide)
    {
        $file = $slide->getFilepath();
        if (is_file($file)) {
            unlink($file);
        }
        $thumb = self::thumbPath($file);
        if (is_file($thumb)) {
            unlink($thumb);
        }
    }

    private static function thumbPath($path)
    {
        return preg_replace('/\.(jpg|jpeg|gif|png)$/i', '_tn.\\1', $path);
    }

}

?>
