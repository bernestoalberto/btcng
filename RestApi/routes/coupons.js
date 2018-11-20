const mysql = require('../middleware/database.js');

var coupons = {
    getAll: function (req, res) {
        mysql.exec("SELECT `p`.`ID`, `u`.`user_nicename`, `p`.`post_date`, `p`.`post_content`, `p`.`post_title`, `p`.`post_status`, COUNT(`oi`.`order_item_name`) `ct` FROM `bblwebsite`.`wp_posts` `p` LEFT JOIN `bblwebsite`.`wp_users` `u` ON `u`.`ID` = `p`.`post_author` LEFT JOIN `bblwebsite`.`wp_woocommerce_order_items` `oi` ON `oi`.`order_item_name` = `p`.`post_title` WHERE `post_type` = 'shop_coupon' AND `post_status` NOT LIKE 'auto-draft' GROUP BY `p`.`post_title` ORDER BY `ct` DESC", null, function (result) {
            res.json(result);
        });
    },
    getOne: function (req, res) {
        mysql.exec("SELECT`u`.`user_nicename`,`p`.`post_date`, `p`.`post_content`, `p`.`post_title`, `p`.`post_status`,`p`.`ID`, `pm`.`meta_id`,max(CASE WHEN `pm`.`meta_key`='_edit_last' and `p`.`ID`=`pm`.`post_id` THEN (SELECT `u`.`user_nicename` FROM `wp_users` `u` WHERE `u`.`ID`=`pm`.`meta_value`) END) as `_edit_last`,max(CASE WHEN `pm`.`meta_key`='discount_type' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'discount_type',max(CASE WHEN `pm`.`meta_key`='coupon_amount' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'coupon_amount',max(CASE WHEN `pm`.`meta_key`='individual_use' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'individual_use',max(CASE WHEN `pm`.`meta_key`='product_ids' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'product_ids',max(CASE WHEN `pm`.`meta_key`='exclude_product_ids' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'exclude_product_ids',max(CASE WHEN `pm`.`meta_key`='usage_limit' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'usage_limit',max(CASE WHEN `pm`.`meta_key`='usage_limit_per_user' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'usage_limit_per_user',max(CASE WHEN `pm`.`meta_key`='limit_usage_to_x_items' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'limit_usage_to_x_items',max(CASE WHEN `pm`.`meta_key`='expirey_date' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'expirey_date',max(CASE WHEN `pm`.`meta_key`='free_shipping' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'free_shipping',max(CASE WHEN `pm`.`meta_key`='exclude_sales_items' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'exclude_sales_items',max(CASE WHEN `pm`.`meta_key`='exclude_product_categories' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'exclude_product_categories',max(CASE WHEN `pm`.`meta_key`='minimum_ammount' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'minimum_ammount',max(CASE WHEN `pm`.`meta_key`='maximum_ammount' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'maximum_ammount',max(CASE WHEN `pm`.`meta_key`='customer_email' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as 'customer_email',max(CASE WHEN `pm`.`meta_key`='_wjecf_min_matching_product_qty' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_min_matching_product_qty',max(CASE WHEN `pm`.`meta_key`='_wjecf_max_matching_product_qty' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_max_matching_product_qty',max(CASE WHEN `pm`.`meta_key`='_wjecf_min_matching_product_subtotal' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_min_matching_product_subtotal',max(CASE WHEN `pm`.`meta_key`='_wjecf_max_matching_product_subtotal' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_max_matching_product_subtotal',max(CASE WHEN `pm`.`meta_key`='_wjecf_products_and' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_products_and',max(CASE WHEN `pm`.`meta_key`='_wjecf_categories_and' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_categories_and',max(CASE WHEN `pm`.`meta_key`='_wjecf_allow_below_mminimum_spend' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_allow_below_mminimum_spend',max(CASE WHEN `pm`.`meta_key`='_wjecf_shipping_methods' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_shipping_methods',max(CASE WHEN `pm`.`meta_key`='_wjecf_payment_methods' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_payment_methods',max(CASE WHEN `pm`.`meta_key`='_wjecf_customer_ids' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_customer_ids',max(CASE WHEN `pm`.`meta_key`='_wjecf_customer_roles' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_customer_roles',max(CASE WHEN `pm`.`meta_key`='_wjecf_is_auto_coupon' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_is_auto_coupon',max(CASE WHEN `pm`.`meta_key`='_wjecf_apply_silently' and `p`.`ID`=`pm`.`post_id` THEN `pm`.`meta_value` END) as '_wjecf_apply_silently'FROM `wp_posts` `p` LEFT JOIN `wp_postmeta` `pm` ON `pm`.`post_id`=`p`.`ID` LEFT JOIN `wp_users` `u` ON `u`.`ID`=`p`.`post_author`WHERE `p`.`ID`='" + res.body.idcoupons + "'", null, function (coupon) {
            if (coupon.length > 0) {
                res.json(coupon[0]);
            } else {
                res.json(false);
            }
        });
    },
    create: function (req, res) {
        mysql.exec("INSERT INTO `orders` SET ?", req.body, function (result) {
            res.json(result);
        })
    },
    update: function (req, res) {
        mysql.exec("UPDATE `orders` SET ? ", req.body, function (result) {
            res.json(result);
        })
    },
    delete: function (req, res) {
        mysql.exec("DELETE FROM `orders` WHERE `idorders` = ?", {idorders: req.body.id}, function (result) {
            res.json(result);
        });
    }
}

module.exports = coupons;